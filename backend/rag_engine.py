import os
import json
from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Load environment variables from .env
load_dotenv()

def load_schemes_data(filepath="backend/schemes_data.json"):
    """Loads the mock government schemes from the JSON file."""
    if not os.path.exists(filepath):
        # Fallback for relative path depending on execution directory
        filepath = "schemes_data.json"
        
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    documents = []
    for scheme in data:
        # Create a rich text representation for the embedding model to understand
        content = f"Scheme Name: {scheme['name']}\n"
        content += f"Description: {scheme['description']}\n"
        content += f"Eligibility: {scheme['eligibility']}\n"
        content += f"Documents Required: {', '.join(scheme['documents_required'])}\n"
        
        doc = Document(
            page_content=content,
            metadata={"scheme_id": scheme["scheme_id"], "name": scheme["name"]}
        )
        documents.append(doc)
    return documents

def initialize_vector_store():
    """Initializes the FAISS vector store with Google Gemini embeddings."""
    print("Loading schemes data...")
    documents = load_schemes_data()
    
    print("Initializing Google Generative AI Embeddings...")
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables. Please check your .env file.")
        
    # We use Gemini's latest embedding model to convert text to vectors
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-2", 
        google_api_key=api_key
    )
    
    print("Building FAISS Vector Store...")
    vector_store = FAISS.from_documents(documents, embeddings)
    
    print("FAISS Vector Store initialized successfully!")
    return vector_store

# Initialize a global vector store instance to be imported by our FastAPI app
vector_store = None
try:
    vector_store = initialize_vector_store()
except Exception as e:
    print(f"Warning: Failed to initialize vector store. Error: {e}")

def get_retriever():
    """Returns a retriever interface to search for top matching schemes."""
    if vector_store:
        # Retrieve the top 2 most relevant schemes based on user query
        return vector_store.as_retriever(search_kwargs={"k": 2})
    return None

if __name__ == "__main__":
    # Test the retriever locally
    retriever = get_retriever()
    if retriever:
        print("\nTesting Vector Store Search:")
        query = "I am a poor farmer looking for financial support. What scheme?"
        print(f"Query: '{query}'")
        results = retriever.get_relevant_documents(query)
        for i, res in enumerate(results):
            print(f"\nResult {i+1}: {res.metadata['name']}")
            print(res.page_content)
