# Python equivalent of above C++ code
# Python program to implement interpolation search by using iteration approach
def interpolationSearchIterative(arr, n, x):

	# Find indexes of two corners
	low = 0
	high = (n - 1)

	# Since array is sorted, an element present
	# in array must be in range defined by corner
	while low <= high and x >= arr[low] and x <= arr[high]:
		if low == high:
			if arr[low] == x:
				return low;
			return -1;

		# Probing the position with keeping
		# uniform distribution in mind.
		pos = int(low + (((float(high - low)/( arr[high] - arr[low])) * (x - arr[low]))))

		# Condition of target found
		if arr[pos] == x:
			return pos

		# If x is larger, x is in upper part
		if arr[pos] < x:
			low = pos + 1;

		# If x is smaller, x is in lower part
		else:
			high = pos - 1;
	
	return -1

# Main function
if __name__ == "__main__":
	# Array of items on whighch search will
	# be conducted.
	arr = [10, 12, 13, 16, 18, 19, 20, 21,
		22, 23, 24, 33, 35, 42, 47]
	n = len(arr)

	x = 18 # Element to be searched
	index = interpolationSearchIterative(arr, n, x)

	# If element was found
	if index != -1:
		print ("Element found at index",index)
	else:
		print ("Element not found")


# Python3 program to implement
# interpolation search
# with recursion

# If x is present in arr[0..n-1], then
# returns index of it, else returns -1.


def interpolationSearchRecursive(arr, lo, hi, x):

	# Since array is sorted, an element present
	# in array must be in range defined by corner
	if (lo <= hi and x >= arr[lo] and x <= arr[hi]):

		# Probing the position with keeping
		# uniform distribution in mind.
		pos = lo + ((hi - lo) // (arr[hi] - arr[lo]) *
					(x - arr[lo]))

		# Condition of target found
		if arr[pos] == x:
			return pos

		# If x is larger, x is in right subarray
		if arr[pos] < x:
			return interpolationSearchRecursive(arr, pos + 1,
									hi, x)

		# If x is smaller, x is in left subarray
		if arr[pos] > x:
			return interpolationSearchRecursive(arr, lo,
									pos - 1, x)
	return -1

# Driver code


# Array of items in which
# search will be conducted
arr = [10, 12, 13, 16, 18, 19, 20,
	21, 22, 23, 24, 33, 35, 42, 47]
n = len(arr)

# Element to be searched
x = 18
index = interpolationSearchRecursive(arr, 0, n - 1, x)

if index != -1:
	print("Element found at index", index)
else:
	print("Element not found")

# This code is contributed by Hardik Jain
