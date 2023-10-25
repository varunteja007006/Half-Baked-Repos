# Install Mongodb

### Lingo

document - It means same as record in MySQL
collections - It means same as table in MySQL

### Documentation

https://www.mongodb.com/docs/manual/installation/

# Run Mongodb (Linux)

To start the mongodb:

```
sudo systemctl start mongod
```

To check if mongodb started / status:

```
sudo systemctl status mongod
```

Stop mongodb:

```
sudo systemctl stop mongod
```

Restart mongodb:

```
sudo systemctl restart mongod
```

# MongoDB Shell

### Documentation

https://www.mongodb.com/docs/mongodb-shell/run-commands/

To refer more methods

https://www.mongodb.com/docs/manual/reference/method/

Start the mongodb shell:

```
mongosh
```

Help in mongodb shell:

```
help
```

Clear the mongodb shell:

```
cls
```

Terminate the running command or query:

> ctrl+c

### Simple Queries

Current Database - To print current database

```
db
```

Show all databases

```
show dbs
```

Use or switch to different database

```
use accounts
```

This creates a database named accounts or switches to existing database.

Create new db & collection ( Insert a document into collection to create collection )

```
use accounts
```

```
db.employees.insertOne({ name:"John" })
```

Drop the database

```
db.dropDatabase()
```

Show all collections

```
show collections
```

Insert a single record into collections

```
db.employees.insertOne({ name:"Tommy" })
```

Insert Many record into collections

```
db.employees.insertMany([ {....}, {....}, {.....} ])
```

Pass an array of documents. Each document is a object.

**NOTE: Sample data can be found at the end of this file.**

Rename the collection

```
db.employees.renameCollection('users')
```

Delete records/ documents from collection

```
db.users.remove({ name: "Tommy" })
```

Drop the collection

```
db.collection.drop()
```

**NOTE: If you followed the exact order then you may have to follow the insertMany command again to**
**have some data to proceed further.**

Update a record in collection

```
db.users.updateOne( { firstname: "Peter" }, { $set: { age : 27  } } )
```

Other update operations

- $rename - The $rename command renames a field in a document.
  ```
  db.users.updateOne({key: <Some Value>}, {"$rename": {"old_field_name": "new_field_name"}})
  ```
  This will rename the field old_field_name to new_field_name in the document with the ID 1
- $unset
  ```
  db.collection.update_one({"_id": 1}, {"$unset": {"field_to_remove": ""}})
  ```
  This will remove the field field_to_remove from the document with the ID 1.
- $push
  ```
  db.collection.update_one({"_id": 1}, {"$push": {"array_field": "new_element"}})
  ```
  This will add the element new_element to the array field array_field in the document with the ID 1.
- $pull
  ```
  db.collection.update_one({"_id": 1}, {"$pull": {"array_field": "element_to_remove"}})
  ```
  This will remove the element element_to_remove from the array field array_field in the document with the ID 1.

This completely replaces the record

```
db.users.replaceOne( { key: < Some Value > }, { key : < New Value >  } )
```

Delete a record

```
db.users.deleteOne( { key: < Some Value > } )
```

Delete multiple records

```
db.users.deleteMany( { key: < Some Value > } )
```

Show all records in the collection

```
db.users.find()
```

- sort by ascending
  ```
  db.users.find().sort({key:1})
  ```
- sort by descending
  ```
  db.users.find().sort({key:-1})
  ```
- limit the records
  ```
  db.users.find().limit(<No of items>)
  ```
- Skip the records
  ```
  db.users.find().skip(<No of items>)
  ```
- Show only required keys of a record. Pass two arguments in find(), first query to fetch
  and second the parameter to specify which keys not have to be shown by mentioning '0'
  ```
  db.users.find({key:value}, {key:0, ...})
  ```
- use greater than on keys in find

  ```
   db.users.find({key: {$gt:<Some Value>}})
  ```

  multiple comparisons

  ```
   db.users.find({key: {$gt:<Some Value>, $lt:<Some Other Value>}})
  ```

  Available comparison operators

  - $gt = greater than
  - $gte = greater than equal to
  - $lt = less than
  - $gte = less than equal to

AND Operator

