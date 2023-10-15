# arr = ["[4, 5, 6, 5]", "[1, 1, 2, 2]", "[5, 4, 2, 9]", "[1, 2, 3, 4]"]

# 2D Matrix
# 4 5 6 5
# 1 1 2 2
# 5 4 2 9
# 1 2 3 4

# Output
# 4,5,6,5,2,9,4,3,2,1,5,1,1,2,2,4

def spiral_order(arr):
  """
  Prints the elements of a 2D array in spiral order.

  Args:
    arr: A 2D array.
  """

  m = len(arr) #no of rows
  n = len(arr[0]) #no of cols

  top = 0 #first row
  left = 0 # first col
  bottom = m - 1 # last row
  right = n - 1 # last col

  while top <= bottom and left <= right:
    # Print the top row from left to right.
    for i in range(left, right + 1):
      print(arr[top][i], end=",")
    # print('\n')

    # Increment the top row.
    top += 1

    # Print the right column from top to bottom.
    for i in range(top, bottom + 1):
      print(arr[i][right], end=",")
    # print('\n')

    # Decrement the right column.
    right -= 1

    # Print the bottom row from right to left.
    for i in range(right, left - 1, -1):
      print(arr[bottom][i], end=",")
    # print('\n')

    # Decrement the bottom row.
    bottom -= 1

    # Print the left column from bottom to top.
    for i in range(bottom, top - 1, -1):
      print(arr[i][left], end=",")
    # print('\n')

    # Increment the left column.
    left += 1


if __name__ == "__main__":
  arr = [
    [4, 5, 6, 5, 8],
    [1, 1, 2, 2, 8],
    [5, 4, 2, 9, 8],
    [1, 2, 3, 4, 8],
    [1, 2, 3, 4, 8],
  ]

  spiral_order(arr)