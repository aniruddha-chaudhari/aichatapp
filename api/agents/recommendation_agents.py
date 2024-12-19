import cohere.client
from dotenv import load_dotenv
import pandas as pd
import json
import os
from .utils import get_chatbot_response,get_embedding
from groq import Groq
from pinecone import Pinecone
from copy import deepcopy 
import cohere
load_dotenv(dotenv_path="api/.env")

class RecommendationAgent():
    def __init__(self,apriori_recommendation_path,popular_recommendation_path):
        self.client = Groq( api_key=os.getenv("GROQ_API_KEY")) 
        self.co = cohere.ClientV2(api_key=os.getenv("COHERE_API_KEY"))
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.index_name = os.getenv("PINECONE_INDEX_NAME")


        with open(apriori_recommendation_path,'r') as f:
            self.apriori_recommendations = json.load(f)

        self.popular_recommendations = pd.read_csv(popular_recommendation_path)
        self.products = self.popular_recommendations['product'].tolist()
        self.product_categories = self.popular_recommendations['product_category'].tolist()

    def get_popular_recommendations(self,product_category=None,top_k=5):
        recommmendations_df = self.popular_recommendations 

        if type(product_category) == str:
            product_category = [product_category]

        if product_category is not None:
            recommmendations_df = self.popular_recommendations[self.popular_recommendations['product_category'].isin(product_category)] 
        recommmendations_df = recommmendations_df.sort_values('number_of_transactions',ascending=False)

        if recommmendations_df.shape[0] ==0:
            return []
        
        recommmendations = recommmendations_df['product'].tolist()[:top_k]
        return recommmendations
    
    def get_apriori_recommendation(self,products,top_k=5):
        recommendation_list = []
        for product in products:
            if product in self.apriori_recommendations:
                recommendation_list += self.apriori_recommendations[product]
        
     
        recommendation_list = sorted(recommendation_list,key=lambda x: x['confidence'],reverse=True)

        recommendations = []
        recommendations_per_category = {}
        for recommendation in recommendation_list:
            
            if recommendation in recommendations:
                continue 

         
            product_catory = recommendation['product_category']
            if product_catory not in recommendations_per_category:
                recommendations_per_category[product_catory] = 0
            
            if recommendations_per_category[product_catory] >= 2:
                continue

            recommendations_per_category[product_catory]+=1

           
            recommendations.append(recommendation['product'])

            if len(recommendations) >= top_k:
                break

        return recommendations 
    
    
    def recommendation_classification(self,messages):
        system_prompt = """ You are a helpful AI assistant for a coffee shop application which serves drinks and pastries. We have 3 types of recommendations:

        1. Apriori Recommendations: These are recommendations based on the user's order history. We recommend items that are frequently bought together with the items in the user's order.
        2. Popular Recommendations: These are recommendations based on the popularity of items in the coffee shop. We recommend items that are popular among customers.
        3. Popular Recommendations by Category: Here the user asks to recommend them product in a category. Like what coffee do you recommend me to get?. We recommend items that are popular in the category of the user's requested category.
        
        Here is the list of items in the coffee shop:
        """+ ",".join(self.products) + """
        Here is the list of Categories we have in the coffee shop:
        """ + ",".join(self.product_categories) + """

        Your task is to determine which type of recommendation to provide based on the user's message.

        Your output should be in a structured json format like so. Each key is a string and each value is a string. Make sure to follow the format exactly:
        {
        "chain of thought": Write down your critical thinking about what type of recommendation is this input relevant to.
        "recommendation_type": "apriori" or "popular" or "popular by category". Pick one of those and only write the word.
        "parameters": This is a  python list. It's either a list of of items for apriori recommendations or a list of categories for popular by category recommendations. Leave it empty for popular recommendations. Make sure to use the exact strings from the list of items and categories above.
        }
        """
        input_messages = [{"role":"system","content":system_prompt}]+messages[-3:]

        chat_response=  get_chatbot_response(self.client,input_messages)
        output = self.post_process(chat_response)
        return output
    
    def postprocess_classfication(self,output):
        output = json.loads(output)

        dict_output = {
            "recommendation_type": output['recommendation_type'],
            "parameters": output['parameters'],
        }
        return dict_output
    
    def get_recommendation_from_order(self,messages,order):
        products = []
        for product in order:
            products.append(product['item'])

        recommendations = self.get_apriori_recommendation(products)
        recommendations_str = ",".join(recommendations)
        system_prompt = f"""
        You are a helpful AI assistant for a coffee shop application which serves drinks and pastries.
        your task is to recommend items to the user based on their order.

        I will provide what items you should recommend to the user based on their order in the user message. 
        """
        prompt = f"""
        {messages[-1]['content']}
        Please recommend me those items exactly: {recommendations_str}

        """
        messages[-1]['content'] = prompt

        input_messages = [{"role":"system","content":system_prompt}]+messages[-3:]

        chatbot_output = get_chatbot_response(self.client,input_messages)
        output = self.post_process(chatbot_output)
        return output
    
    def postprocess(self,output):
        output = {
            "role": "assistant",
            "content": output,
            "memory": {"agent":"recommendation_agent"
                      }
        }
        return output

      

        