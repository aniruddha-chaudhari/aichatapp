from agents import (GuardAgent)
import os

def main():
    pass

if __name__ == "__main__":
    guard_agent = GuardAgent()

    messages = []
    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        print("\n\n print messages ..........")
        for message in messages:
            print(f"{message['role']}:{message['content']}")  # Fixed key access

        prompt = input("User: ")
        messages.append({"role":"user","content":prompt})

        try:
            guard_agent_response = guard_agent.get_response(messages)
            print(f"Guard Agent: {guard_agent_response['content']}")
            messages.append(guard_agent_response)
        except Exception as e:
            print(f"Error: {e}")
            # Optionally, handle the error or retry