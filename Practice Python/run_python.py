nums = [1,2,3,4]

for i in range(0,len(nums)):
    if i ==0 :
        pass
    else:
        nums[i] = sum([x for x in nums[0:i+1]])