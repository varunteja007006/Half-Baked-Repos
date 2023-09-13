'''
Number of steps to reduce a number to zero
'''
num = 8
step_count = 0
while(num!=0):
    if num%2 == 0:
        num = num//2
    else:
        num = num-1
    step_count+=1
print( step_count)