""" # normal string 
print('\tHi') #prints >> _tab space_Hi

#raw string 
print(r'\tHi') #prints >> \tHi """

import re

# print(help(re))
text_to_search = """Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua.
Sit Lorem ea id minim occaecat pariatur aliquip cillum laboris minim. Est veniam pariatur consequat elit laborum ut non laboris excepteur reprehenderit non. Sunt officia esse quis veniam anim adipisicing deserunt. Consequat ut velit elit excepteur mollit anim aliquip labore culpa. Pariatur non nostrud qui Lorem aliqua amet. Eiusmod voluptate exercitation amet est dolor mollit magna qui est est enim. Reprehenderit dolor cupidatat amet ipsum pariatur aliqua amet.

Sit irure adipisicing Lorem esse non esse nisi in irure Lorem mollit esse. Occaecat velit ea aliquip sunt aute eiusmod tempor exercitation deserunt aute fugiat aliqua aliqua laborum. Tempor esse nostrud irure sunt et consectetur pariatur duis. Culpa aliqua dolore deserunt sit dolor tempor quis cillum elit cillum non irure. Nulla proident enim officia sint sit nostrud esse.

Reprehenderit commodo exercitation officia magna aliquip aute reprehenderit. Est ex dolor eiusmod dolore aliquip eu elit ut sint qui nulla. Ad voluptate cupidatat id ullamco commodo culpa tempor esse sunt. Excepteur magna mollit labore sit aute eiusmod quis aliqua. Qui in excepteur mollit veniam sunt fugiat esse duis laboris. Adipisicing et nostrud dolore velit reprehenderit veniam dolor in do sint irure ipsum sit. Aliqua ex adipisicing nisi quis dolore labore sit Lorem eu tempor ullamco qui.

Proident in sunt proident ipsum. Ipsum ipsum velit esse minim mollit qui cillum. Officia culpa Lorem non duis. Consequat irure quis sit ex non in quis fugiat culpa ipsum. Pariatur nulla enim consectetur et aliqua veniam."""


# pattern = re.compile(r'\W') #
# pattern = re.compile(r'[]') #character set
pattern = re.compile(r'[^e]') #character set but specifies to negate the e from matching
matches = pattern.finditer(text_to_search)
for match in matches:
    print(match)
    print(match)
