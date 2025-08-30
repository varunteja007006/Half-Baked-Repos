import ollama

res = ollama.chat(model = "llava:13b",
                  
                  messages = [{
                    'role':'user',
                    'content':'describe the image',
                    'images': ['./image-samples/hanna-plants-6QFM_X9kJog-unsplash.jpg']}
                ])

print(res['message']['content'])