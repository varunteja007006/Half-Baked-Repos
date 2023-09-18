'''
Middle of the Linked List
'''

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next


class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # 1 we look for the length of the linked list
        count = 1  # we initialize length at 1
        temp = head  # because we start at the beginning of the linked list, that is the first value of the list
        while temp.next:  # while temp.next exists = there are still values in linked list
            count += 1  # length increases by 1
            temp = temp.next  # as we go to the next value

        # 2 we compute the count of the middle
            # count = number of numbers in the list
            # If count is even (ex : 6), the real middle would be between 3rd and 4th numbers but we are asked to return the 2nd middle
            # so we would return 4th, that is the number associated to count = 6//2 + 1 = 3 + 1 = 4
            # If count is uneven (ex : 5), the middle is 3rd number
            # so we would return 3rd, that is the number associated to count = 5//2 + 1 = 2 + 1 = 3
        # since we want either the middle or the second middle, middle is always count//2+1
        middle = count//2+1

        # 3 we find the middle node
        count = 1  # we reinitialize count at 1
        temp = head  # because we start at the beginning of the linked list, that is the first value
        while count < middle:  # we'll stop once count = middle
            count += 1  # until then, we increase count by one
            temp = temp.next  # as we go to the next value
        # once we stopped at count = middle, we return temp (the remaining of the linked list)
        return temp
