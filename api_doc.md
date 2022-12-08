# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /users`

&nbsp;

## 1. POST /users/register

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNum": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "string",
  "email": "string"
}
```

_Response (400 - Error)_

```json
{
  "message": [
    "e-mail is required and can't be empty",
    "e-mail format is yourEmailname@domain.com",
    "password is required and can't be empty",
    "Minimum password length is 5 and max 16 character"
  ]
}
```

&nbsp;

## 2. POST /users/login

- body:

```json
{
  "email":"string",
  "password":"string""
}
```

_Response (200)_

```json
{
  "access_token": "string",
  "id": "integer"
}
```

_Response (400 - Error)_

```json
{
  "message": "Error invalid email"
}
OR
{
  "message": "Error invalid password"
}
```

## 3. GET /users

- body:

```json
{
  "id": "integer"
}
```

_Response (200)_

```json
{
    "account": "normal"
}
OR
{
    "account": "premium"
}
```

## 4. POST /payment

- body:

```json
{
  "UserId": "integer",
  "total_price": "integer"
}
```

_Response (400)_

```json
on progress
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
