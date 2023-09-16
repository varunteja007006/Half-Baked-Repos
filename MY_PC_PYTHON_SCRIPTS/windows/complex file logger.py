import os

# Get the list of all files and directories
main_path = "C://Users//varun//"
main_folders_pc = ["Desktop", "Documents", "Downloads", "Music", "Pictures", "Videos" ]
more_files = []

class scan_files:
    def scanner_files(more_files):
        pass

    def text_files(dir_list,file_obj):
#        more_files.clear()
        for _file in dir_list:
            #mkv video files
            if _file.endswith(".mkv"):
                file_obj.writelines("Movie - "+_file+" \n")
            #mp4 video files
            elif _file.endswith(".mp4"):
                file_obj.writelines("Video - "+_file+" \n")
            #py files
            elif _file.endswith(".py"):
                file_obj.writelines("Python - "+_file+" \n")        
            #text files
            elif _file.endswith(".txt"):
                file_obj.writelines("Text File - "+_file+" \n")      
            #ini files -A common INI file in Windows called desktop.ini is a ​hidden file that stores information about how folders and files should appear.       
            elif _file.endswith(".ini"):
                pass
            #zip files
            elif _file.endswith(".exe"):
                file_obj.writelines("exe File - "+_file+" \n")          
            #zip files
            elif _file.endswith(".zip"):
                file_obj.writelines("Zip File - "+_file+" \n")   
            #pptx files
            elif _file.endswith(".pptx"):
                file_obj.writelines("PPT File - "+_file+" \n")          
            #pdf files
            elif _file.endswith(".pdf"):
                file_obj.writelines("PDF File - "+_file+" \n")      
            # Images     
            elif _file.endswith(".jpeg") or _file.endswith(".jpg"):
                file_obj.writelines("Image File - "+_file+" \n")    
            else:
                file_obj.writelines(_file+" \n")
                more_files.append(_item+"//"+_file+"//")
        
        #scan_files.scanner_files(more_files)
        file_obj.write("*"*90+"\n")
        
file_obj = open("Files Log_C.txt","w")

for _item in main_folders_pc:
    dir_list = os.listdir(main_path+_item)
    file_obj.write("Files or Folders in "+_item+"\n")
    file_obj.write("-"*90+"\n")
    scan_files.text_files(dir_list,file_obj)
