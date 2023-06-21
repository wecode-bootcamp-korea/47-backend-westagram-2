-- migrate:up
ALTER TABLE posts
ADD COLUMN postingImageUrl VARCHAR(1000) NOT NULL;
-- migrate:down


