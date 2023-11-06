# Richest customer Wealth
'''
m x n integer grid accounts where accounts[i][j] is the amount of money ith customer has in the jth bank. Return the wealth that the richest customer has.

m = accounts.length
n = accounts[i].length
1 <= m, n<= 50
1 <= accounts[i][j] <= 100

input: [[7,1,3],[2,8,7],[1,9,5]]
output: 17
'''
input_data = [[7, 1, 3], [2, 8, 7], [1, 9, 5]]

# max_wealth = []
maxi_wealth = 0
for i in range(len(input_data)):
    wealth = 0
    for j in range(len(input_data[i])):
        wealth += input_data[i][j]
    if maxi_wealth < wealth:
        maxi_wealth = wealth
    else:
        wealth = 0
    # max_wealth.append(wealth)

# print("max_wealth list", max(max_wealth))
print("maxi_wealth no list", maxi_wealth)
