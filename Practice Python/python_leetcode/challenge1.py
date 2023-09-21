# Running Sum of 1D Array
'''
Example:-

input: nums = [3,1,2,10,1]
output: [3,4,6,16,17]
'''
# Solution
data_input = list(map(int, input().strip('[]').split(',')))
print(data_input)
if len(data_input) > 1:
    temp = []
    for i in range(0, len(data_input)):
        if i == 0:
            temp.append(data_input[i])
        else:
            data_input[i] = data_input[i]+data_input[i-1]
            temp.append(data_input[i])
            # pass
    print(temp)
else:
    print(data_input[0])
