import os

value_PGDATABASE = os.environ.get('PGDATABASE')
value_PGUSER = os.environ.get('PGUSER')
value_PGPASSWORD = os.environ.get('PGPASSWORD')
value_PGHOST = os.environ.get('PGHOST')
value_PGPORT = os.environ.get('PGPORT')

print(value_PGDATABASE,
value_PGUSER,
value_PGPASSWORD,
value_PGHOST,
value_PGPORT)