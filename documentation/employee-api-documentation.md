## Endpoints

List of Available Endpoints:
- `POST /employees/cars`
- `POST /employees/dealers`

### POST /employees/cars
#### Description
- Add a new car

#### Request
- Body
    ```json
    {
      "name": "CR-V",
      "imgUrl": "https://www.honda-indonesia.com/uploads/images/models/colors/cwhite__1613384007606.png",
      "price": 515900000,
      "description": "CRV adalah Crossover 5 dan 7 seater dengan panjang 4623 mm, lebar 1855 mm, wheelbase 2660 mm.",
      "specification": "2.0L SOHC i-VTEC Engine 154PS \nCVT with Earth Dreams Technology \n18 inch Alloy Wheel \n7 inch Touchscreen Display Audio \nFull LED Headlamp with Daytime Running Light \nLED Fog Light Rounded \nHFT Switch \n6 Airbags \nCruise Control \nHSA + VSA",
      "brand": "Honda"
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 9,
      "name": "CR-V",
      "imgUrl": "https://www.honda-indonesia.com/uploads/images/models/colors/cwhite__1613384007606.png",
      "price": 515900000,
      "description": "CRV adalah Crossover 5 dan 7 seater dengan panjang 4623 mm, lebar 1855 mm, wheelbase 2660 mm.",
      "specification": "2.0L SOHC i-VTEC Engine 154PS \nCVT with Earth Dreams Technology \n18 inch Alloy Wheel \n7 inch Touchscreen Display Audio \nFull LED Headlamp with Daytime Running Light \nLED Fog Light Rounded \nHFT Switch \n6 Airbags \nCruise Control \nHSA + VSA",
      "brand": "Honda",
      "updatedAt": "2022-12-03T09:39:38.600Z",
      "createdAt": "2022-12-03T09:39:38.600Z"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "name must be unique"
    }
    Or
    {
      "message": "Car name is required"
    }
    Or
    {
      "message": "Car image is required"
    }
    Or
    {
      "message": "Price must be higher than 100.000.000"
    }
    Or
    {
      "message": "Car description is required"
    }
    Or
    {
      "message": "Car specification is required"
    }
    Or
    {
      "message": "Car brand is required"
    }
    ```

### POST /employees/dealers
#### Description
- Add a new dealer

#### Request
- Body
    ```json
    {
      "name": "CarStore Braga",
      "address": "Jln. Braga No.2000",
      "city": "Bandung",
      "phoneNumber": "0223399203"
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 2,
      "name": "CarStore Braga",
      "address": "Jln. Braga No.2000",
      "city": "Bandung",
      "phoneNumber": "0223399203",
      "updatedAt": "2022-12-03T09:53:09.474Z",
      "createdAt": "2022-12-03T09:53:09.474Z"
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "name must be unique"
    }
    Or
    {
      "message": "Dealer name is required"
    }
    Or
    {
      "message": "Dealer address is required"
    }
    Or
    {
      "message": "City is required"
    }
    Or
    {
      "message": "Phone number is required"
    }
    ```


### Global Error

_Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal server error"
  }
  ```