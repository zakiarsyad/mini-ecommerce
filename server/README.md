# 	Ecommerce with Express and TDD




## List of users routing

### `POST /users/register`

| Route             | HTTP   | Headers | Body                            | Description                 | Additional Info |
| ----------------- | ------ | ------- | ------------------------------- | --------------------------- | --------------- |
| `/users/register` | `POST` | `none`  | `email:String, password:String` | Register a new user account |                 |

Status : `201`
Response :

```
{
    "token": "youraccesstokentomywebsite"
}
```

Status : `400`
Response :

```
{
    "errors": [
        "Email is required!",
        "Email format is invalid!",
        "Email is already registered!",
        "Password is required!"
    ]
}
```

###  `POST /users/login`

| Route          | HTTP   | Headers | Body                            | Description             | Additional Info |
| -------------- | ------ | ------- | ------------------------------- | ----------------------- | --------------- |
| `/users/login` | `POST` | `none`  | `email:String, password:String` | Login a registered user |                 |

Status : `200`
Response :

```
{
    "token": "youraccesstokentomywebsite",
    "role": "customer"
}
```

Status : `403`
Response :

```
{
    "errors": [
        "Invalid username / password!"
    ]
}
```

### `POST /users/checkToken`

| Route               | HTTP   | Headers        | Body   | Description                                                | Additional Info |
| ------------------- | ------ | -------------- | ------ | ---------------------------------------------------------- | --------------- |
| `/users/checkToken` | `POST` | `token:String` | `none` | Validation a token which stores in user's browser (if any) |                 |

Status : `200`
Response :

```
{
		"isLogin" : "true",
		"isAdmin" : "false"
}
```

Status : `403`
Response :

```
{
    "errors": [
        "Access token is invalid!"
    ]
}
```

### 

## List of products routing

### `GET /products`

| Route       | HTTP  | Headers | Body   | Description                | Additional Info |
| ----------- | ----- | ------- | ------ | -------------------------- | --------------- |
| `/products` | `GET` | `none`  | `none` | Get all available products |                 |

Status : `200`
Response :

```
[
    {
        "_id": "5d87966626896606dabd68d2",
        "name": "FIREWIRE MOONBEAM SURFBOARD - LFT",
        "price": 499,
        "category": "Shortboards",
        "stock": 99,
        "userId": "5d84df1e4ced03504cd4ae7f",
        "image": "https://storage.googleapis.com/storage ......jpg",
        "description": "Designed while thinking of small, and .........",
        "createdAt": "2019-09-22T15:42:30.610Z",
        "updatedAt": "2019-09-22T15:54:58.428Z",
        "__v": 0
    },
    {
        "_id": "5d8796ab26896606dabd68d3",
        "name": "TORQ POD MOD SURFBOARD - X-LITE",
        "price": 525,
        "category": "Mid Lengths",
        "stock": 99,
        "userId": "5d84df1e4ced03504cd4ae7f",
        "image": "https://storage.googleapis.com/storage .......jpg",
        "description": "Designed while thinking of small, and .......",
        "createdAt": "2019-09-22T15:43:39.968Z",
        "updatedAt": "2019-09-22T16:04:45.085Z",
        "__v": 0
    }
]
```

### `GET /products/:id`

| Route           | HTTP  | Headers | Body   | Description                    | Additional Info |
| --------------- | ----- | ------- | ------ | ------------------------------ | --------------- |
| `/products/:id` | `GET` | `none`  | `none` | Get detail of a single product |                 |

Status : `200`
Response :

```
{
    "_id": "5d87966626896606dabd68d2",
    "name": "FIREWIRE MOONBEAM SURFBOARD - LFT",
    "price": 499,
    "category": "Shortboards",
    "stock": 99,
    "userId": "5d84df1e4ced03504cd4ae7f",
    "image": "https://storage.googleapis.com/storage ..........",
    "description": "Designed while thinking of small, and .......",
    "createdAt": "2019-09-22T15:42:30.610Z",
    "updatedAt": "2019-09-22T15:54:58.428Z",
    "__v": 0
}
```

### `PATCH /products/:id/stock`

| Route                 | HTTP    | Headers | Body           | Description                                              | Additional Info |
| --------------------- | ------- | ------- | -------------- | -------------------------------------------------------- | --------------- |
| `/products/:id/stock` | `PATCH` | `none`  | `stock:Number` | Modify stock of product (if user buy or cancel an order) |                 |

Status : `200`
Response :

```
{
    "_id": "5d87966626896606dabd68d2",
    "name": "FIREWIRE MOONBEAM SURFBOARD - LFT",
    "price": 499,
    "category": "Shortboards",
    "stock": 88,
    "userId": "5d84df1e4ced03504cd4ae7f",
    "image": "https://storage.googleapis.com/storage ..........",
    "description": "Designed while thinking of small, and .......",
    "createdAt": "2019-09-22T15:42:30.610Z",
    "updatedAt": "2019-09-22T15:54:58.428Z",
    "__v": 0
}
```

