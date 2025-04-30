-- 250430_add_notes_to_tasks.sql

ALTER TABLE tasks
ADD COLUMN notes TEXT;

-- log migration
INSERT INTO migration_log (filename) VALUES ('250430_add_notes_to_tasks.sql');