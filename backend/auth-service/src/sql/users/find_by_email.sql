SELECT

id,

name,

email,

phone,

user_name AS "userName",

password,

role,

created_at AS "createdAt",

updated_at AS "updatedAt"

FROM users

WHERE email=$1;