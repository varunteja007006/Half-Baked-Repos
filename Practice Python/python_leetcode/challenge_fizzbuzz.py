'''
Fizz Buzz 

'''
n = 5
answer = []
for i in range(1, n+1):
    # print(i)
    if i % 3 == 0 and i % 5 == 0:
        answer.append("FizzBuzz")
    elif i % 3 == 0 and i % 5 != 0:
        answer.append("Fizz")
    elif i % 3 != 0 and i % 5 == 0:
        answer.append("Buzz")
    else:
        answer.append(str(i))
print(answer)