### `POST /products`

| Route       | HTTP   | Headers        | Body                                                         | Description        | Additional Info                                 |
| ----------- | ------ | -------------- | ------------------------------------------------------------ | ------------------ | ----------------------------------------------- |
| `/products` | `POST` | `token:String` | `name:String, price:Number, category:String, image:File, stock:Number, description:String` | Add a new products | Authentication and admin authorization required |

Status : `201`
Response :

```
{
    "_id": "5d879efc26896606dabd68f5",
    "name": "CATCH SURF ORIGINAL 54 TWIN FIN BEATER",
    "price": 249,
    "category": "Shortboards",
    "stock": 100,
    "userId": "5d84df1e4ced03504cd4ae7f",
    "image": "https://storage.googleapis.com/storage .........jpg",
    "description": "Designed while thinking of small, and ...........",
    "createdAt": "2019-09-22T16:19:08.979Z",
    "updatedAt": "2019-09-22T16:19:08.979Z",
    "__v": 0
}
```

Status : `401`
Response :

```
{
    "errors": [
        "You are not authorized!"
    ]
}
```

### `PATCH /products/:id`

| Route           | HTTP    | Headers        | Body                                                         | Description                            | Additional Info                                 |
| --------------- | ------- | -------------- | ------------------------------------------------------------ | -------------------------------------- | ----------------------------------------------- |
| `/products/:id` | `PATCH` | `token:String` | `name:String, price:Number, category:String, image:File, stock:Number, description:String` | Edit some or all details of  a product | Authentication and admin authorization required |

Status : `200`
Response :

```
{
    "_id": "5d879efc26896606dabd68f5",
    "name": "CATCH SURF ORIGINAL 54 TWIN FIN BEATER",
    "price": 249,
    "category": "Shortboards",
    "stock": 100,
    "userId": "5d84df1e4ced03504cd4ae7f",
    "image": "https://storage.googleapis.com/storage .........jpg",
    "description": "Designed while thinking of small, and ...........",
    "createdAt": "2019-09-22T16:19:08.979Z",
    "updatedAt": "2019-09-22T16:19:08.979Z",
    "__v": 0
}
```

Status : `401`
Response :

```
{
    "errors": [
        "You are not authorized!"
    ]
}
```

### `DELETE /products/:id`

| Route           | HTTP     | Headers        | Body   | Description      | Additional Info                                 |
| --------------- | -------- | -------------- | ------ | ---------------- | ----------------------------------------------- |
| `/products/:id` | `DELETE` | `token:String` | `none` | Delete a product | Authentication and admin authorization required |

Status : `200`
Response :

```
{
    "_id": "5d879efc26896606dabd68f5",
    "name": "CATCH SURF ORIGINAL 54 TWIN FIN BEATER",
    "price": 249,
    "category": "Shortboards",
    "stock": 100,
    "userId": "5d84df1e4ced03504cd4ae7f",
    "image": "https://storage.googleapis.com/storage .........jpg",
    "description": "Designed while thinking of small, and ...........",
    "createdAt": "2019-09-22T16:19:08.979Z",
    "updatedAt": "2019-09-22T16:19:08.979Z",
    "__v": 0
}
```

Status : `401`
Response :

```
{
    "errors": [
        "You are not authorized!"
    ]
}
```

### 

## List of carts routing

### `GET /carts`

| Route    | HTTP  | Headers        | Body   | Description            | Additional Info                                 |
| -------- | ----- | -------------- | ------ | ---------------------- | ----------------------------------------------- |
| `/carts` | `GET` | `token:String` | `none` | Get all available cart | Authentication and admin authorization required |

Status : `200`
Response :

```
[
    {
        "status": "completed",
        "_id": "5d87995226896606dabd68e2",
        "userId": {
            "role": "customer",
            "money": 10000,
            "_id": "5d87959d26896606dabd68d0",
            "email": "zaki@mail.com",
            "password": "$2a$10$dimlrzOMs3pzy4SCHQBZKuNS8I2WdcEloUIM.L7K2/zfrPdF.MTQK",
            "createdAt": "2019-09-22T15:39:09.373Z",
            "updatedAt": "2019-09-22T15:39:09.373Z",
            "__v": 0
        },
        "items": [
            {
                "_id": "5d879b9726896606dabd68f1",
                "productId": {
                    "_id": "5d8796ab26896606dabd68d3",
                    "name": "TORQ POD MOD SURFBOARD - X-LITE",
                    "price": 525,
                    "category": "Mid Lengths",
                    "stock": 99,
                    "userId": "5d84df1e4ced03504cd4ae7f",
                    "image": "https://storage.googleapis.com/storage-......jpg",
                    "description": "Designed while thinking of small, and .....",
                    "createdAt": "2019-09-22T15:43:39.968Z",
                    "updatedAt": "2019-09-22T16:04:45.085Z",
                    "__v": 0
                },
                "qty": 1
            }
        ],
        "createdAt": "2019-09-22T15:54:58.459Z",
        "updatedAt": "2019-09-22T16:04:57.812Z",
        "__v": 2
]
```

