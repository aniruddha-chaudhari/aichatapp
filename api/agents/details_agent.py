import cohere.client
from dotenv import load_dotenv
import os
from .utils import get_chatbot_response,get_embedding
from groq import Groq
from pinecone import Pinecone
from copy import deepcopy 
import cohere
load_dotenv(dotenv_path="api/.env")

class DetailsAgent():
    def __init__(self):
        self.client = Groq( api_key=os.getenv("GROQ_API_KEY")) 
        self.co = cohere.ClientV2(api_key=os.getenv("COHERE_API_KEY"))
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.index_name = os.getenv("PINECONE_INDEX_NAME")

    
    def get_embedding_results(self,index_name,query,top_k=2):
        index = self.pc.Index(index_name)
        results = index.query(
            namespace='ns1',
            vector= query,
            top_k=top_k,
            include_values=False,
            include_metadata=True
        )
        return results
    
    def get_response(self,messages):
        messages = deepcopy(messages)
        user_message = messages[-1]['content']

        embeddings = get_embedding(self.co, user_message)  # embeddings is now directly usable
        results = self.get_embedding_results(self.index_name, embeddings)
        source_knowledge = "\n".join([x['metadata']['text'].strip()+'\n' for x in results['matches'] ])

        prompt = f"""
        Using the contexts below, answer the query.

        Contexts:
        {source_knowledge}

        Query: {user_message}
        """

        system_prompt = """ You are a customer support agent for a coffee shop called Merry's way. You should answer every question as if you are waiter and provide the neccessary information to the user regarding their orders """

        messages[-1]['content'] = prompt
        input_messages = [{"role": "system", "content": system_prompt}]+messages[-3:]

        chatbot_output = get_chatbot_response(self.client,input_messages)
        output = self.post_process(chatbot_output)
        return output


    def post_process(self,chatbot_output):
        output = {
            "role": "assistant",
            "content": chatbot_output,
            "memory": {
                'agent': 'details_agent'
            }
        }
        return output