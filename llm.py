from langchain_google_genai import ChatGoogleGenerativeAI, HarmBlockThreshold, HarmCategory
from dotenv import load_dotenv
from langchain_ollama import ChatOllama

load_dotenv()
gemini = ChatGoogleGenerativeAI(
    model="gemini-2.5-pro",
    temperature=0,
    safety_settings={
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
    }
)

local_llm = ChatOllama(
    model="llama3.3:70b",  
    base_url="http://localhost:11434",
    temperature=0
)