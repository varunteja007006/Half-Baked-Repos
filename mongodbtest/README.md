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

https://www.mongodb.com/docs/manual/installation/

# Run Mongodb

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

Show all collections

```
show collections
```

Insert single record into collections

```
< db.<collection_name>.insertOne({name:"Tommy"}) >
```

Show all records in the collection

```
db.<collectionName>.find()
```