```
db.users.find({key:"....", key1:{$gte:<Some Other Value>}})
```

```
db.users.find({ $and: [{key:<Some Value>}, {key1:<Some Other Value>}]})
```

OR Operator

```
db.users.find({ $or: [{key:<Some Value>}, {key1:<Some Other Value>}]})
```

NOT Operator (NOTE: It will also return records which has no key; something greater than or less
than will not do )

```
db.users.find({ key:{ $not: {$lte: <Some Value>} }})
```

Use $in in find

```
db.users.find({key:{ $in : ["<Some Value>","<Some Other Value>"]}})
```

Fetch the records if the key exist (NOTE: key with 'null' value, its records will appear)

```
db.users.find({key:{ $exists: true }})
```

Fetch the records which has key by mentioning 'true'

```
db.users.find({key:{ $exists: false }})
```

Fetch the records which has no key by mentioning 'false'

### Complex Queries

EXPRESSION - $expr

The below expression compares two columns where 'ColName' is greater than 'AnotherColName'. We use '$'
before ColName for columns. Without '$' it indicates just a value.

```
db.users.find({ $expr: { $gt: [ "$ColName", "$AnotherColName" ] } })
```

Sample Data

```
[
  {
    personid: 1,
    firstname: "Peter",
    lastname: "Parker",
    dob: new Date("1998-06-05"),
    age: 25,
    debt: 5000,
    balance: 10000,
    email: "dummy@mail.com",
    phone: 5555555555,
    address: {
      street: "123 main street",
      city: "LA",
      pincode: "46732"
    },
    hobbies: ["spider-manning", "photography", "spending time with MJ"],
    alive: true
  },
  {
    personid: 2,
    firstname: "Bruce",
    lastname: "Wayne",
    dob: new Date("1983-02-19"),
    age: 40,
    debt: 100000,
    balance: 100000000,
    email: "brucewayne@wayneenterprises.com",
    phone: 1234567890,
    address: {
      street: "1007 Mountain Drive",
      city: "Gotham City",
      pincode: "45678"
    },
    hobbies: ["being Batman", "philanthropy", "collecting cars"],
    alive: true
  },
  {
    personid: 3,
    firstname: "Clark",
    lastname: "Kent",
    dob: new Date("1988-07-18"),
    age: 35,
    debt: 0,
    balance: 10000000000,
    email: "clarkkent@dailyplanet.com",
    phone: 9876543210,
    address: {
      street: "3400 North Clark Street",
      city: "Metropolis",
      pincode: "12345"
    },
    hobbies: ["being Superman", "reporting for the Daily Planet", "saving the world"],
    alive: true
  },
  {
    personid: 4,
    firstname: "Diana",
    lastname: "Prince",
    dob: new Date("4000-01-01"),
    age: 5000,
    debt: 0,
    balance: 1000000000000,
    email: "wonderwoman@themyscira.com",
    phone: 5555555555,
    address: {
      street: "Themyscira Island",
      city: "Themyscira",
      pincode: "12345"
    },
    hobbies: ["being Wonder Woman", "fighting crime", "protecting the innocent"],
    alive: true
  },
  {
    personid: 5,
    firstname: "Steve",
    lastname: "Rogers",
    dob: new Date("1922-07-04"),
    age: 100,
    debt: 0,
    balance: 10000000000000,
    email: "captainamerica@avengershq.com",
    phone: 9876543210,
    address: {
      street: "135 West 50th Street",
      city: "New York City",
      pincode: "10020"
    },
    hobbies: ["being Captain America", "leading the Avengers", "protecting the United States"],
    alive: true
  },

  {
    personid: 6,
    firstname: "Tony",
    lastname: "Stark",
    dob: new Date("1978-05-29"),
    age: 45,
    debt: 100000000,
    balance: 100000000000,
    email: "ironman@starkindustries.com",
    phone: 5555555555,
    address: {
      street: "125 West 72nd Street",
      city: "New York City",
      pincode: "10023"
    },
    hobbies: ["being Iron Man", "building gadgets and armor", "running Stark Industries"],
    alive: true
  },
  {
    personid: 7,
    firstname: "Natasha",
    lastname: "Romanoff",
    dob: new Date("1988-01-25"),
    age: 35,
    debt: 0,
    balance: 100000000,
    email: "blackwidow@avengershq.com",
    phone: 9876543210,
    address: {
      street: "135 West 50th Street",
      city: "New York City",
      pincode: "10020"
    },
    hobbies: ["being Black Widow", "spying, fighting, and assassinating bad guys"],
    alive: true
  },
  {
    personid: 8,
    firstname: "Clint",
    lastname: "Barton",
    dob: new Date("1983-01-07"),
    age: 40,
    debt: 0,
    balance: 100000000,
    email: "hawkeye@avengershq.com",
    phone: 5555555555,
    address: {
      street: "135 West 50th Street",
      city: "New York City",
      pincode: "10020"
    },
    hobbies: ["being Hawkeye", "being a dad, and shooting arrows"],
    alive: true
  },
  {
    personid: 9,
    firstname: "Wanda",
    lastname: "Maximoff",
    dob: new Date("1993-02-16"),
    age: 30,
    debt: 0,
    balance: 100000000,
    email: "scarletwitch@avengershq.com",
    phone: 9876543210,
    address: {
      street: "135 West 50th Street",
      city: "New York City",
      pincode: "10020"
    },
    hobbies: ["being the Scarlet Witch", "using her powers to protect the people she loves"],
    alive: true
  },
  {
    personid: 10,
    firstname: "Vision",
    lastname: "Synthezoid",
    dob: new Date("2020-08-07"),
    age: 3,
    debt: 0,
    balance: 100000000,
    email: "vision@avengershq.com",
    phone: 5555555555,
    address: {
      street: "135 West 50th Street",
      city: "New York City",
      pincode: "10020"
    },
    hobbies: ["being the Vision", "using his powers to help people"],
    alive: true
  },

  {
    personid: 11,
    firstname: "John",
    lastname: "Doe",
    dob: new Date("1998-03-12"),
    age: 25,
    debt: 10000,
    balance: 10000,
    email: "johndoe@gmail.com",
    phone: 9876543210,
    address: {
      street: "123 Main Street",
      city: "Anytown",
      pincode: "12345"
    },
    hobbies: ["reading", "writing", "coding"],
    alive: true
  },
  {
    personid: 12,
    firstname: "Jane",
    lastname: "Smith",
    dob: new Date("1978-05-08"),
    age: 45,
    debt: 0,
    balance: 1000000,
    email: "janesmith@yahoo.com",
    phone: 5555555555,
    address: {
      street: "456 Elm Street",
      city: "Everytown",
      pincode: "56789"
    },
    hobbies: ["sports", "travel", "photography"],
    alive: true
  },
  {
    personid: 13,
    firstname: "Mary",
    lastname: "Jones",
    dob: new Date("1993-01-25"),
    age: 30,
    debt: 0,
    balance: 500000,
    email: "maryjones@hotmail.com",
    phone: 9876543210,
    address: {
      street: "789 Oak Street",
      city: "Sometown",
      pincode: "90123"
    },
    hobbies: ["cooking", "gardening", "hiking"],
    alive: true
  },
  {
    personid: 14,
    firstname: "David",
    lastname: "Williams",
    dob: new Date("1963-07-14"),
    age: 58,
    debt: 0,
    balance: 2000000,
    email: "davidwilliams@aol.com",
    phone: 1234567890,
    address: {
      street: "1011 Pine Street",
      city: "Nowheresville",
      pincode: "00000"
    },
    hobbies: ["music", "art", "movies"],
    alive: true
  },
  {
    personid: 15,
    firstname: "Susan",
    lastname: "Miller",
    dob: new Date("1968-09-22"),
    age: 53,
    debt: 0,
    balance: 1000000,
    email: "susanmiller@comcast.net",
    phone: 5555555555,
    address: {
      street: "1112 Maple Street",
      city: "Anywhere",
      pincode: "12345"
    },
    hobbies: ["volunteering", "reading", "spending time with family"],
    alive: true
  },
]
```

# MERN stack project

Create a event manager

### Models:

- Events
  - Event name
  - Start Date
  - End Date
  - Team1
  - Team2
  - status - active/inactive
