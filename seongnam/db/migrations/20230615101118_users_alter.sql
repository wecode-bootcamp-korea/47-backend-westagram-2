-- migrate:up
ALTER TABLE users
ADD COLUMN email VARCHAR(100) NOT NULL;
-- migrate:down

