#FootballTransferMarket API Documentation

##Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /players`
- `POST /myplayers/:playerId`
- `GET /myplayers`
- `GET /myplayers/:myplayerId`
- `DELETE /myplayers/:myplayerId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
    "id": "string",
    "username": "string",
    "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Name is required"
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
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

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
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /google-sign-in

Request:

- headers:

```json
{
  "google-oauth-token": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "name": "string"
}
```

&nbsp;

## 4. GET /players

Description:

- Get all players from database

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
	"totalItems": 12,
	"players": [
		{
			"id": 25,
			"name": "Marcel Lotka",
			"height": "190 cm",
			"position": "G",
			"shirtNumber": 35,
			"preferredFoot": "Right",
			"nation": "Poland",
			"proposedMarketValue": "€1,400,000.00",
			"team": "Borussia Dortmund",
			"profile": "https://img.a.transfermarkt.technology/portrait/big/453737-1657285168.jpg?lm=1",
			"footApi": 997113,
			"createdAt": "2022-12-08T01:35:29.654Z",
			"updatedAt": "2022-12-08T01:35:29.654Z"
		},
		{
			"id": 10,
			"name": "Felipe",
			"height": "191 cm",
			"position": "D",
			"shirtNumber": 18,
			"preferredFoot": "Right",
			"nation": "Brazil",
			"proposedMarketValue": "€3,100,000.00",
			"team": "Atletico Madrid",
			"profile": "https://img.a.transfermarkt.technology/portrait/big/156501-1542105735.png?lm=1",
			"footApi": 242211,
			"createdAt": "2022-12-08T01:35:29.654Z",
			"updatedAt": "2022-12-08T01:35:29.654Z"
		},
		...,
	],
	"currentPage": 1,
	"news": {
		"status": "ok",
		"totalResults": 35,
		"articles": [
			{
				"source": {
					"id": null,
					"name": "Sporting News"
				},
				"author": null,
				"title": "Ver EN VIVO ONLINE: Athletic Bilbao vs Chivas, por Amistoso 2022, ¿dónde ver vía streaming, por internet y ... - Goal.com",
				"description": "Get all the latest Soccer news, highlights, scores, schedules, standings and more from Sporting News Canada.",
				"url": "https://www.sportingnews.com/ca/soccer",
				"urlToImage": "https://static.sportingnews.com/1.22.0.5/themes/custom/tsn/logo.jpg",
				"publishedAt": "2022-12-08T21:16:07Z",
				"content": null
			},
			{
				"source": {
					"id": null,
					"name": "Canadian Premier League"
				},
				"author": null,
				"title": "Canadian Premier League statement regarding women's professional soccer - Canadian Premier League",
				"description": "In response to numerous requests from media outlets asking for comment regarding women’s professional soccer, the Canadian Premier League has issued the following statement:\r\n\r\n“We are incredibly excited about the potential for women’s professional soccer in …",
				"url": "https://canpl.ca/article/canadian-premier-league-statement-regarding-womens-professional-soccer",
				"urlToImage": "https://cdn.canpl.ca/app/uploads/cpl/2022/11/21151855/Special-Announcement2_Thumbnail-1-730x410.jpg",
				"publishedAt": "2022-12-08T14:05:53Z",
				"content": "In response to numerous requests from media outlets asking for comment regarding womens professional soccer, the Canadian Premier League has issued the following statement:\r\nWe are incredibly excited… [+1289 chars]"
			},
			...,
		]
	}
}
```

&nbsp;
 
## 5. POST /myplayers/:playerId

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
  "playerId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
	"id": 10,
	"UserId": 1,
	"PlayerId": 13,
	"updatedAt": "2022-12-09T01:31:35.989Z",
	"createdAt": "2022-12-09T01:31:35.989Z",
	"status": "Key"
}
```

&nbsp;

## 6. GET /myplayers

Description:

- Get all player that has been contracted

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
		"id": 2,
		"status": "Key",
		"Player": {
			"id": 10,
			"name": "Felipe",
			"height": 191,
			"position": "D",
			"shirtNumber": 18,
			"preferredFoot": "Right",
			"nation": "Brazil",
			"proposedMarketValue": 3100000,
			"team": "Atletico Madrid",
			"profile": "https://img.a.transfermarkt.technology/portrait/big/156501-1542105735.png?lm=1",
			"footApi": 242211,
			"createdAt": "2022-12-08T01:35:29.654Z",
			"updatedAt": "2022-12-08T01:35:29.654Z"
		}
	},
	{
		"id": 10,
		"status": "Key",
		"Player": {
			"id": 13,
			"name": "Sebastien Haller",
			"height": 190,
			"position": "F",
			"shirtNumber": 22,
			"preferredFoot": "Right",
			"nation": "Ivory Coast",
			"proposedMarketValue": 33000000,
			"team": "Borussia Dortmund",
			"profile": "https://img.a.transfermarkt.technology/portrait/big/181375-1661412873.jpg?lm=1",
			"footApi": 149731,
			"createdAt": "2022-12-08T01:35:29.654Z",
			"updatedAt": "2022-12-08T01:35:29.654Z"
		}
	},
	...,
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Player not found"
}
```

&nbsp;

## 7. GET /myplayers/:myplayerId

Description:

- Get player by id that has been contracted

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
  "myplayerId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
	"myPlayer": {
		"id": 10,
		"name": "Felipe",
		"height": 191,
		"position": "D",
		"shirtNumber": 18,
		"preferredFoot": "Right",
		"nation": "Brazil",
		"proposedMarketValue": 3100000,
		"team": "Atletico Madrid",
		"profile": "https://img.a.transfermarkt.technology/portrait/big/156501-1542105735.png?lm=1",
		"footApi": 242211,
		"createdAt": "2022-12-08T01:35:29.654Z",
		"updatedAt": "2022-12-08T01:35:29.654Z"
	},
	"attributes": {
		"tactical": 56,
		"defending": 67,
		"id": 19810,
		"attacking": 39,
		"anticipation": null,
		"aerial": null,
		"yearShift": 0,
		"technical": 47,
		"ballDistribution": null,
		"saves": null,
		"creativity": 44,
		"position": "D"
	}
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Player not found"
}
```

&nbsp;
 
## 8. DELETE /myplayers/:myplayerId

Description:

- Realease player that has been contracted

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
  "myplayerId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Player has ben successfully released"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
	"message": "Invalid email or password"
}
```

_Response (403 - Forbidden)_

```json
{
	"message": "Forbidden"
}
```

_Response (404 - Data Not Found)_

```json
{
	"message": "Player not found"
}
OR
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```