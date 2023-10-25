# Practice

Create a event manager

### Models:

- Events
  - Event name
  - Start Date
  - End Date
  - Team1
  - Team2
  - status - active/inactive

# Install Mongodb

### Documentation

https://www.mongodb.com/docs/manual/installation/

# Run Mongodb (Linux)

To start the mongodb

```
sudo systemctl start mongod
```

To check if mongodb started / status

```
sudo systemctl status mongod
```

Stop mongodb

```
sudo systemctl stop mongod
```

Restart mongodb

```
sudo systemctl restart mongod
```

# MongoDB Shell

### Documentation

https://www.mongodb.com/docs/mongodb-shell/run-commands/

Start the mongodb shell

```
mongosh
```

Help in mongodb shell

```
help
```

Clear the mongodb shell

```
cls
```

Terminate the running command or query

> ctrl+c

Current Database

```
db
```

Show all databases

```
show dbs
```

Use or switch to different database

```
use < db_name >
```

Create new db & collection ( Insert a record into collection to create collection )

```
use < new db_name >
```

```
< db.<collection_name>.insertOne({name:"John"}) >
```

Drop the database

```
db.dropDatabase()
```

Show all collections

```
show collections
```

Insert single record into collections

```
< db.<collection_name>.insertOne({name:"Tommy"}) >
```

Insert Many record into collections

```
db.<collectionName>.insertMany([ {....}, {....}, {.....} ])
```

Sample data:

```
[{
    firstname:"Tommy",
    lastname: "Claw",
    age:34,
    hobbies:['painting', 'singing', 'dancing'],
    alive: false,
    phone:1234567890,
    dob: new Date("2001-10-28")
  },
  {
    firstname: "Jane",
    lastname: "Doe",
    age: 25,
    hobbies: ["reading", "writing", "coding"],
    alive: true,
    phone: 9876543210,
    dob: new Date("1998-03-12")
  },
  {
    firstname: "John",
    lastname: "Smith",
    age: 45,
    hobbies: ["sports", "travel", "photography"],
    alive: true,
    phone: 5555555555,
    dob: new Date("1978-05-08")
  },
  {
    firstname: "Mary",
    lastname: "Jones",
    age: 30,
    hobbies: ["cooking", "gardening", "hiking"],
    alive: true,
    phone: 1234567890,
    dob: new Date("1993-01-25")
  },
  {
    firstname: "David",
    lastname: "Williams",
    age: 60,
    hobbies: ["music", "art", "movies"],
    alive: true,
    phone: 9876543210,
    dob: new Date("1963-07-14")
  },
  {
    firstname: "Susan",
    lastname: "Miller",
    age: 55,
    hobbies: ["volunteering", "reading", "spending time with family"],
    alive: true,
    phone: 5555555555,
    dob: new Date("1968-09-22")
  }
]
```

Rename the collection

```
db.<collectionName>.renameCollection('<New Collection Name>')
```

Delete records/ documents from collection

```
db.<collectionName>.remove()
```

Drop the collection

```
db.collection.drop()
```

Show all records in the collection

```
db.<collectionName>.find()
```

- sort by ascending
  ```
  db.<collectionName>.find().sort({key:1})
  ```
- sort by descending
  ```
  db.<collectionName>.find().sort({key:-1})
  ```
- limit the records
  ```
  db.<collectionName>.find().limit(<No of items>)
  ```
- Skip the records
  ```
  db.<collectionName>.find().skip(<No of items>)
  ```
- Show only required keys of a record. Pass two arguments in find(), first query to fetch
  and second the parameter to specify which keys not have to be shown by mentioning '0'
  ```
  db.<collectionName>.find({key:value}, {key:0, ...})
  ```
- use greater than on keys in find

  ```
   db.<collectionName>.find({key: {$gt:<Some Value>}})
  ```

  multiple comparisons

  ```
   db.<collectionName>.find({key: {$gt:<Some Value>, $lt:<Some Other Value>}})
  ```

  Available comparison operators

  - $gt = greater than
  - $gte = greater than equal to
  - $lt = less than
  - $gte = less than equal to

AND Operator

```
db.<collectionName>.find({key:"....", key1:{$gte:<Some Other Value>}})
```

```
db.<collectionName>.find({ $and: [{key:<Some Value>}, {key1:<Some Other Value>}]})
```

OR Operator

```
db.<collectionName>.find({ $or: [{key:<Some Value>}, {key1:<Some Other Value>}]})
```

Negate Operator (NOTE: It will also return records which has no key; something greater than or less
than will not do )

```
db.<collectionName>.find({ key:{ $not: {$lte: <Some Value>} }})
```

Use $in in find

```
db.<collectionName>.find({key:{ $in : ["<Some Value>","<Some Other Value>"]}})
```

Fetch the records if the key exist (NOTE: key with 'null' value, its records will appear)

```
db.<collectionName>.find({key:{ $exists: true }})  //fetch the records which has key
```

```
db.<collectionName>.find({key:{ $exists: false }})  //fetch the records which has no key
```

To refer more methods

https://www.mongodb.com/docs/manual/reference/method/

More Sample Data

```
[
  {
    firstname: "Peter",
    lastname: "Parker",
    age: 25,
    hobbies: ["spider-manning", "photography", "spending time with MJ"],
    alive: true,
    phone: 5555555555,
    dob: new Date("1998-06-05")
  },
  {
    firstname: "Bruce",
    lastname: "Wayne",
    age: 40,
    hobbies: ["being Batman", "philanthropy", "collecting cars"],
    alive: true,
    phone: 9876543210,
    dob: new Date("1983-02-19")
  },
  {
    firstname: "Clark",
    lastname: "Kent",
    age: 35,
    hobbies: ["being Superman", "reporting for the Daily Planet", "saving the world"],
    alive: true,
    phone: 1234567890,
    dob: new Date("1988-07-18")
  },
  {
    firstname: "Diana",
    lastname: "Prince",
    age: 5000,
    hobbies: ["being Wonder Woman", "fighting crime", "protecting the innocent"],
    alive: true,
    phone: 9876543210,
    dob: new Date("4000-01-01")
  },
  {
    firstname: "Steve",
    lastname: "Rogers",
    age: 100,
    hobbies: ["being Captain America", "leading the Avengers", "protecting the United States"],
    alive: true,
    phone: 5555555555,
    dob: new Date("1922-07-04")
  },
  {
    firstname: "Tony",
    lastname: "Stark",
    age: 45,
    hobbies: ["being Iron Man", "building gadgets and armor", "running Stark Industries"],
    alive: true,
    phone: 9876543210,
    dob: new Date("1978-05-29")
  },
  {
    firstname: "Natasha",
    lastname: "Romanoff",
    age: 35,
    hobbies: ["being Black Widow", "spying, fighting, and assassinating bad guys"],
    alive: true,
    phone: 5555555555,
    dob: new Date("1988-01-25")
  },
  {
    firstname: "Clint",
    lastname: "Barton",
    age: 40,
    hobbies: ["being Hawkeye", "being a dad, and shooting arrows"],
    alive: true,
    phone: 9876543210,
    dob: new Date("1983-01-07")
  },
  {
    firstname: "Wanda",
    lastname: "Maximoff",
    age: 30,
    hobbies: ["being the Scarlet Witch", "using her powers to protect the people she loves"],
    alive: true,
    phone: 5555555555,
    dob: new Date("1993-02-16")
  },
  {
    firstname: "Vision",
    lastname: "Synthezoid",
    age: 3,
    hobbies: ["being the Vision", "using his powers to help people"],
    alive: true,
    phone: 9876543210,
    dob: new Date("2020-08-07")
  },
]

```
