# Python program to shuffle a deck of card

import itertools
import random
deck = list(itertools.product(range(1, 14), ['Spade', 'Heart', 'Diamond', 'Club']))

#deck contains - [(1, 'Spade'), (1, 'Heart'), (1, 'Diamond'), (1, 'Club'), (2, 'Spade'), (2, 'Heart'), (2, 'Diamond'), (2, 'Club'), (3, 'Spade'), (3, 'Heart'), (3, 'Diamond'), (3, 'Club'), .....]

# shuffle the cards
random.shuffle(deck)

# draw five cards
print("You got:")
for i in range(5):
    print(deck[i][0], "of", deck[i][1]) #access the list by first index and with second index tuple.