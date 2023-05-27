import openai
import os

# Access OpenAI api key if saved in your system as environment variable 
api_key = os.environ.get('OPENAI_API_KEY')
if api_key is None:
    #Hard code the api key
    API_KEY = "sk-!$$$$%^&*)(*&^%$@@#$%^&*()_+)"
    openai.api_key = API_KEY

'''
# Generate a simple respone 
response = openai.ChatCompletion.create(
    model = "gpt-3.5-turbo",
    messages = [
        {"role" : "user", "content": "Can I integrate open ai into react app?"}
    ]
)
print(response)
'''

# Chat with openai
chat_log = []

while True:
    user_message = str(input())
    if user_message.lower() == 'quit':
        break
    else:
        chat_log.append({"role": "user", "content": user_message})
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_log
        )
        assistant_response = response['choices'][0]['message']['content']
        assistant_response = assistant_response.strip("\n").strip()
        print(f'chatgpt - {assistant_response}')
        chat_log.append({"role":"assistant", "content": assistant_response})