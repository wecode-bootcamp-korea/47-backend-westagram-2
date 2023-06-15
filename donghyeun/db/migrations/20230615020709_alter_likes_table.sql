-- migrate:up
ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `likes` ADD FOREIGN KEY (`post_id`) REFERENCES `posts`(id);
ALTER TABLE `likes` ADD CONSTRAINT unique_user_post UNIQUE (user_id, post_id)
-- migrate:down
ALTER TABLE `likes` DROP FOREIGN KEY `likes_ibfk_1`;
ALTER TABLE `likes` DROP FOREIGN KEY `likes_ibfk_2`;

