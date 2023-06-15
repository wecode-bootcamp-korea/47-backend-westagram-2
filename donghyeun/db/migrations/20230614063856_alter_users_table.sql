-- migrate:up
ALTER TABLE `users` ADD `profile_image` VARCHAR(1000) NULL;

-- migrate:down
ALTER TABLE `users` DROP `profile_image`;
