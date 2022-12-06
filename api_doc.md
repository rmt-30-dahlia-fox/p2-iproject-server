# Movie-Library API Documentation

## Endpoints :

List of available endpoints:

- `POST /social-login`
- `POST /register`
- `POST /login`
- `POST /movies`
- `GET /movies`
- `GET /movies/trending`
- `GET /movies/top-vote`
- `GET /movies/:id`
- `GET /movies/:id/trailer`
- `GET /bookmark`
- `POST /bookmark`
- `PATCH /bookmark/:id`
- `DELETE /bookmark/:id`
- `POST /payment`

&nbsp;

## 1. POST /social-login

Request:

- body:

```json
{
  "username": "string",
  "email": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "message": "string",
  "access_token": "string"
}
```

&nbsp;

## 2. POST /register

Request:

- body:

```json
{
  "username": "rrrr",
  "email": "r@mail.com",
  "password": "12345",
  "role": "user",
  "phoneNumber": "081324576890",
  "address": "20 Bojong Dede"
}
```

Response:

_Response (201 - Created)_

```json
{
  "message": "Success register with email <email>"
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
  "message": "Invalid email format"
}
OR
{
  "message": "Email already exist"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 3. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "message": "Success login with email <email>",
  "access_token": "string"
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
  "message": "Invalid email or password"
}
```

&nbsp;

## 4. GET /movies

Description:

- Get movies from 3rd party API

Request:

- query:

```json
{
  "keyword": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
      "genre_ids": [
        28,
        18
      ],
      "id": 361743,
      "original_language": "en",
      "original_title": "Top Gun: Maverick",
      "overview": "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
      "popularity": 3819.59,
      "poster_path": "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      "release_date": "2022-05-24",
      "title": "Top Gun: Maverick",
      "video": false,
      "vote_average": 8.3,
      "vote_count": 2146
    },
    ...
  ],
  "total_pages": 2,
  "total_results": 23
}
```

&nbsp;

## 5. GET /movies/trending

Description:

- Get trending movies from 3rd party API

Response:

_Response (200 - OK)_

```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg",
            "id": 766507,
            "title": "Prey",
            "original_language": "en",
            "original_title": "Prey",
            "overview": "When danger threatens her camp, the fierce and highly skilled Comanche warrior Naru sets out to protect her people. But the prey she stalks turns out to be a highly evolved alien predator with a technically advanced arsenal.",
            "poster_path": "/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg",
            "media_type": "movie",
            "genre_ids": [
                28,
                878,
                53
            ],
            "popularity": 10508.503,
            "release_date": "2022-08-02",
            "video": false,
            "vote_average": 8.104,
            "vote_count": 2653
        },
        ...
    ],
    "total_pages": 1000,
    "total_results": 20000
}
```

&nbsp;

## 6. GET /movies/top-vote

Description:

- Get top vote movies from 3rd party API

Response:

_Response (200 - OK)_

```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
            "genre_ids": [
                18,
                80
            ],
            "id": 278,
            "original_language": "en",
            "original_title": "The Shawshank Redemption",
            "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
            "popularity": 92.507,
            "poster_path": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            "release_date": "1994-09-23",
            "title": "The Shawshank Redemption",
            "video": false,
            "vote_average": 8.7,
            "vote_count": 22011
        },
        ...
    ],
    "total_pages": 511,
    "total_results": 10217
}
```

&nbsp;

## 7. GET /movies/:id

Description:

- Get movies by id from 3rd party API

Request:

- params:

```json
{
  "id": "integer"
}
```

Response:

_Response (200 - OK)_

```json
{
  "adult": false,
  "backdrop_path": "/p1F51Lvj3sMopG948F5HsBbl43C.jpg",
  "belongs_to_collection": {
    "id": 131296,
    "name": "Thor Collection",
    "poster_path": "/yw7gr7DhHHVTLlO8Se8uH17TDMA.jpg",
    "backdrop_path": "/3KL8UNKFWgIKXzLHjwY0uwgjzYl.jpg"
  },
  "budget": 250000000,
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 14,
      "name": "Fantasy"
    }
  ],
  "homepage": "https://www.marvel.com/movies/thor-love-and-thunder",
  "id": 616037,
  "imdb_id": "tt10648342",
  "original_language": "en",
  "original_title": "Thor: Love and Thunder",
  "overview": "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now inexplicably wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.",
  "popularity": 6380.524,
  "poster_path": "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
  "production_companies": [
    {
      "id": 420,
      "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
      "name": "Marvel Studios",
      "origin_country": "US"
    },
    {
      "id": 176762,
      "logo_path": null,
      "name": "Kevin Feige Productions",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2022-07-06",
  "revenue": 720000000,
  "runtime": 119,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "The one is not the only.",
  "title": "Thor: Love and Thunder",
  "video": false,
  "vote_average": 6.792,
  "vote_count": 1919
}
```

&nbsp;

## 8. GET /movies/:id/trailer

Description:

- Get trailer movie by id from 3rd party API

Request:

- params:

```json
{
  "id": "integer"
}
```

Response:

_Response (200 - OK)_

```json
{
  "iso_639_1": "en",
  "iso_3166_1": "US",
  "name": "Official Trailer",
  "key": "Go8nTmfrQd8",
  "site": "YouTube",
  "size": 1080,
  "type": "Trailer",
  "official": true,
  "published_at": "2022-05-24T01:46:47.000Z",
  "id": "628c3a21d3d3870052778b31"
}
```

&nbsp;

## 9. GET /bookmark

Description:

- Get bookmark from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
    "Watched": [
        {
            "id": 1,
            "title": "Thor: Love and Thunder",
            "movie_id": 616037,
            "createdAt": "2022-08-17T09:24:06.932Z",
            "updatedAt": "2022-08-17T09:24:06.932Z",
            "poster_path": "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
        },
        ...
    ],
    "Unwatched": [
        {
            "id": 7,
            "title": "Top Gun: Maverick",
            "movie_id": 361743,
            "createdAt": "2022-08-17T21:49:14.750Z",
            "updatedAt": "2022-08-17T21:49:14.750Z",
            "poster_path": "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg"
        },
        ...
    ],
    "Currently watch": [
        {
            "id": 8,
            "title": "Jurassic World Dominion",
            "movie_id": 507086,
            "createdAt": "2022-08-17T21:49:25.038Z",
            "updatedAt": "2022-08-17T21:49:25.038Z",
            "poster_path": "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg"
        },
        ...
    ]
}
```

&nbsp;

## 10. POST /bookmark

Description:

- Post bookmark into database

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
  "title": "string",
  "imgUrl": "string",
  "movie_id": "integer"
}
```

Response:

_Response (200 - OK)_

```json
{
  "message": "<movie title> successfully added to your bookmarks"
}
```

&nbsp;

## 11. PATCH /bookmark/:id

Description:

- Update bookmark status by id from database

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

Response:

_Response (200 - OK)_

```json
{
  "message": "<movie title> has been update from Watched to Currently watch"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Status is already like that"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

&nbsp;

## 12. DELETE /bookmark/:id

Description:

- Delete bookmark by id from database

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

Response:

_Response (200 - OK)_

```json
{
  "message": "<movie title> has been remove from your bookmark"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

&nbsp;

## 13. POST /payment

Description:

- Post payment into 3rd party API

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
  "amount": "integer"
}
```

Response:

_Response (200 - OK)_

```json
{
  "transactionToken": "string"
}
```

&nbsp;

## Global Error

_Response (401 - Internal Server Error)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbiddenr)_

```json
{
  "message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
