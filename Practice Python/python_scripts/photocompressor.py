# Driver function
from PIL import Image
import os

def skim_files(file_paths):
    if len(file_paths)>0:
        for path in file_paths:
            for image_path in path:
                if image_path.endswith(".png"):
                    convert_png_to_rgb(image_path,image_quality)
                elif image_path.endswith(".jpg"):
                    compress_jpg_images(image_path,image_quality)
                elif image_path.endswith(".webp"):
                    compress_webp_images(image_path,image_quality)
        print("OPERATIONS DONE...")
    else:
        print("No files to scan.....")

def folder_scan(folder_path ='/home/varun/Pictures/assets', image_quality=85):
    PATH = []
    if folder_path:
        for (root,dirs,files) in os.walk(folder_path, topdown=True):
            search_path = []
            if len(files) != 0:
                search_path = [os.path.join(root,file) for file in files ]
                PATH.append(search_path)
        skim_files(PATH)
    else:
        print("No path given or path is invalid.")

def convert_png_to_rgb(image_path,image_quality=85):    
    # Open the RGBA image
    rgba_image = Image.open(image_path)
    # Convert RGBA to RGB
    rgb_image = rgba_image.convert('RGB')
    # output path
    output_path = image_path.replace('.png','.jpg')
    # Save the RGB image as JPEG
    rgb_image.save(output_path, 'JPEG')
    os.remove(image_path)
    compress_jpg_images(output_path,image_quality)

def convert_to_webp(image_path):
    output_path = image_path.replace("_compressed.jpg",".webp")
    image = Image.open(image_path)  # Open image
    image.save(output_path, format="webp")  # Convert image to webp
    os.remove(image_path)

def compress_jpg_images(image_path,image_quality=85):
    if image_path.endswith(".jpg"):
        image = Image.open(image_path)
        output_path = image_path.replace(".jpg","_compressed.jpg")
        image.save(output_path, "JPEG", optimize=True, quality=image_quality)
        os.remove(image_path)
        convert_to_webp(output_path)

def compress_webp_images(image_path,image_quality=85):
    image = Image.open(image_path)
    image.save(image_path, quality=image_quality, optimize=True)


if __name__ == "__main__":
    # picking folder or file
    folder_or_file = int(input("OPTION 1: folder path.\nOPTION 2: file path.\nChoose by typing 1 or 2 : "))
    
    # operation for folder
    if folder_or_file == 1:
        folderPath = input("Give the folder path : ")
        image_quality = input("Enter the quality of the image between 10-90. Default value 85: " )
        folder_scan(folderPath,image_quality)

    # operation for file
    elif folder_or_file == 2:
        print("\nOPTION 1: .png file type.\nOPTION 2: .jpg file type.\nOPTION 3: .webp file type.")
        fileType = int(input("Choose by typing 1 or 2 or 3 : "))
        filePath = input("Give the file path : ")
        image_quality = input("Enter the quality of the image between 10-90 (Default 85): ")

        if fileType == 1:
            convert_png_to_rgb(filePath,image_quality)
        elif fileType == 2:
            compress_jpg_images(filePath,image_quality)
        elif fileType == 3:
            compress_webp_images(filePath,image_quality)
        else:
            print("Invalid option")
    else:
        print("Invalid option")



    
