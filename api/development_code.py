from agents import (GuardAgent,ClassificationAgent)
import os

def main():
    pass

if __name__ == "__main__":
    guard_agent = GuardAgent()
    classification_agent = ClassificationAgent()

    messages = []
    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        print("\n\n print messages ..........")
        for message in messages:
            print(f"{message['role']}:{message['content']}")  # Fixed key access

        prompt = input("User: ")
        messages.append({"role":"user","content":prompt})

    
        guard_agent_response = guard_agent.get_response(messages)
        if guard_agent_response['memory']['guard_decision'] == 'not allowed':
           messages.append(guard_agent_response)
           continue

        classification_agent_response = classification_agent.get_response(messages)
        chosen_agent = classification_agent_response['memory']['classification_decision']
        print(f"chosen_agent: {chosen_agent}")
        
       
       