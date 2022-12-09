# Movie API Documentation

## Endpoints :

List of available endpoints:

1. `POST /login`
2. `POST /register`
3. `POST /google-sign-in`
4. `POST /upload`
5. `GET /doctors`
6. `POST /doctors`
7. `GET /doctors/:id`
8. `PATCH /doctors/:id`
9. `PUT /doctors/:id`
10. `POST /medicines`
11. `GET /medicines`
12. `GET /prescriptions`
13. `GET /prescriptions/:id`
14. `GET /doctor-prescriptions`
15. `POST /prescriptions/:medicineId`
16. `GET /medicalRecords`
17. `POST /generate-midtrans-token/:prescriptionId`

&nbsp;

## 1. POST /login

Description:

- Login with created user account

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "role": "string"
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
OR
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 2. POST /register

Description:

- Login with created user account

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "updatedAt": "string",
  "createdAt": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
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
  "message": "Password is required"
}
OR
{
  "message": "Role is required"
}
```

&nbsp;

## 3. POST /uploads

Description:

- Create a new uploads file

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
  "patientName": "string"
}
```

- file:

```json
{
  "image": "text"
}
```

_Response (201 - Created)_

```json
{
  "file": {
    "id": "integer",
    "patient_name": "string",
    "image": "string"
  },
  "message": "Uploaded !"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Image is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 4. GET /doctors

Description:

- Get all doctor from database

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
    "id": 1,
    "name": "Dr Usman Yousaf",
    "sip_number": "3223",
    "specialization": "Medical Coat",
    "photoUrl": "https://img.freepik.com/free-photo/happy-doctor-wearing-glasses-presenting-something_329181-616.jpg?w=740&t=st=1670343422~exp=1670344022~hmac=9e7f69b31a3fd2bc9f19612e08c145c5d4259ede97d34ff2c22ebf23c64fa8c3",
    "gender": "male",
    "status": "active",
    "UserId": 1,
    "createdAt": "2022-12-08T08:59:49.868Z",
    "updatedAt": "2022-12-08T08:59:49.868Z"
  }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 5. GET /doctors/:id

Description:

- Select doctor by id

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
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Dr Usman Yousaf",
  "sip_number": "3223",
  "specialization": "Medical Coat",
  "photoUrl": "https://img.freepik.com/free-photo/happy-doctor-wearing-glasses-presenting-something_329181-616.jpg?w=740&t=st=1670343422~exp=1670344022~hmac=9e7f69b31a3fd2bc9f19612e08c145c5d4259ede97d34ff2c22ebf23c64fa8c3",
  "gender": "male",
  "status": "active",
  "UserId": 1,
  "createdAt": "2022-12-08T08:59:49.868Z",
  "updatedAt": "2022-12-08T08:59:49.868Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Doctor not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 6. POST /doctors

Description:

- Add Doctor

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
  "id": "integer"
}
```

- user:

```json
{
  "id": "integer"
}
```

_Response (201 - OK)_

