from groq import Groq
import os
import json 
import dotenv
from copy import deepcopy
from .utils import get_chatbot_response
import dotenv
dotenv.load_dotenv(dotenv_path="api/.env")

class ClassificationAgent():
    def __init__(self):
        self.client = Groq( api_key=os.getenv("GROQ_API_KEY")) 
    
    def get_response(self,messages):
        messages = deepcopy(messages)
        
        
        system_prompt = """
            You are a helpful AI assistant for a coffee shop application.
            Your task is to determine what agent should handle the user input. You have 3 agents to choose from:
            1. details_agent: This agent is responsible for answering questions about the coffee shop, like location, delivery places, working hours, details about menue items. Or listing items in the menu items. Or by asking what we have.
            2. order_taking_agent: This agent is responsible for taking orders from the user. It's responsible to have a conversation with the user about the order untill it's complete.
            3. recommendation_agent: This agent is responsible for giving recommendations to the user about what to buy. If the user asks for a recommendation, this agent should be used.

            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": "go over each of the agents above and write some your thoughts about what agent is this input relevant to.",
            "decision": "details_agent" or "order_taking_agent" or "recommendation_agent". Pick one of those. and only write the word,
            "message": leave the message empty,
            }
            """
        input_messages = [{"role":"system","content":system_prompt}] + messages[-3:]

        chatbot_output = get_chatbot_response(client=self.client,messages=input_messages)
        output = self.post_process(chatbot_output)
        return output
    
    def post_process(self,output):
        output = json.loads(output)
        
        dict_output = {
        "role": "assistant",
        "content": output["message"],
        "memory":{
            "agent": "classification_agent",
            "classification_decision": output["decision"],
        }
        }
        return dict_output  # Added return statement

