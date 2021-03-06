drop table if exists users cascade;
drop table if exists posts cascade;
drop table if exists categories cascade;

create table users(
    id serial primary key
    , email text unique not null
    , username varchar(32) unique not null
    , password text not null
    , phone_number varchar(12) not null
    , admin boolean
);

create table categories(
    id serial primary key
    , name text unique not null
);


insert into categories(name) values('lighting'), ('engine'), ('interior'), ('accessories'), ('wheels');

create table posts(
    id serial primary key
    , seller_id integer references users(id)
    , category integer references categories(id)
    , item text not null
    , time_posted text not null
    , beginning_year integer not null
    , ending_year integer not null
    , price text not null
    , description text not null
    , images text not null
);


select * from posts;

select * from users;

select * from categories;

select p.item, c.name from posts p join categories c on p.category = c.id;

--http://localhost:4000/posts/search?category=4&item=siren&part_year=1945

