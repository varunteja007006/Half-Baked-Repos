#find factors of a number - Just numbers that can divide the given number
def find_factors(num):
    factors = []
    for i in range(1, num+1):
        if num % i == 0:
            factors.append(i)
    return factors

num1 = int(input())
print(find_factors(num1))