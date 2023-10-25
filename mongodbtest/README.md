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
- Show only required fields/ keys of a record. Pass two arguments in find(), first query to fetch
  and second the parameter to specify which fields not have to be shown by mentioning '0'
  ```
  db.<collectionName>.find({key:value}, {key:0, ...})
  ```
- use greater than on keys in find
  ```
   db.<collectionName>.find({key: {$gt:<Some Value>}})
  ```

To refer more methods

https://www.mongodb.com/docs/manual/reference/method/
