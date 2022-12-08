# HackFit API Documentation

## Endpoints :

List of available endpoints:

1. `POST /register`
2. `POST /login`
3. `GET /activities`
4. `POST /activities`
5. `GET /activities/:activityId`
6. `GET /activities/:userId/users`
7. `GET /users`
8. `GET /users/:userId`
9. `PUT /users/:userId`
10. `GET /exercises`
11. `GET /types`
12. `GET /difficulties`
13. `POST /likes/:activityId`
14. `DELETE /likes/:activityId`

&nbsp;

## 1. POST /register

Description:

- Register an account

Request:

- body:

```json
{
  "fullName": "string (required)",
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "message": "User <email> success to register",
  "access_token": "string",
  "userId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "FullName is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Invalid email"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Description:

- Login an account

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "userId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /activities

Description:

- Get all activities

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "name": "string",
    "imageActivity": "text",
    "caption": "string",
    "star": "integer",
    "TypeId": "integer",
    "DifficultyId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "User": {
      "id": "integer",
      "email": "string",
      "fullName": "string",
      "dateOfBirth": "date",
      "city": "string",
      "imageProfile": "text",
      "status": "string",
      "star": "integer",
      "BadgeId": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "Type": {
      "id": "integer",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "Difficulty": {
      "id": "integer",
      "name": "string",
      "star": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "Likes": [
      {
        "id": "integer",
        "UserId": "integer",
        "ActivityId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  },
  ...
]
```

&nbsp;

## 4. POST /activities

Description:

- Add an activity

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "caption": "string (required)",
  "name": "string (required)",
  "TypeId": "integer (required)",
  "DifficultyId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Activity created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Caption is required"
}
OR
{
  "message": "Type is required"
}
OR
{
  "message": "Difficulty is required"
}
```

&nbsp;

## 5. GET /activities/:activityId

Description:

- Show an activity

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "activityId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "activity": {
    "id": "integer",
    "UserId": "integer",
    "name": "string",
    "imageActivity": "text",
    "caption": "string",
    "star": "integer",
    "TypeId": "integer",
    "DifficultyId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "User": {
      "id": "integer",
      "email": "string",
      "fullName": "string",
      "dateOfBirth": "date",
      "city": "string",
      "imageProfile": "text",
      "status": "string",
      "star": "integer",
      "BadgeId": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "Type": {
      "id": "integer",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "Difficulty": {
      "id": "integer",
      "name": "string",
      "star": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "Likes": [
      {
        "id": "integer",
        "UserId": "integer",
        "ActivityId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data is not found"
}
```

&nbsp;

## 6. GET /activities/:userId/users

Description:

- Show activities from logged in user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "userId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "data": [
    {
    "id": "integer",
    "UserId": "integer",
    "name": "string",
    "imageActivity": "text",
    "caption": "string",
    "star": "integer",
    "TypeId": "integer",
    "DifficultyId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Type": {
      "id": "integer",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "Difficulty": {
      "id": "integer",
      "name": "string",
      "star": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "Likes": [
      {
        "id": "integer",
        "UserId": "integer",
        "ActivityId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
      },
      ...
    ]
  },
  ...
  ]
}
```

&nbsp;

## 7. GET /users

Description:

- Show all users order by star

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "data": [
    {
      "id": "integer",
      "email": "string",
      "fullName": "string",
      "dateOfBirth": "date",
      "city": "string",
      "imageProfile": "text",
      "status": "string",
      "star": "integer",
      "BadgeId": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    },
    ...
  ]
}
```

&nbsp;

## 8. GET /users/:userId

Description:

- Show a users by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "email": "string",
  "fullName": "string",
  "dateOfBirth": "date",
  "city": "string",
  "imageProfile": "text",
  "status": "string",
  "star": "integer",
  "BadgeId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

&nbsp;

## 9. PUT /users/:userId

Description:

- Edit all fields of a user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "userId": "integer"
}
```

- body:

```json
{
  "email": "string",
  "password": "string",
  "fullName": "string",
  "dateOfBirth": "string",
  "city": "string"
}
```

- file: Image in jpg/png

_Response (200 - OK)_

```json
{
  "message": "User <UserId> has been updated"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## 10. GET /exercises

Description:

- Show activities

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- Query:

```json
{
  "name": "string",
  "type": "string",
  "difficulty": "string",
  "page": "integer"
}
```

_Response (200 - OK)_

```json
{
  "currentPage": "integer",
  "exercises": [
    {
      "name": "string",
      "type": "string",
      "muscle": "string",
      "equipment": "string",
      "difficulty": "string",
      "instructions": "text"
    }
  ]
}
```

&nbsp;

## 11. GET /types

Description:

- Show types

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date"
  },
  ...
]
```

&nbsp;

## 12. GET /difficulties

Description:

- Show difficulties

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "star": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  },
  ...
]
```

&nbsp;

## 12. POST /likes/:activityId

Description:

- Like the activity by user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "activityId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "User id <UserId> already like this activity"
}
```

_Response (201 - Created)_

```json
{
  "message": "User <UserId> like activity with id <ActivityId>"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data is not found"
}
```

&nbsp;

## 13. DELETE /likes/:activityId

Description:

- Unlike the activity by user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "activityId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "User <UserId> unlike activity with id <ActivityId>"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data is not found"
}
```

&nbsp;

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
