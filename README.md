# Payment API Example


## Getting Started

```
git clone git@github.com:dmmarinov/paymentAPI.git
cd paymentAPI
npm i
npm start
```
The server should now be running at `http://localhost:3000`

Request

POST http://localhost:3000/v1/authenticate

### Headers
```
Content-Type: application/x-www-form-urlencoded
```

### Request body
```
{
    "username": "serious_business",
    "password": "suchPassw0rdSecure"
}
```

Other requests as in task using received Bearer token in header

```
Authorization: Bearer 79c610c4aa27c23375aa9af50b6afcf924113c2c
```