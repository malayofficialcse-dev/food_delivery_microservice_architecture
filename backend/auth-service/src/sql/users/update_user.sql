UPDATE users

SET

name=$1,

email=$2,

phone=$3,

user_name=$4,

password=$5,

role=$6,

updated_at=NOW()

WHERE id=$7

RETURNING

id,

name,

email,

phone,

user_name AS "userName",

password,

role,

created_at AS "createdAt",

updated_at AS "updatedAt";