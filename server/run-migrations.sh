#!/bin/bash

set -e # exit on erroor

source ./server/.env # retrieve env vars

# check if URL set, exit if not
if [ -z "$DB_URL" ]; then
    echo "❌ DB_URL is not set in ./server/.env"
    exit 1
fi

# loop through migration files
# skip migration files that have already been applied
# apply migration
for file in ./server/migrations/*.sql; do
  filename=$(basename "$file")
  already_applied=$(psql "$DB_URL" -t -c "SELECT 1 FROM migration_log WHERE filename = '$filename' LIMIT 1;" | xargs)

  if [ "$already_applied" == "1" ]; then
    echo "✅ Skipping: $filename"
  else
    echo "⚙️ Running: $filename"
    psql "$DB_URL" -f "$file"
  fi
done