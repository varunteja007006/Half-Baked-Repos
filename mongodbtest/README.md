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

# MongoDB Shell/CLI

### start the mongodb on terminal

```
mongosh
```

display db: db
switch db: use {dbname}

create new db & collection

use {dbname}

db.mycollection.insertOne({x:1})

terminate running command or query : ctrl+c

shows all databases: show dbs
show all collections: show collections

insert single record into collections: db.{collectionName}.insertOne({name:"Varun"})

show all records in collection: db.{collectionName}.find()
