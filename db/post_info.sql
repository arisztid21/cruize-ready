-- select * from posts where id = $1;

SELECT users.username, posts.* FROM users JOIN
posts ON(users.id = posts.seller_id) where users.id = $1;