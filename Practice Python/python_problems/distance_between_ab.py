#TEST
#Find the distance between a to a and b to b in a string
def getlength(S):
    slen = len(S)
    x, y= 0,0
    a_dist, b_dist = [], []
    for i in range(0,slen+1): #whole length of string iterations
        if i < slen:
            for j in range(i+1, slen):
                if S[i] =='a' and S[j] == 'a':
                    a_dist.append(j-i)
                elif S[i] == 'b' and S[j] == 'b':
                    b_dist.append(j-i)
    x = max(a_dist)
    y = max(b_dist)
    print(f'Max distance between a: {x}\nMax distance between b: {y}')

S = "aabbbab"
print(f'The string we are going to use: {S}')

if len(S)<4:
    print("input not valid")
else:
    getlength(S)