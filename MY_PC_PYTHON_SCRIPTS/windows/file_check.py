import os

'''
main_path = 'C:/Users/varun'
main_folders = ['Desktop', 'Music', 'Pictures','Videos']

for main_folder in main_folders:
    search_path = os.path.join(main_path, main_folder)
    for i, j, k in os.walk(search_path):
        print("path =", i)
        print("List of directories =", j)
        print("List of files =", k)
'''

main_path = "D:/TV"
file_obj = open("Files Log.txt","w")
for i, j, k in os.walk(main_path):
    file_obj.write("path")
    file_obj.write( i )
    file_obj.write("\n")
    file_obj.write("List of directories =")
    for _j in j:
        file_obj.write( _j)
        file_obj.write("\n")
    file_obj.write("List of files =")
    for _k in k:
        file_obj.write( _k)
    file_obj.write("\n")

