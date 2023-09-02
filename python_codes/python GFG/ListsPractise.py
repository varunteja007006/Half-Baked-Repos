ip = [1,2,58,5,6,9,765,6,8,64,5,7]
addIp = [99,98,55]
n = len(ip)
breakingPoint = n//2
x = ip[:breakingPoint]
y = ip[breakingPoint:]

print(x)
print(y)

for i in addIp:
    x.append(i)
x.extend(y)

print(x)