Status : `401`
Response :

```
{
    "errors": [
        "You are not authorized!"
    ]
}
```

### `GET /carts/user`

| Route         | HTTP  | Headers        | Body   | Description     | Additional Info         |
| ------------- | ----- | -------------- | ------ | --------------- | ----------------------- |
| `/carts/user` | `GET` | `token:String` | `none` | Get user's cart | Authentication required |

Status : `200`
Response :

```
[
    {
        "status": "completed",
        "_id": "5d87995226896606dabd68e2",
        "userId": {
            "role": "customer",
            "money": 10000,
            "_id": "5d87959d26896606dabd68d0",
            "email": "zaki@mail.com",
            "password": "$2a$10$dimlrzOMs3pzy4SCHQBZKuNS8I2WdcEloUIM.L7K2/zfrPdF.MTQK",
            "createdAt": "2019-09-22T15:39:09.373Z",
            "updatedAt": "2019-09-22T15:39:09.373Z",
            "__v": 0
        },
        "items": [
            {
                "_id": "5d879b9726896606dabd68f1",
                "productId": {
                    "_id": "5d8796ab26896606dabd68d3",
                    "name": "TORQ POD MOD SURFBOARD - X-LITE",
                    "price": 525,
                    "category": "Mid Lengths",
                    "stock": 99,
                    "userId": "5d84df1e4ced03504cd4ae7f",
                    "image": "https://storage.googleapis.com/storage-......jpg",
                    "description": "Designed while thinking of small, and .....",
                    "createdAt": "2019-09-22T15:43:39.968Z",
                    "updatedAt": "2019-09-22T16:04:45.085Z",
                    "__v": 0
                },
                "qty": 1
            }
        ],
        "createdAt": "2019-09-22T15:54:58.459Z",
        "updatedAt": "2019-09-22T16:04:57.812Z",
        "__v": 2
]
```

Status : `401`
Response :

```
{
    "errors": [
        "Please login first"
    ]
}
```

### `POST /carts`

| Route    | HTTP   | Headers        | Body   | Description   | Additional Info         |
| -------- | ------ | -------------- | ------ | ------------- | ----------------------- |
| `/carts` | `POST` | `token:String` | `none` | Create a cart | Authentication required |

Status : `201` ( if there is no cart with appropriate userId and unpaid status  )
Response :

```
{
    "status": "unpaid",
    "_id": "5d879b9d26896606dabd68f3",
    "userId": "5d87959d26896606dabd68d0",
    "items": [],
    "createdAt": "2019-09-22T16:04:45.113Z",
    "updatedAt": "2019-09-22T16:04:45.113Z",
    "__v": 0
}
```

Status : `200` ( if there is one cart with appropriate userId and unpaid status )
Response :

```
{
    "status": "unpaid",
    "_id": "5d85caf91404a562f0c6e7cc",
    "userId": "5d85caf91404a562f0c6e7cb",
    "items": [],
    "createdAt": "2019-09-21T07:02:17.898Z",
    "updatedAt": "2019-09-21T08:18:02.376Z",
    "__v": 6
}
```

Status : `401`
Response :

```
{
    "errors": [
        "Please login first"
    ]
}
```

### `PATCH /carts/:id`

| Route        | HTTP    | Headers        | Body            | Description        | Additional Info                           |
| ------------ | ------- | -------------- | --------------- | ------------------ | ----------------------------------------- |
| `/carts/:id` | `PATCH` | `token:String` | `status:String` | Update cart status | Authentication and authorization required |

Status : `200`
Response :

```
{
    "status": "paid",
    "_id": "5d87959d26896606dabd68d1",
    "userId": "5d87959d26896606dabd68d0",
    "items": [
        {
            "_id": "5d87994c26896606dabd68e0",
            "productId": {
                "_id": "5d87966626896606dabd68d2",
                "name": "FIREWIRE MOONBEAM SURFBOARD - LFT",
                "price": 499,
                "category": "Shortboards",
                "stock": 88,
                "userId": "5d84df1e4ced03504cd4ae7f",
                "image": "https://storage.googleapis.com/storage-.......jpg",
                "description": "Designed while thinking of small, and ......",
                "createdAt": "2019-09-22T15:42:30.610Z",
                "updatedAt": "2019-09-22T16:15:39.458Z",
                "__v": 0
            },
            "qty": 1
        }
    ],
    "createdAt": "2019-09-22T15:39:09.555Z",
    "updatedAt": "2019-09-22T16:33:09.550Z",
    "__v": 2
}
```

