# Python 3 implementation of
# above approach

import math

def MetaBinarySearch(A,key_to_search):

    n = len(A)
    print(f'Array length is {n}')
    #set no.of.bits to represent
    lg = int(math.log2(n-1)+1)
    print(f'lg value is {lg}')

    pos = 0

    for i in range(lg -1,-1,-1):
        print(f'iteration {i}')
        print(f'Did we get the element {A[pos] == key_to_search}')
        if(A[pos] == key_to_search):
            
            return pos

    # incrementally construct the index of the largest value
        new_pos = pos | (1<< i)
        print(f'new position is {new_pos}')

        if((new_pos<n) and (A[new_pos]<=key_to_search)):
            pos = new_pos

    # if element found return else return -1
    return (pos if A[pos] == key_to_search else -1)
if __name__ == "__main__":
    A = [-2, 10, 100, 250, 32315]
    print(MetaBinarySearch(A,10))