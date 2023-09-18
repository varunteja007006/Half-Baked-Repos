import PIL
from PIL import Image
from tkinter import filedialog
import os
'''
NOTE: JPEG does not support an alpha channel, as it is a format primarily used for storing and compressing photographic images. Hence RGBA images should be converted to RGB
Keep in mind that by converting the image from RGBA to RGB, you will lose the alpha channel and any transparency information associated with it.'''
BASE_DIR = os.getcwd()
#function to convert png images to rgb
def convert_png_to_rgb(file_path):
    # Open the RGBA image
    rgba_image = Image.open(file_path)
    # Convert RGBA to RGB
    rgb_image = rgba_image.convert('RGB')
    # Save the RGB image as JPEG
    output_path = file_path.replace('.png','.jpg')
    rgb_image.save(output_path, 'JPEG')
def compress_jpg_images():
    list_of_jpg_images = [i for i in os.listdir(BASE_DIR) if i.endswith(".jpg")]
    for i in list_of_jpg_images:
        img = Image.open(i)
        output_path = i.replace(".jpg","_compressed.jpg")
        img.save(output_path, "JPEG", optimize=True, quality=10)

#check for Png images
list_of_png_images = [i for i in os.listdir(BASE_DIR) if i.endswith(".png")]
#more than one png images
if len(list_of_png_images)>1:
    for i in list_of_png_images:
        convert_png_to_rgb(i)
    compress_jpg_images()
#only one png images
else:
    convert_png_to_rgb(list_of_png_images[0])
    compress_jpg_images()



