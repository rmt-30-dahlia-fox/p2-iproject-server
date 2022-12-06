## Endpoints

List of Available Endpoints:
- `POST /customers/register`
- `POST /customers/login`
- `GET /customers/products`
- `GET /customers/dealers`
- `GET /customers/products/:carId`
- `GET /customers/users`
- `GET /customers/transactions/:status`
- `POST /customers/transactions/:carId`
- `POST /customers/reviews/:transactionId`
- `PATCH /customers/transactions/:transactionsId`
- `PUT /customers/users`
- `POST /customers/payments`

### POST /customers/register
#### Description
- Register new customer account

#### Request
- Body
    ```json
    {
      "firstName": "customer2",
      "lastName": "Example",
      "email": "customer2@mail.com",
      "password": "customer2",
      "phoneNumber": "082222222222"
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 2,
      "email": "customer2@mail.com"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "First Name is required"
    }
    Or
    {
      "message": "Wrong email format"
    }
    Or
    {
      "message": "Email is required"
    }
    Or
    {
      "message": "Password is required"
    }
    Or
    {
      "message": "Password must be 7 characters or longer"
    }
    Or
    {
      "message": "email must be unique"
    }
    Or
    {
      "message": "Phone number is required"
    }
    ```

### POST /customers/login
#### Description
- Login to customer account

#### Request
- Body
    ```json
    {
      "email": "customer2@mail.com",
      "password": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
    "access_token": String
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "Email is required"
    }
    Or
    {
      "message": "Password is required"
    }
    Or
    {
      "message": "Invalid email or password"
    }
    ```

### GET /customers/products
#### Description
- Get all products data

#### Request
- Query
    ```json
    {
      "brand": String
    }
    Or
    {
      "price": Integer
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": 5,
        "name": "Kijang Innova Zenix",
        "imgUrl": "https://www.toyota.astra.co.id/sites/default/files/2022-11/2-Silver-Metallic.png",
        "price": 419000000,
        "description": "Toyota Kijang Innova Zenix memiliki panjang 4.755 mm, lebar 1.850 mm tinggi 1.795 mm, dan wheelbase 2.850 mm",
        "specification": "New Crossover Front looks \nNew Stunning Led Headlamp \nNew Captivating 16 inch Alloy Wheel \nNew 9 inch Head Unit with Smartphone Connectivity \nNew TNGA Platform \nNew Gasoline Engine \nNew Electric Parking Brake & Brake Hold",
        "brand": "Toyota",
        "createdAt": "2022-12-03T11:28:18.760Z",
        "updatedAt": "2022-12-03T11:28:18.760Z"
      },
      ...
    ]
    ```
### GET /customers/dealers
#### Description
- Get all dealers data

#### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": 1,
        "name": "CarStore Sudirman",
        "address": "Jln. Sudirman no. 1000",
        "city": "Bandung",
        "phoneNumber": "(022)6000000",
        "createdAt": "2022-12-03T11:28:18.763Z",
        "updatedAt": "2022-12-03T11:28:18.763Z"
      },
      ...
    ]
    ```
### GET /customers/products/:carId
#### Description
- Get product data and review by id

#### Response
_200 - OK_
- Body
    ```json
    {
      "id": 1,
      "name": "HR-V",
      "imgUrl": "https://asset.honda-indonesia.com/colors/5haKpAny11EkiXwT5ipc33e8Gp8AG2QbFbPc42SP.png",
      "price": 364900000,
      "description": "HRV adalah Crossover 5 seater dengan panjang 4385 mm, lebar 1790 mm, wheelbase 2610 mm",
      "specification": "1.5L DOHC i-VTEC Engine (Power 121 PS, Torque 145Nm) \n Honda Sensing\n Full LED Headlights with LED DRL \n 17 inch Alloy Wheels \n 4.2 inch Interactive TFT Meter Cluster \n7 inch Touchscreen Display Audio with Smartphone Connection \nWalk Away Auto Lock \nRear Seat Reminder \nHill Start Assist (HSA) \nHill Descent Control (HDC) \nVehicle Stability Assist (VSA) \nABS + EBD + BA \nEPB + ABH\n 4 Speakers",
      "brand": "Honda",
      "createdAt": "2022-12-03T11:28:18.760Z",
      "updatedAt": "2022-12-03T11:28:18.760Z",
      "Reviews": [
        {
          "id": 1,
          "UserId": 2,
          "CarId": 1,
          "message": "Mobil dengan bahan bakar paling irit saat ini",
          "createdAt": "2022-12-03T14:09:17.265Z",
          "updatedAt": "2022-12-03T14:09:17.265Z",
          "TransactionId": null,
          "User": {
            "id": 2,
            "firstName": "update",
            "lastName": "example"
          }
        },
        ...
      ]
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```
### GET /customers/users
#### Description
- Get users data

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "id": 2,
      "email": "customer2@mail.com",
      "phoneNumber": "082222222222",
      "firstName": "customer2",
      "lastName": "Example"
    }
    ```
### GET /customers/transactions/:status
#### Description
- Get transaction data for logged in user based on status

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```

#### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": 1,
        "UserId": 2,
        "CarId": 2,
        "status": "Pending",
        "createdAt": "2022-12-03T13:51:58.249Z",
        "updatedAt": "2022-12-03T13:51:58.249Z",
        "Car": {
          "id": 2,
          "name": "Brio",
          "imgUrl": "https://www.honda-indonesia.com/uploads/images/models/colors/cyellow2__1613396998399.png",
          "price": 157900000,
          "description": "Brio adalah Hatchback 5 seater dengan panjang 3815 mm, lebar 1680 mm, wheelbase 2405 mm.",
          "specification": "1.2L i-VTEC 90PS \n5 M/T \nChrome Front Grille \nHeadlamp with LED Light Guide \n14 inch Trim Wheels \nBody Spoiler with LED High Mount Stop Lamp \nTwo Tone Interior Color \n2nd Row Adjustable Headrest \nTilt Steering \nElectric Power Steering \nDigital A/C \nABS + EBD \nParking Sensor",
          "brand": "Honda",
          "createdAt": "2022-12-03T11:28:18.760Z",
          "updatedAt": "2022-12-03T11:28:18.760Z"
        },
        "Review": null,
        "User": {
          "firstName": "John",
          "lastName": "Doe"
        }
      },
      ...
    ]
    ```
### POST /customers/transactions/:carId
#### Description
- Add new transaction for logged in user

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```

#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 1,
      "UserId": 2,
      "CarId": 2,
      "status": "Pending",
      "updatedAt": "2022-12-03T13:51:58.249Z",
      "createdAt": "2022-12-03T13:51:58.249Z"
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```
### POST /customers/reviews/:transactionId
#### Description
- Add new review for purchased car by logged in user

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    {
      "message": "Fitur mobil terbaik di kelasnya"
    }
    ```


#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 3,
      "UserId": 2,
      "CarId": 1,
      "message": "Fitur mobil terbaik di kelasnya",
      "TransactionId": 2,
      "updatedAt": "2022-12-04T09:42:13.044Z",
      "createdAt": "2022-12-04T09:42:13.044Z"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Review message is required"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "message": "Access denied!"
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```

### PATCH /customers/transactions/:transactionId
#### Description
- Update transaction status

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    {
      "status": "Paid"
    }
    ```

#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "Successfully updated status"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```

_403 - Forbidden_
- Body
    ```json
    {
      "message": "Access denied!"
    }
    ```
### PUT /customers/users
#### Description
- Update customer account

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    { 
      "firstName": "update",
      "lastName": "example",
      "email": "customerupdate@mail.com",
      "password": String,
      "phoneNumber": "081234132"
    }
    ```
#### Response
_200 - Ok_
- Body
    ```json
    {
      "message": "Successfully updated profile"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "First Name is required"
    }
    Or
    {
      "message": "Wrong email format"
    }
    Or
    {
      "message": "Email is required"
    }
    Or
    {
      "message": "Password is required"
    }
    Or
    {
      "message": "Password must be 7 characters or longer"
    }
    Or
    {
      "message": "email must be unique"
    }
    Or
    {
      "message": "Phone number is required"
    }
    ```
### POST /customers/payments
#### Description
- Get snapToken for payment requirement

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    {
      "firstName": "customer2",
      "lastName": "Example",
      "email": "customer2@mail.com",
      "phoneNumber": "082222222222"
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "snapToken": String
    }
    ```

### Global Error

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