```json
{
  "id": 4,
  "name": "Dr Maisaman",
  "sip_number": "2334",
  "gender": "female",
  "photoUrl": "https://i.pinimg.com/736x/24/9b/26/249b260dfe51baccff5765f5c3e74b6a.jpg",
  "specialization": "Biomedic",
  "status": "active",
  "UserId": 2,
  "updatedAt": "2022-12-08T17:22:39.573Z",
  "createdAt": "2022-12-08T17:22:39.573Z"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 7. PATCH /doctors/:id

Description:

- Updated status doctor

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
  "id": "integer"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Succes updated status"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

## 8. PUT /doctors/:id

Description:

- Updated Doctor by id

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
  "id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "sip_number": "string",
  "gender": "string",
  "photoUrl": "string",
  "specialization": "string",
  "specialization": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Succes updated doctor"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 9. POST /medicines

Description:

- POST new medicines

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
  "name": "string",
  "amount": "integer",
  "dose": "integer",
  "photoUrl": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 41,
  "name": "paramecium",
  "amount": 23,
  "dose": 250,
  "photoUrl": "https://cdn.edhub.ama-assn.org/ImageLibrary/featured-topics/pharmacy-and-clinical-pharmacology.jpg",
  "updatedAt": "2022-12-08T17:36:18.838Z",
  "createdAt": "2022-12-08T17:36:18.838Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Amount is required"
}
OR
{
  "message": "Dose is required"
}
OR
{
  "message": "Medicine photo is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

## 10. GET /medicines

Description:

- GET All Medicines

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
    "id": 3,
    "name": "RIVASTIGMINE TARTRATE",
    "amount": 37,
    "dose": 500,
    "photoUrl": "https://domf5oio6qrcr.cloudfront.net/medialibrary/4977/3687af9d-7e14-43ee-999b-7c9f3a341b9d.jpg",
    "createdAt": "2022-12-08T08:59:49.849Z",
    "updatedAt": "2022-12-08T08:59:49.849Z"
  }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 11. GET /prescriptions

Description:

- Show all prescription to admin

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
    "id": 1,
    "patient_name": "Haris",
    "patient_age": "24",
    "patient_address": "Perum Extra",
    "use_description": "Paramex 2 x 1",
    "UserId": 2,
    "MedicineId": 2,
    "status": "claimed",
    "createdAt": "2022-12-08T10:17:44.712Z",
    "updatedAt": "2022-12-08T16:03:27.693Z",
    "Medicine": {
      "id": 2,
      "name": "TITANIUM DIOXIDE",
      "amount": 35,
      "dose": 500,
      "photoUrl": "https://domf5oio6qrcr.cloudfront.net/medialibrary/4977/3687af9d-7e14-43ee-999b-7c9f3a341b9d.jpg",
      "createdAt": "2022-12-08T08:59:49.849Z",
      "updatedAt": "2022-12-08T10:17:44.708Z"
    },
    "User": {
      "id": 2,
      "username": "humberto_chavez",
      "email": "humberto@mail.com",
      "password": "$2a$08$yOZe.TXv4dYZ27E2ozw5q.D4neVhK3kq4rbrO2enC8I6dmaeWDi6y",
      "role": "doctor",
      "createdAt": "2022-12-08T08:59:49.730Z",
      "updatedAt": "2022-12-08T08:59:49.730Z",
      "Doctor": {
        "id": 4,
        "name": "Dr Maisaman",
        "sip_number": "2334",
        "specialization": "Biomedic",
        "photoUrl": "https://i.pinimg.com/736x/24/9b/26/249b260dfe51baccff5765f5c3e74b6a.jpg",
        "gender": "female",
        "status": "active",
        "UserId": 2,
        "createdAt": "2022-12-08T17:22:39.573Z",
        "updatedAt": "2022-12-08T17:22:39.573Z"
      }
    }
  }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 12. GET /prescriptions/:id

Description:

- Get prescriptions by id

Request:

- params:

```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "patient_name": "Haris",
  "patient_age": "24",
  "patient_address": "Perum Extra",
  "use_description": "Paramex 2 x 1",
  "UserId": 2,
  "MedicineId": 2,
  "status": "claimed",
  "createdAt": "2022-12-08T10:17:44.712Z",
  "updatedAt": "2022-12-08T16:03:27.693Z",
  "Medicine": {
    "id": 2,
    "name": "TITANIUM DIOXIDE",
    "amount": 35,
    "dose": 500,
    "photoUrl": "https://domf5oio6qrcr.cloudfront.net/medialibrary/4977/3687af9d-7e14-43ee-999b-7c9f3a341b9d.jpg",
    "createdAt": "2022-12-08T08:59:49.849Z",
    "updatedAt": "2022-12-08T10:17:44.708Z"
  },
  "User": {
    "id": 2,
    "username": "humberto_chavez",
    "email": "humberto@mail.com",
    "password": "$2a$08$yOZe.TXv4dYZ27E2ozw5q.D4neVhK3kq4rbrO2enC8I6dmaeWDi6y",
    "role": "doctor",
    "createdAt": "2022-12-08T08:59:49.730Z",
    "updatedAt": "2022-12-08T08:59:49.730Z",
    "Doctor": {
      "id": 2,
      "name": "Dr Humberto Chavez",
      "sip_number": "3553",
      "specialization": "Medical Heart",
      "photoUrl": "https://img.freepik.com/free-photo/happy-doctor-wearing-glasses-presenting-something_329181-616.jpg?w=740&t=st=1670343422~exp=1670344022~hmac=9e7f69b31a3fd2bc9f19612e08c145c5d4259ede97d34ff2c22ebf23c64fa8c3",
      "gender": "male",
      "status": "active",
      "UserId": 2,
      "createdAt": "2022-12-08T08:59:49.868Z",
      "updatedAt": "2022-12-08T08:59:49.868Z"
    }
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 13. PATCH /prescriptions/:id

Description:

- Edit status prescription by id

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
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Succes updated prescription status"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Prescription not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 14. GET /doctor-prescriptions

Description:

- GET prescriptions to doctor

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
    "id": 1,
    "patient_name": "Haris",
    "patient_age": "24",
    "patient_address": "Perum Extra",
    "use_description": "Paramex 2 x 1",
    "UserId": 2,
    "MedicineId": 2,
    "status": "claimed",
    "createdAt": "2022-12-08T10:17:44.712Z",
    "updatedAt": "2022-12-08T16:03:27.693Z",
    "Medicine": {
      "id": 2,
      "name": "TITANIUM DIOXIDE",
      "amount": 35,
      "dose": 500,
      "photoUrl": "https://domf5oio6qrcr.cloudfront.net/medialibrary/4977/3687af9d-7e14-43ee-999b-7c9f3a341b9d.jpg",
      "createdAt": "2022-12-08T08:59:49.849Z",
      "updatedAt": "2022-12-08T10:17:44.708Z"
    }
  }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 15. POST /prescriptions/:medicineId"

Description:

- Add new prescription by medicine id

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
  "medicineId": "integer"
}
```

- user:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "patient_name": "string",
  "patient_age": "string",
  "patient_address": "string",
  "use_description": "string",
  "amount": "integer",
  "dose": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 7,
  "patient_name": "Ahira",
  "patient_age": "25",
  "patient_address": "Hotel Mawar",
  "use_description": "Polinix 2 x 1",
  "MedicineId": 1,
  "UserId": 2,
  "status": "unclaimed",
  "updatedAt": "2022-12-08T17:50:31.368Z",
  "createdAt": "2022-12-08T17:50:31.368Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Medicine not found"
}
OR
{
  "message": "Medicine is not enough"
}
OR
{
  "message": "Amount is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 16. GET /medicalRecords

Description:

- GET Medical Record from database

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
    "patient_name": "string",
    "image": "text",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 17. POST /generate-midtrans-token/:prescriptionId

Description:

- Post payment for purchasing

Request:

- params:

```json
{
  "prescriptionId": "integer"
}
```

- user:

```json
{
  "id": "integer"
}
```

_Response (201 - created)_

```json
{
  "token": "string",
  "redirect_url": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Prescription is claimed"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
