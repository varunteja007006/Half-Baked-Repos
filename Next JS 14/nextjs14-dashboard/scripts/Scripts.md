# 📁 Structure of 'scripts' Folder

## Files

### seed.js

Here the 'main' function is run (IIFE - Immediately Invoked Function Expression).

1.  'main' function

         - get the db from '@vercel/postgres'
         - create a connection. (stored as client in function 'main') **[ASYNC OPERATION]**
         - seed the database with tables users, customers, invoices, revenue. **[ASYNC OPERATION]**
         - end the connection

2.  Get the data from '../app/lib/placeholder-data.js'

         - Data includes invoices, customers, users, revenue **[ARRAY OF OBJECTS]**

3.  In 'main' function, all the seed functions are called.

         - seedUsers, seedInvoices, seedCustomers, seedRevenue. **[ASYNC OPERATION]**

         - What is happening in these seed functions?
            - Error handling - using try & catch block. catch block logs the error.
            - In try block 3 main things are happening using the db connection 'client'.
               - Create extension "uuid-ossp" --> Creating a extension to generate the UUID in postgres db.

               - Create table --> Create a table in the db.

               - Inserting records --> Iterate over the records and insert them.
                  - For users hash their passwords.
                  - Check bellow about the extension being installed in the postgres db.

### Brief explanation of the installing extension.

```sql
await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
```

The code await client.sqlCREATE EXTENSION IF NOT EXISTS "uuid-ossp"is an asynchronous SQL
statement that creates an extension called "uuid-ossp" in the PostgreSQL database if it doesn't
already exist. TheCREATE EXTENSION` statement is used to add functionality to a PostgreSQL
database by installing extensions. Extensions are like plugins that provide additional features
or functionality to the database.

In this case, the "uuid-ossp" extension is responsible for generating UUIDs (Universally Unique Identifiers). UUIDs are 128-bit values that are used to identify objects or records in a database. They are guaranteed to be unique, even across different databases and systems.

The IF NOT EXISTS clause is used to ensure that the extension is only created if it
doesn't already exist. This prevents the extension from being created multiple times.

The await keyword is used to make the SQL statement asynchronous. This means that the
code execution will pause until the SQL statement has finished executing. This is important
because creating an extension can take some time, and you don't want the code to continue
executing until the extension is ready to be used.

Overall, the code await client.sqlCREATE EXTENSION IF NOT EXISTS "uuid-ossp" is ensuring
that the "uuid-ossp" extension is installed in the PostgreSQL database before it is used
to generate UUIDs.
