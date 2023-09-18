# TOPIC THREE - Class methods, static methods

import datetime

class Employee:

    raise_amount = 1.04

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay

    def fullname(self):
        print(f'{self.first} {self.last}')

    def apply_raise(self):
        self.pay = int(self.pay*self.raise_amount)
        return self.pay

    @classmethod
    def set_raise_amount(cls, amount):
        cls.raise_amount = amount

    # using class methods as alternative constructors
    @classmethod
    def from_string(cls, emp_str):
        first, last, pay = emp_str.split("-")
        pay = int(pay)
        return cls(first, last, pay)

    @staticmethod
    def is_workday(day):
        if day.weekday() == 5 or day.weekday() == 6:
            return True
        return False


emp_1 = Employee("John", "Wick", 5000)

# Changes all the instance to have raise_amount = 1.06
Employee.set_raise_amount(1.06)  # same as Employee.raise_amount = 1.06

# You can also change the raise_amount value with instances
emp_1.set_raise_amount(1.08)  # Changes all the instance to raise_amount = 1.08


# example for classmethod
emp_str_1 = "Karl-Ruby-1000"
output_emp_str_1 = Employee.from_string(emp_str_1)
output_emp_str_1.fullname()
print(output_emp_str_1.apply_raise())

# example for staticmethod
my_date = datetime.date(2023, 5, 26)
print(Employee.is_workday(my_date)) 

'''
Regular Methods - Automatically pass the instance. It is called as self.
Class Methods - Automatically pass the class as instance. It is called as cls.
Static Methods - Does not take any instance (self) or class variable (cls).
'''

'''
Reference:
URL: https://www.youtube.com/watch?v=rq8cL2XMM5M&list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc&index=3
Title: Python OOP Tutorial 3: classmethods and staticmethods
Channel: Corey Schafer
''' 
