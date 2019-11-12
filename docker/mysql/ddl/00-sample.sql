-- CREATE DATABASE test_db CHARACTER SET utf8;

CREATE TABLE test_db.users (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hashed_uid` VARCHAR(255) NOT NULL COMMENT 'ハッシュ uid',
  `deleted_flag` TINYINT NOT NULL DEFAULT 0 COMMENT '削除フラグ',
  `created_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
  `updated_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'ユーザ'
PACK_KEYS = Default;

insert into users (id, hashed_uid) values (default, 'fc7a5aafdef0fd04e77e51a61919aa92715ef5a0c287c2b42f76e0c9a6657664');
insert into users (id, hashed_uid) values (default, '77b8ee848b922a7fac2bfb966cea5e3607fb718d35e5cb496608e8590645ec05');

CREATE TABLE test_db.tasks (
  `id` VARCHAR(36),
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `overview` VARCHAR(256),
  `priority` INT,
  `deadline` TIMESTAMP,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COMMENT = 'タスク'
PACK_KEYS = Default;

insert into tasks (id, user_id, overview, priority, deadline) values ('6a414c88-4613-486d-9990-80c1de52eea4', 2, 'Learn TypeScript', 1, now());
insert into tasks (id, user_id, overview, priority, deadline) values ('d8a4132e-72ec-490c-b5f5-a8bbc4509be6', 1, 'Learn Node.js', 2, now());
insert into tasks (id, user_id, overview, priority, deadline) values ('d8a4132e-72ec-490c-b5f5-a8bbc4509be5', 2, 'Learn React', 4, now());
