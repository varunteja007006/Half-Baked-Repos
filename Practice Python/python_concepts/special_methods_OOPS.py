# TOPIC FIVE - Special (Magic/Dunder) Methods

'''

These methods allow us to emulate built-in types or implement operator overloading. 

When methods are surrounded by double underscores it is called dunders.
For example when they say dunder init they mean  '__init__'

About __repr___ :
Provides the official string representation of an object, aimed at the programmer/developers.

About __str___ :
Provides the informal string representation of an object, aimed at the user.

Good rule of thumb: Have '__repr__' because it will act as a fall back for '__str__' .

'''

class Employee:
    raise_amount = 1.04

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay
        self.email = first+'.'+last+'@test.com'

    def fullname(self):
        return f'{self.first} {self.last}'

    def apply_raise(self):
        self.pay = int(self.pay*self.raise_amount)

    def __repr__(self):
        return f'Employee({self.first}, {self.last},{self.pay})'

    def __str__(self):
        return f'{self.fullname()},{self.email}'

    def __add__(self, other):
        return self.pay + other.pay

    def __len__(self):
        return len(self.fullname().strip(" "))


emp_1 = Employee("John", "Wick", 5000)
emp_2 = Employee("Carl", "Mason", 8500)

print(emp_1)

'''

Output printed without __repr__ and __str___ :
>> <__ma'in__.Employee object at 0x00000208AC6CF6D0>' 

Output printed with __repr___ :
>> Employee('first','last','pay')

Output printed with __str___ :
>> 'fullname' , 'email' 

'''

print(emp_1.__str__())

print(emp_1.__repr__())

# Arithmetic special methods
print(1+2)

#same as 
print(int.__add__(1,2))
print(str.__add__('a','b'))


# add two employees together to get combined salary of the users
print(emp_1 + emp_2)

print(len(emp_1))

'''
Reference:
URL: https://www.youtube.com/watch?v=3ohzBxoFHAY&list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc&index=5
Title: Python OOP Tutorial 4: Inheritance - Creating Subclasses
Channel: Corey Schafer
''' 