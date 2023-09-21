# Factorial of a number using recursion
def recur_factorial(n):
    if n == 1:
        return n
    else:
        return n*recur_factorial(n-1)

num = int(input("Factorial of ?: "))

# check if the number is negative
if num < 0:
   print("Sorry, factorial does not exist for negative numbers")
elif num == 0:
   print("The factorial of 0 is 1")
else:
   print(f'The factorial of {num} is {recur_factorial(num)}')


#factorial of a number - factorial of 6 is 1*2*3*4*5*6 = 720
c = int(input("Factorial of ?: "))
if c == 0:
    print(1)
elif c < 0:
    print("Input value should be greater than 0")
else:
    for i in range(c):
        factorial = factorial*i
    print(factorial)