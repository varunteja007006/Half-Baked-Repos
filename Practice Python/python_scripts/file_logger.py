import os
current_dir = os.getcwd()
mydata = list(os.listdir(current_dir))
print(mydata)
file_path='data.txt'
with open(file_path, 'w') as file:
    for item in mydata:
        file.write(item + '\n')
    print("\nFile successfully created.......")