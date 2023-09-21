#prime number
x = int(input("Input the value to check if it is a prime or not: "))
flag = False

if x == 1:
    print("try greater than 1")

else:
    halfway_x = x//2
    for i in range(2,halfway_x+1):
        if x % i == 0:
            flag = True
            break
        
if flag is True:
    print("Not prime")
else:
    print("Is prime")