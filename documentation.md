# marQofy Cashier Documentation 

## Endpoints

List of Endpoint: 
- `POST /login`
- `GET /products`
- `GET /categories`
- `POST /register`
- `POST /members`
- `GET /transactions`
- `POST /transactions`
- `GET /carts`
- `POST /carts/:transactionId`
- `DELETE /carts/:id`
---
### 1. POST /login
#### Descriptions

- Logging in registered user to pass the authentication wall and access the application
- Creating History of user logging in

#### Request
- `Body`
    ```json
    {
        "input": String (required | userName | email),
        "password": String (required),
    }
    ```
#### Response
_200 - Ok
- `Body`
    ```json
    {
        "access_token": String, 
        "id": Integer, 
        "userName": String, 
        "fullName": String, 
        "photo": String, 
        "email": String, 
        "role": String
    }
    ```

_400 - Bad Request_
- `Body`
    ```json
    { "message": "Invalid email/password" }
 
    ```
---
### 2. GET /products
#### Descriptions

- Fetch all Products data with options of page number where data is showed, filter by Products Category, and or insensitive case of Product Name

#### Request
- `Query`
    ```json
    {
        "page": Integer(default = 1), 
        "filter": Integer, 
        "search": String
    }
    ```
#### Response
_200 - Ok_
- `Body`
    ```json
    {
	"count": 10,
	"rows": [
		{
			"id": 2,
			"name": "Sosro Teh Botol (Kotak) Original 250mL",
			"image": "https://assets.klikindomaret.com/products/10005128/10005128_1.jpg",
			"stock": 100,
			"sales": 0,
			"price": 3400,
			"vendor": "PT. Sinar Sosro, Tbk",
			"status": "Active",
			"categoryId": 4,
			"createdAt": "2022-12-08T03:06:52.390Z",
			"updatedAt": "2022-12-08T03:06:52.390Z",
			"Category": {
				"id": 4,
				"name": "Beverages",
				"createdAt": "2022-12-08T03:06:52.386Z",
				"updatedAt": "2022-12-08T03:06:52.386Z"
			}
		},
		{
			"id": 5,
			"name": "Sosro Teh Botol Original 450mL",
			"image": "https://assets.klikindomaret.com/products/20036157/20036157_1.jpg",
			"stock": 75,
			"sales": 0,
			"price": 5500,
			"vendor": "PT. Sinar Sosro, Tbk",
			"status": "Active",
			"categoryId": 4,
			"createdAt": "2022-12-08T03:06:52.390Z",
			"updatedAt": "2022-12-08T03:06:52.390Z",
			"Category": {
				"id": 4,
				"name": "Beverages",
				"createdAt": "2022-12-08T03:06:52.386Z",
				"updatedAt": "2022-12-08T03:06:52.386Z"
			}
		},
        ...
    }
    ```
---
### 3. GET /categories
#### Descriptions

- Fetch all Categories Data

#### Request

#### Response
_200 - Ok
- `Body`
    ```json
    [
        {
            "id": 1,
            "name": "Meds",
            "createdAt": "2022-12-08T03:06:52.386Z",
            "updatedAt": "2022-12-08T03:06:52.386Z"
        },
        {
            "id": 2,
            "name": "Candy",
            "createdAt": "2022-12-08T03:06:52.386Z",
            "updatedAt": "2022-12-08T03:06:52.386Z"
        },
        ...
    ]
    ```
---
### 4. POST /register
#### Descriptions

- User with role Admin registering new User to database with role as Admin or Staff
- Creating History of User registering new User
- Sending email to new User the information of new User userName for logging in

#### Request
- `Body`
    ```json
    {
        "userName": String (required),
        "fullName": String (required),
        "photo": String (required) ,
        "role": String (required),
        "email": String (unique | required),
        "password": String (required)
    }
    ```
- `Headers`
    ```json
    {
        "access_token": acces_token
    }
    ```
#### Response
_201 - Created_
- `Body`
    ```json
    {
        "message": "{ new User fullName } has been added as { new User role } { new User userName }",
    }
    ```

_400 - Bad Request_
- `Body`
    ```json
    { "message": "User Name Must Be Filled" }
    OR
    { "message": "User Name Cannot Be Empty" }
    OR
    { "message": "User Full Name Must Be Filled" }
    OR
    { "message": "User Full Name Cannot Be Empty" }
    OR
    { "message": "User Email Must Be Filled" }
    OR
    { "message": "User Email Cannot Be Empty" }
    OR
    { "message": "User Password Must Be Filled" }
    OR
    { "message": "User Password Cannot Be Empty" }
    OR
    { "message": "User Role Must Be Filled" }
    OR
    { "message": "User Role Cannot Be Empty" }
    ```
---
### 5. POST /members
#### Descriptions

- User registering new Member to database
- Creating History of User registering new Member
- Sending email to new Member with purpose to welcoming new Member

#### Request
- `Body`
    ```json
    {
        "name": String (required),
        "gender": String (required),
        "email": String (unique | required),
        "phone": String (required),
        "point": Integer (default = 0),
        "cashierId": Integer
    }
    ```
- `Headers`
    ```json
    {
        "access_token": acces_token
    }
    ```
#### Response
_201 - Created_
- `Body`
    ```json
    {
        "message": "{ new Member name } has been added as member",
    }
    ```

_400 - Bad Request_
- `Body`
    ```json
    { "message": "Member Name Must Be Filled" }
    OR
    { "message": "Member Name Cannot Be Empty" }
    OR
    { "message": "Member Gender Must Be Filled" }
    OR
    { "message": "Member Gender Cannot Be Empty" }
    OR
    { "message": "Member Email Must Be Filled" }
    OR
    { "message": "Member Email Cannot Be Empty" }
    OR
    { "message": "Member Phone Number Must Be Filled" }
    OR
    { "message": "Member Phone Number Cannot Be Empty" }
    ```
---
### 6. GET /transactions
#### Descriptions

- Find today's report id, or Create one if not found.
- Create new Transaction with status Open
- Create History of creating new Transaction and History of creating new Report if have not been created

#### Request
- `Headers`
    ```json
    {
        "access_token": acces_token
    }
    ```
#### Response
_201 - Created
- `Body`
    ```json
    {
        "id": 13,
        "reportId": 1,
        "cashierId": 2,
        "value": 0,
        "payment": "",
        "point": 0,
        "status": "Open",
        "updatedAt": "2022-12-08T11:03:40.293Z",
        "createdAt": "2022-12-08T11:03:40.293Z"
    }   
    ```
---
### 7. POST /transactions
#### Descriptions

- If Transaction doesnt have any Cart, 
    - Update Transaction Status to CLose 
    - Create History of Transaction being cancelled

- If Transaction does have Cart, 
    - Update Transaction Status to CLose, 
    - Update Transaction Value with sum of each Cart Value 
    - Create History of Transaction being closed


#### Request
- `Body`
    ```json
    {
        "id": Integer (required),
        "payment": String (required),
        "member": String,
        "status": String (Closed)
    }
    ```
- `Headers`
    ```json
    {
        "access_token": acces_token
    }
    ```
#### Response
_200 - Ok
- `Body`
    ```json
    {
        "message": "Transaction { Transaction Id} is cancelled"
    }
    ```
    OR
    ```json
    {
        "message": "Transaction { Transaction Id} is closed"
    }
    ```
---

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token/Authentication Failed"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```