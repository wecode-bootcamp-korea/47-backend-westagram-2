-- migrate:up
ALTER TABLE posts 
ADD COLUMN postingImageUrl VARCHAR(255);

-- migrate:down

ALTER TABLE posts
DROP COLUMN postingImageUrl;