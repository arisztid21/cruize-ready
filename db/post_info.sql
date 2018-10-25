SELECT users.username, posts.* FROM users JOIN
posts ON(users.id = posts.seller_id) where posts.id = $1;