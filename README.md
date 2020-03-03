# Share Calculator API
A simple share calculator API that will return the number of share a user can buy

## Table of Contents
- [Get Started](#get-started)
- [Endpoints](#endpoints)
    - [Postman Workspaces](#postman-workspaces)
    - [Calculate](#calculate)
        - [Calculate for a given amount](#calculate)
    - [Health](#health)
        - [Get Health](#get-health)
- [Environment Variables](#environment-variables)

## Get Started
You can get started with your own locally hosted instance of this application quite quickly and painlessly.
```bash
$ git clone https://github.com/sandisototo/cpt-share-calculator-api.git
$ cd cpt-share-calculator-api
$ npm i
$ npm start
```

#### Postman Workspaces
You can find workspaces for Postman within this project under `collections`. You'll be able to
import these workspaces and test the below API endpoints for yourself.


#### Calculate
This is the share quantity calculator POST endpoint that calculates the number of share a person can buy for a given amount of money.

This will then return a JSON object along with a 200. if amount entered is <= 0 OR amount is < than current share price value, then a status of 400 will be returned with a string message that indicates why the calculation could not be made.

`[POST] http://127.0.0.1:3000/calculate/`

Payload:
```
json
{
	"amount": 5000
}
```

Response 200
```
json
{
    "price": 1299.99,
    "quantity": 3.08
}
```

Response 400 (if amount < current share value/price)
```string
"The amount you entered is insufficient to buy any shares at the moment, current share price is R 1299.99"
```
OR (if amount is <= 0)
```
"The amount to buy shares cannot be less or = to 0"
```

#### Health
The objective of the health endpoint is to ensure that the external dependencies of the application are healthy and be
reached. As such, the application is considered healthy if the Node server and health endpoint can be reached.

#### Get Health
You can query the health status of the application conveniently on the following endpoint.

`[GET] http://127.0.0.1:3000/health/`

Response 200
```json
{
  "healthController": "healthy",
  "serverConnection": "healthy"
}
```


## Environment Variables
The following table represents the variables that are required to be in the environment for the application to use at
run time. 

| Name              | Description                                                                                    |
|-------------------|------------------------------------------------------------------------------------------------|
| LOGGER_SERVICE    | The name for the basic application level logger which will be used to spawn all child loggers. |
| LOGGER_LEVEL      | The level of logging required. info/debug/trace are most common.                               |
| PORT              | The port that the application will be exposed on once hosted.                                  |

## License
MIT License

Copyright (c) 2020 Sandiso Toto
