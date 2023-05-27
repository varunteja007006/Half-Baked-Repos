import os
from fpdf import FPDF
import img2pdf

Pdf = FPDF()
# current directory path
BASE_DIR = os.getcwd()
# get list of all jpg files in the current directory
list_of_images = [i for i in os.listdir(BASE_DIR) if i.endswith(".jpg")]
# Multiple images to pdf
if (len(list_of_images) > 1):
    for i in list_of_images:
        Pdf.add_page()
        Pdf.image(i)
        Pdf.output("result.pdf", "F")
# Single image to pdf
else:
    with open("output.pdf", "wb") as file:
        file.write(img2pdf.convert(list_of_images))
