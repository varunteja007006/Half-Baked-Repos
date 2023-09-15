
# # EXAMPLE 1 Simple Decorators

def decorator_func(original_func):  # decorator_func receives another func as argument
    def wrapper_func():  # inner func
        print('This is wrapper func that is helping in modifying the display_func without modifying the original one','\n')
        # When the inner func is called function passed as argument is run.
        return original_func()
    # inner func returned but not executed or called ( no func call '()' )
    return wrapper_func



def display_func():
    print("display_func ran......",'\n')

print('-'*10,'Example 1.1', '-'*10,'\n')
decorated_display = decorator_func(display_func) #Assign the decorator_func and pass another func as argument
decorated_display() #call the decorator_func function assigned to decorated_display variable.



# # Above is one way of using decorator function.
# '''
# Why decorator?
# You can modify the function without actually modifying the function. In the above example,
# We modified the display_func without actually modifying the display_func by using the decorator_func
# where the modification took.

# '''
# # Another way of using decorator.


@decorator_func
def display_func():
    print("display_func ran......",'\n')

print('-'*10,'Example 1.2', '-'*10,'\n')
display_func()


# # EXAMPLE 2 Decorators with parameters passed.

def decorator_func(original_func):  # decorator_func receives another func as argument
    def wrapper_func(*args, **kwargs):  # inner func
        print(f'This is wrapper func that is helping in modifying the display_func without modifying the original one.{args},{kwargs}','\n')
        # When the inner func is called function passed as argument is run.
        return original_func(*args, **kwargs)
    # inner func returned but not executed or called ( no func call '()' )
    return wrapper_func

@decorator_func
def display_func(arg_one, arg_two):
    print(f'display_func ran......{arg_one}, {arg_two}','\n')

print('-'*10,'Example 2', '-'*10,'\n')
display_func('First Argument', 'Second Argument')

# EXAMPLE 3 Class Decorators.

class Decorator_class(object):
    def __init__(self, original_func):
        self.original_func = original_func

    def __call__(self, *args, **kwargs):
        print('Deorator class is run....','\n')
        return self.original_func(*args, **kwargs)


@Decorator_class
def display_func(arg_one, arg_two):
    print(f'{arg_one},{arg_two} are passed to display_func','\n')

print('-'*10,'Example 3', '-'*10,'\n')
display_func('first arg', 'second arg')


# # EXAMPLE 4 Chaining multiple decorators.

from functools import wraps

def my_logger(orig_func):
    import logging
    logging.basicConfig(filename='{}.log'.format(orig_func.__name__), level=logging.INFO)

    @wraps(orig_func)
    def wrapper(*args, **kwargs):
        logging.info(
            'Ran with args: {}, and kwargs: {}'.format(args, kwargs))
        return orig_func(*args, **kwargs)

    return wrapper

def my_timer(orig_func):
    import time

    @wraps(orig_func)
    def wrapper(*args, **kwargs):
        t1 = time.time()
        result = orig_func(*args, **kwargs)
        t2 = time.time() - t1
        print('{} ran in: {} sec'.format(orig_func.__name__, t2),'\n')
        return result

    return wrapper

import time

@my_logger
@my_timer
def display_info(name, age):
    time.sleep(1)
    print('display_info ran with arguments ({}, {})'.format(name, age),'\n')

print('-'*10,'Example 4', '-'*10,'\n')
display_info('Tom', 22)