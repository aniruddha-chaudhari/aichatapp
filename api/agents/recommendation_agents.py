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

        