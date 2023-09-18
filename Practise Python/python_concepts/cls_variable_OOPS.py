# TOPIC TWO - Class variables

class Employee:

    raise_amount = 1.04 #this is a class variable
    num_of_emps = 0 #this is a class variable

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay
        Employee.num_of_emps += 1

        '''Reason for not using self here because whatever the instance the num of employees should not change.
        Therefore referring with Class would be appropriate'''

    def fullname(self):
        return f'{self.first} {self.last}'

    '''
    def apply_raise(self):
        self.pay = int(self.pay*1.04)
    # Avoid the above way of defining the raise percent (1.04) instead create a class variable on the top
    '''

    def apply_raise(self):
        # why use self.raise_amount when it is a class attribute?? Because
        # we access raise_amount by instance
        self.pay = int(self.pay*self.raise_amount)
        # we access raise_amount by Class
        self.pay = int(self.pay*Employee.raise_amount)


emp_1 = Employee("John", "Wick", 5000)

emp_1.apply_raise()

print(f'This is emp_1 raise amount Rs.{emp_1.pay}/-')

# raise amount changes for all the instances of all the instances to 1.05
Employee.raise_amount = 1.05  

# raise amount changes for only this instance of emp_1 to 1.06
emp_1.raise_amount = 1.06


'''
Using __dict__

print(emp_1.__dict__) -> {'first': 'John', 'last': 'Wick', 'pay': 5000} 

NO raise_amount

print(Employee.__dict__) -> {'__module__': '__main__', 'raise_amount': 1.04, '__init__': <function Employee.__init__ at 0x000001BE990A4A40>, 'fullname': <function Employee.fullname at 0x000001BE990A56C0>, 'apply_raise': <function Employee.apply_raise at 0x000001BE990A5760>, '__dict__': <attribute '__dict__' of 'Employee' objects>, '__weakref__': <attribute '__weakref__' of 'Employee' objects>, '__doc__': None} 

CONTAINS raise_amount.

''' 

'''
Reference:
URL: https://www.youtube.com/watch?v=BJ-VvGyQxho&list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc&index=2
Title: Python OOP Tutorial 2: Class Variables
Channel: Corey Schafer
'''