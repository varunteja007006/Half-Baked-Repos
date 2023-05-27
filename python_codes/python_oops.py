"""  
'''

#EXAMPLE ONE - Classes & instances

'''
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

 """

# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

""" 
'''

# EXAMPLE TWO - Class variables

'''


class Employee:

    raise_amount = 1.04
    num_of_emps = 0

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay
        Employee.num_of_emps += 1
        '''Reason for not using self here because whatever the instance the num of employees should not change.
        Therefore refering with Class would be appropriate'''

    def fullname(self):
        return f'{self.first} {self.last}'
    '''
    def apply_raise(self):
        self.pay = int(self.pay*1.04)
    # Avoid the above way of defining the raise percent (1.04) instead create a class variable on the top
    '''

    def apply_raise(self):
        # why use self.raise_amount when it is a class attribute??
        self.pay = int(self.pay*self.raise_amount)


emp_1 = Employee("John", "Wick", 5000)

emp_1.apply_raise()
print(emp_1.pay)
Employee.raise_amount = 1.05  # Changes for all the instances
emp_1.raise_amount = 1.05  # Changes for only this instances

'''

print(emp_1.__dict__) -> {'first': 'John', 'last': 'Wick', 'pay': 5000} 

NO raise_amount

print(Employee.__dict__) -> {'__module__': '__main__', 'raise_amount': 1.04, '__init__': <function Employee.__init__ at 0x000001BE990A4A40>, 'fullname': <function Employee.fullname at 0x000001BE990A56C0>, 'apply_raise': <function Employee.apply_raise at 0x000001BE990A5760>, '__dict__': <attribute '__dict__' of 'Employee' objects>, '__weakref__': <attribute '__weakref__' of 'Employee' objects>, '__doc__': None} 

CONTAINS raise_amount.

''' 
 """

# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

""" 
'''

# EXAMPLE THREE - Class methods, static methods

'''

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

    @classmethod
    def set_raise_amount(cls, amount):
        cls.raise_amount = amount

    @classmethod
    def from_string(cls, emp_str):
        first, last, pay = emp_str.split("-")
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
emp_1.set_raise_amount(1.06)  # Changes all the instance to raise_amount = 1.06


# example for classmethod
emp_str_1 = "Karl-Ruby-9000"
output_emp_str_1 = Employee.from_string(emp_str_1)
output_emp_str_1.fullname()

'''
Regular Methods - Automatically pass the instance. It is called as self
Class Methods - Automatically pass the class as instance. It is called as cls
Static Methods - Does not take any instance or class variable.
'''
# example for staticmethod
my_date = datetime.date(2023, 5, 26)
print(Employee.is_workday(my_date)) 

 """

# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

""" 
'''

# EXAMPLE FOUR - Inheritance

# Inheritance allows us to inherit the attributes and methods from the parent class. We can create subclasess and get all the functionality of parent class and then we can override and add new functionality without overriding the parent class.

'''

class Employee:

    raise_amount = 1.04

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay
        self.email = first+'.'+last+'@test.com'

    def fullname(self):
        print(f'Fullname - {self.first} {self.last}')

    def apply_raise(self):
        self.pay = int(self.pay*self.raise_amount)


class Developer(Employee):
    raise_amount = 1.10  # This attribute is only used when Developer class is instanciated

    def __init__(self, first, last, pay, prog_lang):
        super().__init__(first, last, pay)
        # # OR can be typed as below
        # Employee.__init__(self, first,last,pay)
        self.prog_lang = prog_lang


class Manager(Employee):

    def __init__(self, first, last, pay, employees=None):
        '''

        why not pass list directly? 
        Mutuable data types should not be passed as default arguements. Hence employee=None
        
        '''
        super().__init__(first, last, pay)
        if employees is None:
            employees = []
        else:
            self.employees = employees

    def add_emp(self, emp):
        if emp not in self.employees:
            self.employees.append(emp)

    def remove_emp(self, emp):
        if emp in self.employees:
            self.employees.remove(emp)

    def print_emp(self):
        print('--------Direct Reports--------')
        for emp in self.employees:
            emp.fullname()


dev_1 = Developer("John", "Wick", 5000, 'python')
dev_2 = Developer("Cold", "walker", 6000, 'java')

# Developer class inherits the attributes from Employee class
print(dev_1.email, dev_1.prog_lang)
print(dev_2.email, dev_2.prog_lang)

manager_1 = Manager("Manny", "Tao", 2023, [dev_1])
manager_1.fullname()
manager_1.print_emp()

manager_1.add_emp(dev_2)
manager_1.print_emp()

manager_1.remove_emp(dev_1)
manager_1.print_emp()

# Check the inheritance using help
print(help(Developer))

print(isinstance(manager_1,Manager)) 
#True manager_1 is instanace of Manager class
print(isinstance(manager_1,Employee)) 
#True manager_1 is instanace of Employee class because Manager class inherits from Employee class
print(isinstance(manager_1,Developer)) 
#False manager_1 is not instance of Developer class nor the Manager class inherits from Developer class

print(issubclass(Developer,Employee))
#True 
print(issubclass(Manager,Employee))
#True
print(issubclass(Manager,Developer))
#False
 """

# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
""" 
'''
# EXAMPLE FIVE - Special (Magic/Dunder) Methods

# These methods allow us to emulate built-in types or implement operator overloading. 

when methods are surrounded by double underscores it is called dunders.
For example when they say dunder init they mean  __init__ 

About __repr___
Provides the official string representation of an object, aimed at the programmer.

About __str___ 
Provides the informal string representation of an object, aimed at the user
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
# prints <__main__.Employee object at 0x00000208AC6CF6D0> 
# Without __repr__ and __str___

# prints Employee(first,last,pay)
# With __repr___

# prints fullname , email
# With __str___
'''
print(emp_1.__str__())
print(emp_1.__repr__())
print(emp_1 + emp_2)
print(len(emp_1))
 """
# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

'''
# EXAMPLE SIX - Special (Magic/Dunder) Methods

# These methods allow us to emulate built-in types or implement operator overloading. 

when methods are surrounded by double underscores it is called dunders.
For example when they say dunder init they mean  __init__ 

About __repr___
Provides the official string representation of an object, aimed at the programmer.

About __str___ 
Provides the informal string representation of an object, aimed at the user
'''


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
