arms = (input("Input value for armstrong: ")) #get the input to compute
arms_len = len(arms) # get len of input
arms_duplicate = int(arms) # duplicate input for validation at the end
arms = int(arms) # convert the input to int

ans = 0 # store result 
for i in range(0,arms_len):
    temp = arms%10 # modulo (gets remainder) to get last digit from input
    ans = ans + (temp**arms_len) #multiply each digit from input with len of input
    arms = arms//10 #divide (gets quotient) with 10 to get the remove the last digit from input 

if ans == arms_duplicate: #if equal
    print("Yes, armstrong")
else: 
    print("No, armstrong") # if not equal