Status : `401`
Response :

```
{
    "errors": [
        "Please login first"
    ]
}
```

Status : `401`
Response :

```
{
    "errors": [
        "You are not authorized!"
    ]
}
```

### `DELETE /carts/:id`

| Route        | HTTP     | Headers        | Body   | Description   | Additional Info                           |
| ------------ | -------- | -------------- | ------ | ------------- | ----------------------------------------- |
| `/carts/:id` | `DELETE` | `token:String` | `none` | Delete a cart | Authentication and authorization required |

Status : `200`
Response :

```
{
    "status": "paid",
    "_id": "5d87959d26896606dabd68d1",
    "userId": "5d87959d26896606dabd68d0",
    "items": [
        {
            "_id": "5d87994c26896606dabd68e0",
            "productId": {
                "_id": "5d87966626896606dabd68d2",
                "name": "FIREWIRE MOONBEAM SURFBOARD - LFT",
                "price": 499,
                "category": "Shortboards",
                "stock": 88,
                "userId": "5d84df1e4ced03504cd4ae7f",
                "image": "https://storage.googleapis.com/storage-.......jpg",
                "description": "Designed while thinking of small, and ......",
                "createdAt": "2019-09-22T15:42:30.610Z",
                "updatedAt": "2019-09-22T16:15:39.458Z",
                "__v": 0
            },
            "qty": 1
        }
    ],
    "createdAt": "2019-09-22T15:39:09.555Z",
    "updatedAt": "2019-09-22T16:33:09.550Z",
    "__v": 2
}
```

Status : `401`
Response :

```
{
    "errors": [
        "Please login first"
    ]
}
```

Status : `401`
Response :

```
{
    "errors": [
        "You are not authorized!"
    ]
}
```

### `POST /carts/product/:id`

| Route                | HTTP   | Headers        | Body   | Description                  | Additional Info         |
| -------------------- | ------ | -------------- | ------ | ---------------------------- | ----------------------- |
| `/carts/product/:id` | `POST` | `token:String` | `none` | Add a product to user's cart | Authentication required |

Status : `200`
Response :

```
{
    "status": "unpaid",
    "_id": "5d85caf91404a562f0c6e7cc",
    "userId": "5d85caf91404a562f0c6e7cb",
    "items": [
        {
            "_id": "5d85cfd51404a562f0c6e7cd",
            "productId": {
                "_id": "5d87966626896606dabd68d2",
                "name": "FIREWIRE MOONBEAM SURFBOARD - LFT",
                "price": 499,
                "category": "Shortboards",
                "stock": 88,
                "userId": "5d84df1e4ced03504cd4ae7f",
                "image": "https://storage.googleapis.com/storage-.......jpg",
                "description": "Designed while thinking of small, and ......",
                "createdAt": "2019-09-22T15:42:30.610Z",
                "updatedAt": "2019-09-22T16:15:39.458Z",
                "__v": 0
            },
            "qty": 3
        }
    ],
    "createdAt": "2019-09-21T07:02:17.898Z",
    "updatedAt": "2019-09-21T08:18:02.376Z",
    "__v": 6
}
```

Status : `401`
Response :

```
{
    "errors": [
        "Please login first"
    ]
}
```

### `DELETE /carts/product/:id`

| Route                | HTTP     | Headers        | Body   | Description                       | Additional Info         |
| -------------------- | -------- | -------------- | ------ | --------------------------------- | ----------------------- |
| `/carts/product/:id` | `DELETE` | `token:String` | `none` | Delete a product from user's cart | Authentication required |

Status : `200`
Response :

```
{
    "status": "unpaid",
    "_id": "5d85caf91404a562f0c6e7cc",
    "userId": "5d85caf91404a562f0c6e7cb",
    "items": [
        {
            "_id": "5d85cfd51404a562f0c6e7cd",
            "productId": {
                "_id": "5d87966626896606dabd68d2",
                "name": "FIREWIRE MOONBEAM SURFBOARD - LFT",
                "price": 499,
                "category": "Shortboards",
                "stock": 88,
                "userId": "5d84df1e4ced03504cd4ae7f",
                "image": "https://storage.googleapis.com/storage-.......jpg",
                "description": "Designed while thinking of small, and ......",
                "createdAt": "2019-09-22T15:42:30.610Z",
                "updatedAt": "2019-09-22T16:15:39.458Z",
                "__v": 0
            },
            "qty": 3
        }
    ],
    "createdAt": "2019-09-21T07:02:17.898Z",
    "updatedAt": "2019-09-21T08:18:02.376Z",
    "__v": 6
}
```

Status : `401`
Response :

```
{
    "errors": [
        "Please login first"
    ]
}
```

### 



