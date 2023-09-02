#Approach 1
# Python3 program to find given two array are equal or not

# Returns true if arr1[0..n-1] and
# arr2[0..m-1] contain same elements.


def areEqual(arr1, arr2, N, M):
	# If lengths of array are not
	# equal means array are not equal
	if (N != M):
		return False

	# Sort both arrays
	arr1.sort()
	arr2.sort()

	# Linearly compare elements
	for i in range(0, N):
		if (arr1[i] != arr2[i]):
			return False

	# If all elements were same.
	return True

# Driver Code
if __name__ == "__main__":
	arr1 = [3, 5, 2, 5, 2]
	arr2 = [2, 3, 5, 5, 2]
	n = len(arr1)
	m = len(arr2)

	if (areEqual(arr1, arr2, n, m)):
		print("Yes")
	else:
		print("No")


#Approach 2
# Python3 program for the above approach
# Returns true if arr1[0..N-1] and
# arr2[0..M-1] contain same elements.

def is_arr_equal(arr1, arr2):
		# Check if the length of arrays are
	# equal or not: A Easy Logic Check
	if len(arr1) != len(arr2):
		return False
	# Create a dict named count to
	# store counts of each element
	count = {}
	# Store the elements of arr1
	# and their counts in the dictionary
	for i in arr1:
		if i in count:
				# Element already in dict, simply increment its count
			count[i] += 1
		else:
				# Element found for first time, initialize it with value 1.
			count[i] = 1
	# Traverse through arr2 and compare
	# the elements and its count with
	# the elements of arr1
	for i in arr2:
		# Return false if the element
		# is not in count or if any element
		# appears more no. of times than in arr1
		if i not in count or count[i] == 0:
			return False
		else:
				# If element is found, decrement
				# its value in the dictionary
			count[i] -= 1
	# Return true if both arr1 and
	# arr2 are equal
	return True

# Driver Code
if __name__ == "__main__":
	arr1 = [3, 5, 2, 5, 2]
	arr2 = [2, 3, 5, 5, 2]

	if is_arr_equal(arr1, arr2):
		print("Yes")
	else:
		print("No")
