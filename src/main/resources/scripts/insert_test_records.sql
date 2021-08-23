INSERT INTO users (username, password, email, role) VALUES ('test_user', 'test123', 'test@test.com', 'USER'), ('JoBo', 'jobo@gmail.com', 'jobojobo', 'USER'),
                                                           ('Danika', 'danika@gmail.com', 'blahblahblah', 'USER'), ('Tonga', 'tonga@hotmail.com', '20inva[sh20h', 'USER');

INSERT INTO posts (user_id, title, content) VALUES (1, 'Babys First Post', 'Do not be alarmed. This is only a test.');

INSERT INTO posts (id, title, content, user_id) VALUES (2, 'A new post', 'this is a brilliant post. 10/10', 1),
                                                       (3, 'A newer post', 'this is a slightly brilliant post. 10/10', 1),
                                                       (4, 'A new post', 'this is a supremely brilliant post. 10/10', 1);

INSERT INTO categories (name) VALUES ('test_tag');

INSERT INTO categories (id, name) VALUES (2, 'Javascript'), (3, 'HTML'), (4, 'Java');

INSERT INTO post_category (post_id, category_id) VALUES (1, 1);

INSERT INTO post_category (post_id, category_id) VALUES (4, 3);

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM post_category;