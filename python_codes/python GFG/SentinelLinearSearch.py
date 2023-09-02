'''
Method One
-> Initialize the search index variable i to 0.
-> Set the last element of the array to the search key.
-> While the search key is not equal to the current element of the array (i.e., arr[i]), increment the search index i.
-> If i is less than the size of the array or arr[i] is equal to the search key, return the value of i (i.e., the index of the search key in the array).
-> Otherwise, the search key is not present in the array, so return -1 (or any other appropriate value to indicate that the key is not found).
'''
def sentinelSearch(arr, n, key):
	# Last element of the array
	last = arr[n - 1]
	# Element to be searched is
	# placed at the last index
	arr[n - 1] = key
	i = 0
	while (arr[i] != key):
		i += 1
    #breaks out of loop if at i a element matches the key

	# Put the last element back
	arr[n - 1] = last

    # if i is returned from while loop is less than the len of arr or
    # if last element is eqaul to key then key is present in arr
	if ((i < n - 1) or (arr[n - 1] == key)):
		print(key, "is present at index", i)
	else:
		print("Element Not found")


# Driver code
arr = [10, 20, 180, 30, 60, 50, 110, 100, 70]
n = len(arr)
key = 180
sentinelSearch(arr, n, key)

'''
Method Two

-> Set the last element of the array to the target value. This is known as the sentinel value.
-> Set the index variable “i” to the first element of the array.
-> Use a loop to iterate through the array, comparing each element with the target value.
-> If the current element is equal to the target value, return the index of the current element.
-> Increment the index variable “i” by 1 after each iteration of the loop.
-> If the loop completes and the target value is not found, return -1 to indicate that the value is not present in the array.
'''
def sentinelLinearSearch(array, key):
	last = array[len(array) - 1]
	array[len(array) - 1] = key
	i = 0
	while array[i] != key:
		i += 1
	array[len(array) - 1] = last
	if i < len(array) - 1 or last == key:
		return i
	else:
		return -1

array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
key = 5
index = sentinelLinearSearch(array, key)
if index == -1:
	print(f"{key} is not found in the array: {array}")
else:
	print(f"{key} is found at index {index} in the array: {array}")
