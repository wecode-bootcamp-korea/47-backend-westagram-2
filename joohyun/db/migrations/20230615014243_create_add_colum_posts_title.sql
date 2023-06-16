-- migrate:up
ALTER TABLE posts ADD COLUMN title VARCHAR(100)

-- migrate:down

