-- migrate:up
ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `likes` ADD FOREIGN KEY (`post_id`) REFERENCES `posts`(id);
-- migrate:down

