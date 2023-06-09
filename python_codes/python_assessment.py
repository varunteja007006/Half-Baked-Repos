import itertools
pow = 4
input_list = [2, 3, 14, 7]
possible_product_list = list(
    map(list, itertools.product(input_list, range(1, pow+1))))

prod_list = []
for i in range(0, len(possible_product_list)):
    prod_list.append(possible_product_list[i][0]*possible_product_list[i][1])

final_list = []
for i in range(0, len(possible_product_list)):
    a, b = possible_product_list[i][0], possible_product_list[i][1]
    final_list.append([a, b, prod_list[i]])
print("final List", final_list)
