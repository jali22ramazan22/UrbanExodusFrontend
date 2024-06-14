from PIL import Image
import os

PREFERRED_WIDTH = 128
PREFERRED_HEIGHT = 128


def compressImage(image: str):
  imageFile = Image.open(image)
  newSize = (PREFERRED_WIDTH, PREFERRED_HEIGHT)
  resizedImage = imageFile.resize(newSize)
  resizedImage.save(image, optimize=True, quality=50)


def returnAllImages():
  print("CALLBACK from listing every IMAGE")
  return [f for f in os.listdir('.') if os.path.isfile(f) and f.endswith(".png")]


def printImageSize(image: str):
  imageFile = Image.open(image)
  width, height = imageFile.size
  print(f"SIZE - {width}x{height} of image '{image}'")


print(f"STARTING COMPRESSING IMAGES IN DIRECTORY {os.getcwd()}")

print("...")


allImages = returnAllImages()
print("FINDING OUT THE FILE SIZE...")
for image in allImages:
  printImageSize(image)


# need to finish the code to leave the user to compress it manually



