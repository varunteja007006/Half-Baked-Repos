# TOPIC FOUR - Inheritance

'''
Inheritance allows us to inherit the attributes and methods from the parent class. We can create subclasses and get all the functionality of parent class and then we can override and add new functionality without overriding the parent class.
'''

class Employee: #parent class

    raise_amount = 1.04 #class variable

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay
        self.email = first+'.'+last+'@test.com'

    def fullname(self):
        print(f'Fullname - {self.first} {self.last}')

    def apply_raise(self):
        self.pay = int(self.pay*self.raise_amount)


class Developer(Employee): #child class to the parent class 'Employee'

    raise_amount = 1.10  # This class variable is only used when Developer class is instantiated

    def __init__(self, first, last, pay, prog_lang):
        super().__init__(first, last, pay)

        # # Alternative syntax
        # Employee.__init__(self, first,last,pay)

        self.prog_lang = prog_lang


class Manager(Employee): #child class to the parent class 'Employee'

    def __init__(self, first, last, pay, employees=None):
        '''
        why not pass list directly as 'employees=[]' instead of 'employees=None' ?? 
        Mutable data types should not be passed as default arguments. Hence employee=None
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
        # print('Manager:')
        # fullname = self.fullname()
        print('--------Direct Reports--------')
        for emp in self.employees:
            emp.fullname()


dev_1 = Developer("John", "Wick", 5000, 'python')
dev_2 = Developer("Cold", "walker", 6000, 'java')

# Developer class inherits the attributes from Employee class
print(f'Developer email is {dev_1.email}, prog language is {dev_1.prog_lang}')
print(f'Developer email is {dev_2.email}, prog language is {dev_2.prog_lang}')

# Manager class 
manager_1 = Manager("Manny", "Tao", 2023, [dev_1])
manager_1.fullname() # print manager's fullname
manager_1.print_emp() # print manager's employees
print('\n')

manager_1.add_emp(dev_2) # add an employee
manager_1.print_emp() # print manager's employees
print('\n')

manager_1.remove_emp(dev_1) # delete an employee
manager_1.print_emp() # print manager's employees
print('\n')

# # Check the inheritance using 'help'
# print(help(Developer))


# # checking the 'isinstance()'
# print(isinstance(manager_1,Manager)) 
# #True manager_1 is instance of Manager class

# print(isinstance(manager_1,Employee)) 
# #True manager_1 is instance of Employee class because Manager class inherits from Employee class

# print(isinstance(manager_1,Developer)) 
# #False manager_1 is not instance of Developer class nor the Manager class inherits from Developer class

# print(issubclass(Developer,Employee))
# #True 
# print(issubclass(Manager,Employee))
# #True
# print(issubclass(Manager,Developer))
# #False


'''
Reference:
URL: https://www.youtube.com/watch?v=RSl87lqOXDE&list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc&index=4
Title: Python OOP Tutorial 4: Inheritance - Creating Subclasses
Channel: Corey Schafer
''' 

