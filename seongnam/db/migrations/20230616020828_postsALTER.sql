-- migrate:up
ALTER TABLE posts
ADD COLUMN postingImageUrl VARCHAR(100) NULL;
-- migrate:down

