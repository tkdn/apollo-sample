[mysqld]
character-set-server = utf8mb4
general_log = 1
general_log_file = /var/log/mysql/query.log
log-error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 0.1
log_queries_not_using_indexes = 1

[mysql]
default-character-set = utf8mb4
