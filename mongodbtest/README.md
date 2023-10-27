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

Show all collections

```
show collections
```

Rename the collection

```
db.employees.renameCollection('users')
```

Delete a document from collection who's name is Tommy

```
db.users.remove({ name: "Tommy" })
```

Drop the collection

```
db.collection.drop()
```

Drop the database

```
db.dropDatabase()
```

## C R U D Operations:

Lets set up the database once again since we dropped it in the before section.about-image

```
use accounts
```

Now proceed with following insertOne or insertMany operation to create a collection as well a document
in the collection.

### C for Create

Insert a single document into collections 'users'

```
db.users.insertOne({
  personid:25,
  firstname:"Tommy",
  lastname:'Ja',
  dob: new Date('2004-12-25'),
  age:19,
  debt:400,
  balance: 34,
  email: 'tommy@dummy.com',
  phone:11111111,
  address:{
    street: '434 main road',
    ity: 'Alps',
    pincode: '423423'
  },
  alive: true
  })
```

Insert Many documents into collections

```
db.users.insertMany([ {....}, {....}, {.....} ])
```

Pass an array of documents. Each document is a object.

**NOTE: Sample data can be found at the end of this file.**

### R for Read

Show all documents in the collection

```
db.users.find()
```

To Show only required keys of a document. Pass two arguments in find().

**First argument** is 'query to fetch' condition and **Second argument** is the condition to specify which keys have to be shown by mentioning '1', rest of the keys will not be shown.  
Similarly, to specify which keys should not to be shown mention '0', rest of the keys will be shown.

Below is the command:

```
db.users.find( {age: { $lt:20 }}, { personid:1, firstname:1, lastname:1 })
```

Here inside find(),  
**first argument** is {age: { $lt: 20}} condition to fetch query, i.e age less than 20.  
**second argument** is { personid:1, firstname:1, lastname:1 } condition to specify required keys,
i.e show documents with keys personid, firstname, lastname since they are mentioned with '1'.

More Commands that can used along with find()

- sort by ascending
  ```
  .users.find().sort({ personid:1 })
  ```
- sort by descending
  ```
  db.users.find().sort({ personid:-1 })
  ```
- limit the documents to show
  ```
  db.users.find().limit(5)
  ```
- Skip the documents and show the rest
  ```
  db.users.find().skip(5)
  ```
  **NOTE: Make sure to always use skip() before limit()**
- Available comparison operators

  - $gt = 'greater than'
    ```
    db.users.find({age: { $gt:58 } })
    ```
  - $gte = 'greater than equal to'
    ```
    db.users.find({age: { $gte:58 } })
    ```
  - $lt = 'less than'
    ```
    db.users.find({age: { $lt:20 } })
    ```
  - $gte = 'less than equal to'
    ```
    db.users.find({age: { $lt:53 } })
    ```

  Using multiple comparison operators

  ```
   db.users.find({age: { $gt:50, $lt:60  } })
  ```

AND Operator

```
db.users.find({ age:{ $lt:40 }, debt:{ $lt:1000 } })
```

```
db.users.find({ $and: [ { age:{ $lt:40 }} , { debt:{ $lt:1000 }} ] })
```

OR Operator

```
db.users.find({ $or: [ { age: {$lte:3} }, { firstname:'Peter' }  ] })
```

NOT Operator

```
db.users.find({ age: { $not: {$lt:50} } })
```

**NOTE: It will also return documents which has no key; something greater than or less
than will not do**

Use $in in find

```
db.users.find({ age: { $in:[53, 100 ] } })
```

Fetch only the documents if the key exist (NOTE: key with 'null' value, its documents will appear)

```
db.users.find({ hobbies:{ $exists: true }})
```

Fetch the documents which has key by mentioning 'true'

```
db.users.find({ hobbies:{ $exists: false }})
```

Fetch the documents which has no 'hobbies' in the 'users' collection documents by mentioning 'false'

NESTED queries

```
db.users.find({ 'address.city': 'New York City' })
```

EXPRESSION - $expr

The below expression compares two columns where 'ColName' is greater than 'AnotherColName'. We use '$'
before ColName for columns. Without '$' it indicates just a value.

```
db.users.find({ $expr: { $gt: [ '$debt','$balance' ] } })
```

### U for Update

Update a document in a collection

```
db.users.updateOne( { firstname: "Peter" }, { $set: { age : 27  } } )
```

This will update only one document who's firstname is 'Peter', it will update the key age to 27.

Update documents in a collection

```
db.users.updateMany({}, { $set: { dummy:null } })
```

This will update all the documents since we passed '{}', it will update new key 'dummy'

**Other update operations**

- $rename - The $rename command renames a field in a document.
  ```
  db.users.updateMany({ email: {$exists:true}}, {$rename:{"email":"mail"}})
  ```
  This will rename the 'email' keys to 'mail' in all the document since we mentioned '{email: {$exists:true}}'
- $unset
  ```
  db.users.updateMany({}, {$unset:{dummy:''}})
  ```
  This will remove the key 'dummy' from all the documents since we mentioned '{}'.
- $push
  ```
  db.users.updateOne({personid:18},{$push:{hobbies:'eating'}})
  ```
  This will add the 'eating' to the array hobbies in the document with the personid 18.
- $pull
  ```
  db.users.updateOne({personid:18},{$pull:{hobbies:'eating'}})
  ```
  This will add the 'eating' to the array hobbies in the document with the personid 18.

To replace the complete document

```
db.users.replaceOne( { firstname: 'Susan' }, { firstname : 'Demon'  } )
```

This replaces the whole document who's firstname is 'Susan', with whatever is passed as second argument.

### D for Delete

Delete a single document

```
db.users.deleteOne( { firstname:"Peter" } )
```

Delete multiple documents

```
db.users.deleteMany({})
```

This deletes all the documents in a collection

### More Concepts in MongoDB

**Cursor**

When the db. collection. find () function is used to search for documents in the collection, the result returns a pointer to the collection of documents returned which is called a cursor. By default, the cursor will be iterated automatically when the result of the query is returned

src: https://docs.mongodb.com/manual/reference/method/js-cursor/

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
  {
    personid: 21,
    firstname:'Harry',
    lastname:'Bhai',
    dob: new Date('1995-05-20'),
    age: 29,
    debt:34000,
    balance: 33000,
    email:'hbrry@test.com',
    phone: 747474747747,
    address: {
      street: '344 street subway',
      city:'Heidi',
      pincode:'35353'
    },
    alive:true
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
