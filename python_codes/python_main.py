# code block 3
print("This code is always executed")

# code block 1


def main():
    print('Hello this is main, only exexuted when it is main')


if __name__ == '__main__':
    main()
# code block 2
else:
    print('This is not main therefore it is run')

'''
Do run the python_dummy_import file to get more information on this.
'''

'''
When you directly run this file in python it checks if it is main and executes accordingly (#code block 1).

When this file is imported by another file then it is indirectly run by that file hence it wont run the main but anything other than that
(#code block 2)

(#code block 3) is always run because it is not restricted by any condition.

For better understanding refer - https://www.youtube.com/watch?v=sugvnHA7ElY 
-> Python Tutorial: if __name__ == '__main__'
-> By Corey Schafer
'''
