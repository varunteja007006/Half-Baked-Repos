'''
#size 3

----c----
--c-b-c--
c-b-a-b-c
--c-b-c--
----c----

#size 5

--------e--------
------e-d-e------
----e-d-c-d-e----
--e-d-c-b-c-d-e--
e-d-c-b-a-b-c-d-e
--e-d-c-b-c-d-e--
----e-d-c-d-e----
------e-d-e------
--------e--------



input = size of the rangoli
string: a single string made up of each of the lines of the rangoli separated by a newline character (\n)
'''
import string

alphabets = list(string.ascii_lowercase)
# print(alphabets)

def print_rangoli(size):

    if size == 1:
        print(*alphabets[:size])
    else:

        # a-b-c
        str1 = '-'.join(alphabets[:size])

        # c-b
        str2 = '-'.join(reversed(alphabets[1:size]))

        # get middle string
        middle_str = str2+'-'+str1
        # middle string length
        max_matrix_len = len(middle_str)

        #center to add padding in a string
        # "e".center(max_matrix_len, "*")
        for i in range(1,size+1):
            print('-'.join(alphabets[size-1:size-i:-1]+alphabets[size-i:size]).center(max_matrix_len, "-"))

        # same as above but in reverse order
        for i in range(size-1,0,-1):
            print('-'.join(alphabets[size-1:size-i:-1]+alphabets[size-i:size]).center(max_matrix_len, "-"))


if __name__ == '__main__':
    size = int(input("Enter the size of Rangoli: "))
    print_rangoli(size)