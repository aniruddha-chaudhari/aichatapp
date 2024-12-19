from agents import (GuardAgent,ClassificationAgent,DetailsAgent,AgentProtocol,RecommendationAgent)
from typing import Dict
import os

def main():
    pass

if __name__ == "__main__":
    recommendation_agent = RecommendationAgent(
        os.path.join(os.path.dirname(__file__), 'recommendation_objects', 'recommendations.json'),
        os.path.join(os.path.dirname(__file__), 'recommendation_objects', 'popularity_recommendation.csv')
    )

print(recommendation_agent.get_popular_recommendations(product_category='Coffee'))
print(recommendation_agent.get_apriori_recommendation(products=['Latte']))
    # guard_agent = GuardAgent()
    # classification_agent = ClassificationAgent()

    # agent_dict: dict[str,AgentProtocol] = {
    #     "details_agent": DetailsAgent()
    # }

    # messages = []
    # while True:
    #     os.system('cls' if os.name == 'nt' else 'clear')
    #     print("\n\n print messages ..........")
    #     for message in messages:
    #         print(f"{message['role']}:{message['content']}")  # Fixed key access

    #     prompt = input("User: ")
    #     messages.append({"role":"user","content":prompt})

    
    #     guard_agent_response = guard_agent.get_response(messages)
    #     if guard_agent_response['memory']['guard_decision'] == 'not allowed':
    #        messages.append(guard_agent_response)
    #        continue

    #     classification_agent_response = classification_agent.get_response(messages)
    #     chosen_agent = classification_agent_response['memory']['classification_decision']
        
    #     agent = agent_dict[chosen_agent]
    #     response = agent.get_response(messages)
       
    #     messages.append(response)


