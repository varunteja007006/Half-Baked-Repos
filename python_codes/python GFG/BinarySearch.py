# Python3 Program for recursive binary search.
# Returns index of x in arr if present, else -1
def binarySearchRecursive(arr, l, r, x):
	# Check base case
	if r >= l:
		mid = l + (r - l) // 2
		# If element is present at the middle itself
		if arr[mid] == x:
			return mid
		# If element is smaller than mid, then it
		# can only be present in left subarray
		elif arr[mid] > x:
			return binarySearchRecursive(arr, l, mid-1, x)
		# Else the element can only be present
		# in right subarray
		else:
			return binarySearchRecursive(arr, mid + 1, r, x)
	# Element is not present in the array
	else:
		return -1

# Driver Code
if __name__ == '__main__':
	arr = [2, 3, 4, 10, 40]
	x = 10
	# Function call
	result = binarySearchRecursive(arr, 0, len(arr)-1, x)
	if result != -1:
		print("Element is present at index", result)
	else:
		print("Element is not present in array")

print("-"*35)
# Python3 code to implement iterative Binary
# Search.
# It returns location of x in given array arr
# It returns location of x in given array arr
def binarySearch(arr, l, r, x):
    arr = sorted(arr)
    while l <= r:
        print(f'left_idx: {l}, right_idx: {r}, {l}+{(r-l)}')
        
        mid = l + (r - l) // 2

        print(f'mid_idx: {mid}')
 
        # Check if x is present at mid
        if arr[mid] == x:
            return mid
 
        # If x is greater, ignore left half
        elif arr[mid] < x:
            l = mid + 1
 
        # If x is smaller, ignore right half
        else:
            r = mid - 1
 
    # If we reach here, then the element
    # was not present
    return -1

# Driver Code
if __name__ == '__main__':
	arr = [28, 64, 45, 3, 92, 51, 13, 87, 9, 78, 36, 68, 59, 24,  75, 81, 56, 37, 2, 47, 93, 61, 10, 16, 72, 7, 50, 98, 20, 84]
	x = 61
	# Function call
	result = binarySearch(arr, 0, len(arr)-1, x)
	if result != -1:
		print("Element is present at index", result)
	else:
		print("Element is not present in array")
