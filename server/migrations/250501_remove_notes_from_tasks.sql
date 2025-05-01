-- 250501_remove_notes_column.sql

ALTER TABLE tasks
DROP COLUMN IF EXISTS notes;

-- log migration
INSERT INTO migration_log (filename) VALUES ('250501_remove_notes_column.sql');