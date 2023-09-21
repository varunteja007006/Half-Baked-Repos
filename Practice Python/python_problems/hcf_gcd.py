#Find the HCF and GCD - Common Factor that can divide two numbers
def find_hcf(num1, num2):
    smaller_num = 0
    if num1>num2:
        smaller_num = num2
    else:
        smaller_num = num1
    for i in range(1,smaller_num):
        if((num1 % i == 0) and (num2 % i == 0)):
            hcf = i 
    return hcf

num1, num2 = int(input("Input one: ")),int(input("Input two: "))

print("The H.C.F. is", find_hcf(num1, num2))