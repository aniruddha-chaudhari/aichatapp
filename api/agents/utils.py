import time
import cohere
import os



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
            response = response.replace("`", " ")
            return response
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(delay)  
            else:
                raise e  

def get_embedding(co, text):
    response = co.embed(
        texts=[text],
        input_type="search_query",
        embedding_types=["float"],
        model="embed-english-v3.0"
    )
    # Access the float embeddings from the response
    return response.embeddings.float_