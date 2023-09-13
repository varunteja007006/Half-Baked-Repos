
# Import QRCode from pyqrcode
import pyqrcode

# String which represents the QR code
s = "https://varunteja007006.netlify.app/"

# Generate QR code
qrcode = pyqrcode.create(s)

# Create and save the svg file naming "myqr.svg"
# qrcode.svg("assets/myqr.svg", scale = 8)

# Create and save the png file naming "myqr.png"
qrcode.png('assets/myqr.png', scale=6, module_color=[0, 0, 0, 128], background=[0xff, 0xff, 0xcc])
qrcode.show()
