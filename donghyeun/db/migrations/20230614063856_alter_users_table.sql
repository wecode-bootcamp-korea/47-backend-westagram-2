-- migrate:up
ALTER TABLE `users` ADD `profile_img` VARCHAR(1000) NULL;

-- migrate:down
ALTER TABLE `users` DROP `profile_img`;
