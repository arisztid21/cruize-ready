delete from posts where id= $1 and seller_id = $2;
select * from posts where seller_id = $2;