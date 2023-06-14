-- migrate:up
ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `posts` ADD `imageurl` VARCHAR(2000) NOT NULL;

-- migrate:down
