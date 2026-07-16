INSERT INTO users
    (
        name,
        email,
        phone,
        user_name,
        password,
        role
    )

VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
    )

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