# TOPIC SIX - Property Decorators - Getters, Setters and Deleter

class Employee:

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay
        # self.email = first+"."+last+"@test.com"
        
    @property # This method can be accessed as if it is a attribute just by mentioning property decorator
    def email(self):
        return f'{self.first}.{self.last}@test.com'
    
    # # without property decorator fullname method
    # def fullname(self):
    #     return f'Fullname: {self.first} {self.last}'
    
    @property
    def fullname(self):
        return f'Fullname: {self.first} {self.last}'

    @fullname.setter #to set the attribute fullname we use setter on the property fullname
    def fullname(self,name):
        first,last = name.split(' ')
        self.first = first
        self.last = last        

    @fullname.deleter #to delete the attribute fullname we use deleter on the property fullname
    def fullname(self):
        print('deleted fullname')
        self.first = None
        self.last = None     


# # first execution
# emp_1 = Employee("John", "Wick", 5000)
# print(emp_1.first)
# print(emp_1.email)
# print(emp_1.fullname())

# output :
# John
# John.Wick@test.com
# Fullname: John Wick




# # second execution
# emp_2 = Employee("John", "Wick", 5000)
# emp_2.first = 'Jim'
# print(emp_2.first)
# print(emp_2.email)
# print(emp_2.fullname())

# output :
# Jim
# John.Wick@test.com
# Fullname: Jim Wick





# # third execution
# To correct the above error where the email is not getting updated we can use property decorator.

# emp_3 = Employee("John", "Wick", 5000)
# emp_3.first = 'Jim'
# print(emp_3.first)
# print(emp_3.email)
# print(emp_3.fullname())

# output :
# Jim
# Jim.Wick@test.com
# Fullname: Jim Wick





# # fourth execution
# we can also add property decorator to fullname

# emp_4 = Employee("John", "Wick", 5000)
# emp_4.first = 'Jim'
# print(emp_4.first)
# print(emp_4.email)
# print(emp_4.fullname)

# output :
# Jim
# Jim.Wick@test.com
# Fullname: Jim Wick




# # fifth execution
# # Trying to set the attribute of the property fullname throws error
# #     emp_4.fullname = 'Jim wick'
# # AttributeError: can't set attribute 'fullname'

# emp_5 = Employee("John", "Wick", 5000)
# emp_5.fullname = 'Jim wick'
# print(emp_5.first)
# print(emp_5.email)
# print(emp_5.fullname)





# # sixth execution
# # To fix the above attribute error create a setter for the property fullname

# emp_6 = Employee("John", "Wick", 5000)
# emp_6.fullname = 'Jim wick'
# print(emp_6.first)
# print(emp_6.email)
# print(emp_6.fullname)



# # seventh execution
# # delete the attribute

# emp_7 = Employee("John", "Wick", 5000)
# emp_7.fullname = 'Jim wick'
# print(emp_7.first)
# print(emp_7.email)
# print(emp_7.fullname)

# del emp_7.fullname



'''
Reference:
URL: https://www.youtube.com/watch?v=jCzT9XFZ5bw&list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc&index=6
Title: Python OOP Tutorial 4: Inheritance - Creating Subclasses
Channel: Corey Schafer
'''     