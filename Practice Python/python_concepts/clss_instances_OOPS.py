#TOPIC ONE - Classes & instances

class Employee:

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay

    def fullname(self):
        return f'{self.first} {self.last}'


emp_1 = Employee("John", "Wick", 5000)

print(emp_1.first)

print(emp_1.fullname())

print(Employee.fullname(emp_1)) 

'''
Reference:
URL: https://www.youtube.com/watch?v=ZDa-Z5JzLYM&list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc&index=2
Title: Python OOP Tutorial 1: Classes and Instances
Channel: Corey Schafer
'''