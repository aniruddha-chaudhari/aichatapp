from dotenv import load_dotenv
import os
from .utils import get_chatbot_response,get_embedding
from groq import Groq
from pinecone import Pinecone
from copy import deepcopy 