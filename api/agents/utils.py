import time
import cohere
import os

co = cohere.ClientV2(api_key=os.getenv("COHERE_API_KEY"))

def get_chatbot_response(client, messages, model_name="llama-3.1-8b-instant", temperature=0, retries=3, delay=2):
    input_messages = []
    for message in messages:
        input_messages.append({"role": message["role"], "content": message["content"]})

    for attempt in range(retries):
        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=input_messages,
                temperature=temperature,
                top_p=0.8,
                max_tokens=2000,
            ).choices[0].message.content
            return response
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(delay)  # Retry after delay
            else:
                raise e  # Raise exception after final attempt

def get_embedding(text_input):
    response = co.embed(
        texts=text_input,
        model='embed-english-v3.0',
        input_type='search_document',
        embedding_types=["float"]
    )
    
    return response.embeddings.float_  # Ensure correct attribute access