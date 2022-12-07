# Manga API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`
- `GET /mangas`
- `GET /findManga`
- `GET /mangas/:id`
- `POST /google-sign-in`
- `GET /wantToRead`
- `GET /mailWantToRead`
- `POST /wantToRead`
- `DELETE /wantToRead/:id`
- `PATCH /wantToRead:id`



&nbsp;



## 1. POST /login
Description :
logging in registered user

Request:

- body:


```json
{
  "email": "string",
  "password": "string",  
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is  required"
}
OR
{
  "message": "Password is required"
}



_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email or password"
}

```



&nbsp;


## 2. POST /register

Request:
Registering new user


- body:


```json
{
  "email": "string(required)",
  "password": "string(required)"
}
```

_Response (201 - created)_

```json
{
  "id": "string",
  "email" : "string",
  "access_token" : "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "email is required"
}
OR
{
    "message": "password is required"
}
OR
{
    "message": "Invalid email format"
}
OR
{
    "message": "email must be unique"
}

```

&nbsp;



## 3. GET /mangas

Description:
- Get all mangas from 3rd party API

Request:
- query: 

```json
{
  "type": "string",
  "page": "integer"
}
```


_Response (200 - OK)_

```json
{
    "data": [
        {
            "node": {
                "id": 2,
                "title": "Berserk",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/manga/1/157897.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/manga/1/157897l.jpg"
                }
            },
            "ranking": {
                "rank": 1
            }
        },
        {
            "node": {
                "id": 1706,
                "title": "JoJo no Kimyou na Bouken Part 7: Steel Ball Run",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/manga/3/179882.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/manga/3/179882l.jpg"
                }
            },
            "ranking": {
                "rank": 2
            }
        },
    ...,
    ]
}
```

&nbsp;




## 4. GET /findManga

Description:
- Search specific manga(s) from 3rd party API

Request:
- query: 

```json
{  
  "page": "integer"
}
```

- body: 

```json
{  
  "search": "string"
}
```


_Response (200 - OK)_

```json
{
    "data": [
        {
            "node": {
                "id": 51,
                "title": "Slam Dunk",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/manga/2/258749.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/manga/2/258749l.jpg"
                }
            }
        },
        {
            "node": {
                "id": 27211,
                "title": "Grand Slam",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/manga/1/152553.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/manga/1/152553l.jpg"
                }
            }
        },...
    ]
}
```

&nbsp;




## 5. GET /mangas/:id

Description:
- Show detailed information of a manga from 3rd party API

Request:
- params: 

```json
{  
  "id": "integer"
}
```




_Response (200 - OK)_

```json
{
    "id": 2,
    "title": "Berserk",
    "main_picture": {
        "medium": "https://api-cdn.myanimelist.net/images/manga/1/157897.jpg",
        "large": "https://api-cdn.myanimelist.net/images/manga/1/157897l.jpg"
    },
    "status": "currently_publishing",
    "synopsis": "Guts, a former mercenary now known as the \"Black Swordsman,\" is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings.\n\nSetting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity.\n\n[Written by MAL Rewrite]\n\nIncluded one-shot:\nVolume 14: Berserk: The Prototype",
    "mean": 9.46
}
```

## 6. POST /google-sign-in

Description:
-Handler for automatic sign in using google account

Request:

- headers:   

```json
{
  "google_oauth_token" : "string(required)"

}
```

_Response (200 - OK)_

```json
{
  "message" : "User <email> found",
  "access_token" : "string",
  "user" : {
    "name" : "string"
  }
}
```


&nbsp;


## 7. GET /wantToRead
Description:
-Displays a list of all the manga the user wants to read

Request:

- headers:   

```json
{
  "access_token" : "string(required)"

}
```

_Response (200 - OK)_

```json
[
    {
        "id": 2,
        "MangaId": 1,
        "UserId": 1,
        "statusRead": "Finished",
        "mainPicture": "https://api-cdn.myanimelist.net/images/manga/1/157897l.jpg",
        "title": "berserk",
        "createdAt": "2022-12-07T17:59:53.851Z",
        "updatedAt": "2022-12-07T18:12:56.760Z"
    }
]
```


&nbsp;




## 8. GET /mailWantToRead
Description:
- Sending the wanttoread list to the user email using 3rd part API

Request:

- headers:   

```json
{
  "access_token" : "string(required)"

}
```

_Response (200 - OK)_

```json
{
    "message" : "An email with the wanttoread list in it has been sent to you"
    }
```

_Response (401 - Unauthorized)_
```json
{
  "message" : "invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
    "message" : "error sending mail"
}
```

&nbsp;




## 9. POST /wantToRead
Description:
-Add a manga to the wanttoread list of a user

Request:

- headers:   

```json
{
  "access_token" : "string(required)"

}
```

- body:

```json
{
  "MangaId": "integer(required)",
  "mainPicture": "string(required)",
  "title": "string(required)"
}
```

_Response (201 - Created)_

```json
{
    "id": 3,
    "MangaId": 2,
    "UserId": 1,
    "mainPicture": "https://api-cdn.myanimelist.net/images/manga/1/157897l.jpg",
    "title": "berserk",
    "updatedAt": "2022-12-07T20:38:14.056Z",
    "createdAt": "2022-12-07T20:38:14.056Z",
    "statusRead": "Unfinished"
}
```

_Response (400 - Bad Request)_

```json
{
    "message":  "MangaId is required" 
}
OR
{
    "message": "Main Picture is required"
}
OR
{
    "message": "Manga (title) is already on the want to read list"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message" : "invalid token"
}
```

&nbsp;




## 10. DELETE /wantToRead/:id
Description:
-Delete a manga from the wanttoread list of a user

Request:

- headers:   

```json
{
  "access_token" : "string(required)"

}
```


- params:

```json
{
  "id" : "integer(required)"
}
```


_Response (200 - OK)_

```json
{
    "message" : "Succeed at deleting manga (title) from want to read list"
}
```


_Response (400 - Bad Request)_

```json
{
    "message":  "MangaId is required" 
}
OR
{
    "message": "Main Picture is required"
}
OR
{
    "message": "Manga (title) is already on the want to read list"
}

```


_Response (401 - Unauthorized)_
```json
{
  "message" : "invalid token"
}
```



_Response (403 - Forbidden)_

```json
{
    "message":  "forbidden" 
}

```

&nbsp;




## 11. PATCH /wantToRead:id
Description:
-Update status of a manga on the wanttoread list of a user

Request:

- headers:   

```json
{
  "access_token" : "string(required)"

}
```

- params:

```json
{
  "id" : "integer(required)"
}
```

- body:

```json
{
  "statusRead" : "Finished/Unfinished"
}
```

_Response (200 - OK)_

```json
{
    "message" : "Succeed at updating status manga from (old) to (new)"
}
```


_Response (400 - Bad Request)_

```json
{
    "message":  "status can only be Finished or Unfinished" 
}
```


_Response (401 - Unauthorized)_
```json
{
  "message" : "invalid token"
}
```


_Response (403 - Forbidden)_

```json
{
    "message":  "forbidden" 
}

```

&nbsp;




## Global Error



_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```