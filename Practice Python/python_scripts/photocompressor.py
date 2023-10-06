# Driver function
import PIL
from PIL import Image
import os

def folder_scan(path='/home/varun/Pictures/assets'):
    PATH = []
    for (root,dirs,files) in os.walk(path, topdown=True):
        search_path = []
        if len(files) != 0:
            search_path = [os.path.join(root,file) for file in files ]
            PATH.append(search_path)

    for path in PATH:
        for image_path in path:
            if image_path.endswith(".png"):
                convert_png_to_rgb(image_path)
            elif image_path.endswith(".jpg"):
                compress_jpg_images(image_path)
    
    print("DONE...")

def convert_png_to_rgb(image_path):
    # Open the RGBA image
    rgba_image = Image.open(image_path)
    # Convert RGBA to RGB
    rgb_image = rgba_image.convert('RGB')
    # output path
    output_path = image_path.replace('.png','.jpg')
    # Save the RGB image as JPEG
    rgb_image.save(output_path, 'JPEG')
    os.remove(image_path)
    compress_jpg_images(output_path)

def convert_to_webp(image_path):
    output_path = image_path.replace("_compressed.jpg",".webp")
    image = Image.open(image_path)  # Open image
    image.save(output_path, format="webp")  # Convert image to webp
    os.remove(image_path)

def compress_jpg_images(image_path):
    if image_path.endswith(".jpg"):
        image = Image.open(image_path)
        output_path = image_path.replace(".jpg","_compressed.jpg")
        image.save(output_path, "JPEG", optimize=True, quality=40)
        os.remove(image_path)
        convert_to_webp(output_path)

if __name__ == "__main__":
    folder_or_file = int(input("OPTION 1: folder path.\nOPTION 2: file path.\nChoose by typing 1 or 2 : "))
    if folder_or_file == 1:
        path = input("Give the folder path : ")
        folder_scan(path)
    elif folder_or_file == 2:
        png_or_jpg = int(input("OPTION 1: .png file type.\nOPTION 2: .jpg file type.\nChoose by typing 1 or 2 : "))
        if png_or_jpg == 1:
            path = input("Give the file path : ")
            convert_png_to_rgb(path)
        elif png_or_jpg == 2:
            path = input("Give the file path : ")
            compress_jpg_images(path)
        else:
            print("Invalid option")
    else:
        print("Invalid option")



    
