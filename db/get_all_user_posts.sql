-- To get all posts for the currently signed in user
select * from posts where seller_id = $1;