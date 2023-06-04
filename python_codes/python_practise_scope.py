'''
Scope of a variable. Python uses LEGB rule to check the scope of a variable

L - Local
E - Enclosing
G - Global
B - Built in
'''

'''
Enclosing example
'''

x = 'global x'

def outer():
    x = 'outer x'

    def inner():
        '''if the variable x exists in inner then it is local scope and prints 'inner x'
        but if the variable does not exist in inner then it checks for outer this is enclosing scope and if it finds 
        it there then it will print 'outer x'
        '''
        # x = 'inner x' 
        print(x)
    inner()
    print(x)


outer()
print(x)