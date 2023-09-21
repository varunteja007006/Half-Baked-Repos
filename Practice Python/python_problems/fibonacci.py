# Python recursive program to display the Fibonacci sequence
def recur_fibo(n):
   if n <= 1:
       return n
   else:
       return (recur_fibo(n-1) + recur_fibo(n-2))
   
nterms = int(input("Please enter the input: "))
# check if the number of terms is valid.

if nterms <= 0:
   print("Please enter a positive integer.")
else:
   print("Fibonacci sequence:")
   for i in range(nterms):
       print(recur_fibo(i))


#fibanocci series - 0 + 1 + 1 + 2 + 3 + 5 ....
x = int(input("Enter the input: "))
a = 0
b = 1
count = 0
if x <= 0:
    print("number greater than 0")
elif x == 1:
    print(a)
else:
    while(count<x):
        print(a)
        temp = a+b
        a = b
        b = temp
        count= count+1