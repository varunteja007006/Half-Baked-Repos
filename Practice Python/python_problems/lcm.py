#Find LCM - A number that is divided by given two numbers
def find_lcm(num1, num2):
    if num1 > num2:
        greater = num1
    else:
        greater = num2
    while(True):
        if((greater % num1 == 0) and (greater % num2 == 0)):
           lcm = greater
           break
        greater += 1
    return lcm

num1, num2 = int(input("Input one: ")), int(input("Input Two: "))
print(find_lcm(num1,num2))