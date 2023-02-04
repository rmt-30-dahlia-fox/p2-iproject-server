# Models
## Admin
```json
{
  "id": INTEGER,
  "email": STRING,
  "password": STRING,
}
```
<br>

## Customer
```json
{
  "id": INTEGER,
  "name": STRING,
  "email": STRING,
  "password": STRING,
  "phoneNumber": STRING,
  "identityType": STRING,
  "indentityNumber": STRING,
}
```

<br>

## Unit
```json
  {
    "id": INTEGER,
    "model": STRING,
    "type": STRING,
    "price": INTEGER
  }
```

<br>

## Order
```json
{
  "id": INTEGER,
  "pickupLocation": STRING,
  "pickupDate": DATE,
  "returnLocation": STRING,
  "returnDate": DATE,
  "totalPrice": INTEGER,
  "status": STRING,
  "CustomerId": INTEGER,
  "UnitId": INTEGER
}
```

<br>

# Admin

## Endpoint List
- POST `/admin/login` : log into system as admin.
- GET `/admin/units` : retrieve all unit data from DB.
- POST `/admin/units` : post new unit to DB.
- GET `/admin/units/:id` : retrieve unit data by id from DB.
- GET `/admin/orders` : retrive all orders data from DB.
- PATCH `/admin/orders/:id` : update order status by id.

<br>

## POST `/login`
- ### body:
```json
{
  "email": STRING, // required
  "password": STRING // required
}
```
<br>

- ### response 200 - OK
```json
{
  "access_token": STRING
}
```

<br>

- ### response 400 - Bad Request
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

<br>

## GET `/units`
- ### response 200 - OK
```json
```json
[
  {
    "id": 1,
    "model": "Vario Techno",
    "type": "Matic",
    "price": "50000"
  },
  {
    "id": 2,
    "model": "Yamaha Mio",
    "type": "Matic",
    "price": "35000"
  }
  {
    "id": 3,
    "model": "Honda Revo",
    "type": "Non-Matic",
    "price": "40000"
  }
  ...
]
```

<br>

## POST `/units`
- ### body:
```json
  {
    "model": STRING, // required
    "type": STRING, // required
    "price": INTEGER // required
  }
```

<br>

- ### response 200 - OK
```json
  {
    "id": 1,
    "model": "Vario Techno",
    "type": "Matic",
    "price": "50000"
  }
```

<br>

- ### response 400 - Bad Request
```json
{
  "message": "Model name is required"
}
OR
{
  "message": "Model type is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Price must be integer"
}
```
<br>

## GET `/units/:id`
- ### response 200 - OK
```json
  {
    "id": 1,
    "model": "Vario Techno",
    "type": "Matic",
    "price": "50000"
  }
```
<br>

- ### response 404 - Not Found
```json
{
  "message": "Unit not found!"
}
```
<br>

## GET `/orders`
- ### response 200 - OK
```json
[
  {
    
    "id": 1,
    "pickupLocation": "Ngurah Rai International Airport",
    "pickupDate": "2022/11/02",
    "returnLocation": "Ngurah Rai International Airport",
    "returnDate": "2022/11/05",
    "totalPrice": 150000,
    "status": "Ongoing",
    "customer": {
      "id": 1,
      "name": "John Doe",
      "phoneNumber": "+1234567890",
      "identityType": "Visa",
      "indentityNumber": "123123123",
    },
    "unit": {
        "id": 1,
        "model": "Vario Techno",
    }
  },
  {
    
    "id": 2,
    "pickupLocation": "Ngurah Rai International Airport",
    "pickupDate": "2022/11/02",
    "returnLocation": "Ngurah Rai International Airport",
    "returnDate": "2022/11/05",
    "totalPrice": 150000,
    "status": "Pending",
    "customer": {
      "id": 2,
      "name": "Jane Doe",
      "phoneNumber": "+1234567890",
      "identityType": "Visa",
      "indentityNumber": "123123123",
    },
    "unit": {
        "id": 1,
        "model": "Vario Techno",
    }
    ...
  }

]
```
<br>

## PATCH `/orders/:id`
<br>


# Customer
- POST `/customer/register` : register into system as customer.
- POST `/customer/login` : log into system as customer.
- GET `/customer/orders` : get all orders of current customer.
- POST `/customer/orders` : add new order as customer.

<br>

## POST `/customer/register`
### - Body:
```json
{
  "name": STRING,
  "email": STRING,
  "password": STRING,
  "phoneNumber": STRING,
  "identityType": STRING,
  "indentityNumber": STRING,
}
```

- ### response 400 - Bad Request
```json
{
  "id": 1,
  "email": "johndoe@mail.com"
}
```

<br>

- ### response 400 - Bad Request
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```


<br>

## POST `/customer/login`
- ### body:
```json
{
  "email": STRING, // required
  "password": STRING // required
}
```
<br>

- ### response 200 - OK
```json
{
  "access_token": STRING
}
```

<br>

- ### response 400 - Bad Request
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

<br>

## GET `/customer/orders`
headers:
```json
{
  "access_token": STRING
}
```

### response 200 - OK

```json
{
	"orders": [
		{
			"id": 1,
			"pickupLocation": "Ngurah Rai International Airport",
			"pickupDate": "2022-02-02T00:00:00.000Z",
			"returnLocation": "Ngurah Rai International Airport",
			"returnDate": "2022-02-03T00:00:00.000Z",
			"totalPrice": 50000,
			"status": "Returned",
			"CustomerId": 1,
			"UnitId": 1,
			"Unit": {
				"id": 1,
				"model": "Honda Vario 125",
				"type": "Matic",
				"price": 50000,
				"imageUrl": "https://ik.imagekit.io/zlt25mb52fx/ahmcdn/tr:w-550,f-auto/uploads/product/thumbnail/fa-thumbnail-400x300pxl-ys-6-26092022-105457.png"
			}
		},
		{
			"id": 7,
			"pickupLocation": "SanurPort",
			"pickupDate": "2022-12-09T00:00:00.000Z",
			"returnLocation": "SanurPort",
			"returnDate": "2022-12-17T00:00:00.000Z",
			"totalPrice": 400000,
			"status": "Ongoing",
			"CustomerId": 1,
			"UnitId": 1,
			"Unit": {
				"id": 1,
				"model": "Honda Vario 125",
				"type": "Matic",
				"price": 50000,
				"imageUrl": "https://ik.imagekit.io/zlt25mb52fx/ahmcdn/tr:w-550,f-auto/uploads/product/thumbnail/fa-thumbnail-400x300pxl-ys-6-26092022-105457.png"
			}
		}
	]
}
```

<br>

## POST `/customer/orders`
headers:
```json
{
  "access_token": STRING
}
```

body:
```json
{
  "pickupLocation": STRING
  "pickupDate": DATE
  "returnLocation": STRING
  "returnDate": DATE
  "pickupTime": TIME
  "returnTime": TIME
  "UnitId": STRING
}
```
params:
```json
{
  "id": INTEGER
}
```

### response 201 - Created
```json
{
  "pickupLocation": STRING,
  "pickupDate": STRING,
  "pickupTime": STRING,
  "returnLocation": STRING,
  "returnDate": STRING,
  "returnTime": STRING,
  "totalPrice": STRING,
  "status": STRING,
  "UnitId": INTEGER,
  "CustomerId": INTEGER,
}
```
<br>

## Global Error

### response 500 - Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

### response 403 - Forbidden
```json
{
  "message": "Forbidden"
}
```

### response 401
```json
{
  "message": "Invalid token"
}
```