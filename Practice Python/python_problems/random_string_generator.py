import random, string

def randomword(length):
   letters = string.ascii_lowercase + string.ascii_uppercase
   print(letters)
   return ''.join(random.choice(letters) for i in range(length))

result = randomword(32)
print(result)