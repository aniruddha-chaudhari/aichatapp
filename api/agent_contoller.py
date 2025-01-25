import logging
from agents import (GuardAgent,ClassificationAgent,DetailsAgent,AgentProtocol,RecommendationAgent,OrderTakingAgent)
from typing import Dict
import os

class AgentController():
    def __init__(self):
        self.guard_agent = GuardAgent()
        self.classification_agent = ClassificationAgent()
        self.recommendation_agent = RecommendationAgent(
             os.path.join(os.path.dirname(__file__), 'recommendation_objects', 'recommendations.json'),
             os.path.join(os.path.dirname(__file__), 'recommendation_objects', 'popularity_recommendation.csv')
        )

        self.agent_dict: dict[str,AgentProtocol] = {
            "details_agent": DetailsAgent(),
            "recommendation_agent": self.recommendation_agent,
            "order_taking_agent": OrderTakingAgent(self.recommendation_agent),
         }
        logging.basicConfig(level=logging.INFO)

    def get_response(self,input):
        logging.info("Received input: %s", input)

        job_input = input["input"]
        messages = job_input["messages"]

        guard_agent_response = self.guard_agent.get_response(messages)
        if guard_agent_response["memory"]["guard_decision"] == "not allowed":
            return guard_agent_response
        
        classification_agent_response = self.classification_agent.get_response(messages)
        chosen_agent=classification_agent_response["memory"]["classification_decision"]

        agent = self.agent_dict[chosen_agent]
        response = agent.get_response(messages)

        return response