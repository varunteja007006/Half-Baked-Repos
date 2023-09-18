# Python program to find an element x
# in a sorted array using Exponential Search

# A recursive binary search function returns
# location of x in given array arr[l..r] is
# present, otherwise -1
def binarySearch( arr, l, r, x):
	if r >= l:
		mid = l + ( r-l ) // 2
		
		# If the element is present at
		# the middle itself
		if arr[mid] == x:
			return mid
		
		# If the element is smaller than mid,
		# then it can only be present in the
		# left subarray
		if arr[mid] > x:
			return binarySearch(arr, l,
								mid - 1, x)
		
		# Else he element can only be
		# present in the right
		return binarySearch(arr, mid + 1, r, x)
		
	# We reach here if the element is not present
	return -1

# Returns the position of first
# occurrence of x in array
def exponentialSearch(arr, n, x):
	# IF x is present at first
	# location itself
	if arr[0] == x:
		return 0
		
	# Find range for binary search
	# j by repeated doubling
	i = 1
	while i < n and arr[i] <= x:
		i = i * 2
	
	# Call binary search for the found range
	return binarySearch( arr, i // 2,
						min(i, n-1), x)
	

# Driver Code
arr = [2, 3, 4, 10, 40]
n = len(arr)
x = 10
result = exponentialSearch(arr, n, x)
if result == -1:
	print ("Element not found in the array")
else:
	print ("Element is present at index %d" %(result))

# This code is contributed by Harshit Agrawal


def exponential_search(arr, x):
	n = len(arr)
	if n == 0:
		return -1

	# Find range for binary search by repeatedly doubling i
	i = 1
	while i < n and arr[i] < x:
		i *= 2

	# Perform binary search on the range [i/2, min(i, n-1)]
	left = i // 2
	right = min(i, n-1)

	while left <= right:
		mid = (left + right) // 2
		if arr[mid] == x:
			return mid
		elif arr[mid] < x:
			left = mid + 1
		else:
			right = mid - 1

	return -1

	

# Driver Code
arr = [2, 3, 4, 10, 40]
n = len(arr)
x = 10
result = exponential_search(arr, x)
if result == -1:
	print ("Element not found in the array")
else:
	print ("Element is present at index %d" %(result))

# This code is contributed by Ajay singh
