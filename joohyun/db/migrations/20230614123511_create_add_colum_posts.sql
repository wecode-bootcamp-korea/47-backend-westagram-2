-- migrate:up
ALTER TABLE posts ADD post_image_url VARCHAR(1000) NULL;

-- migrate:down
