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
		"token" : "aksjdlkajdakdkapodkapd.........."
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
		"token" : "aksjdlkajdakdkapodkapd..........",
		"role" : "customer"
}
```

### `POST /users/checkToken`

| Route               | HTTP   | Headers        | Body   | Description             | Additional Info |
| ------------------- | ------ | -------------- | ------ | ----------------------- | --------------- |
| `/users/checkToken` | `POST` | `token:String` | `none` | Login a registered user |                 |

Status : `200`
Response :

```
{
		"isLogin" : "true",
		"isAdmin" : "false"
}
```



## List of products routing

### `GET /products`

| Route       | HTTP  | Headers        | Body   | Description                | Additional Info |
| ----------- | ----- | -------------- | ------ | -------------------------- | --------------- |
| `/products` | `GET` | `token:String` | `none` | Get all available products |                 |

Status : `200`
Response :

```
[
    {
        "_id" : "123",
        "productName" : "sendal gunung",
        "price" : 1000,
        "category" : "sendal",
        "image" : "http://storage.google.com",
        "stock" : 10,
        "userId" : "123"
    },
    {
        "_id" : "124",
        "productName" : "sendal jepit",
        "price" : 1000,
        "category" : "sendal",
        "image" : "http://storage.google.com",
        "stock" : 10,
        "userId" : "123"
    }
]
```

### `GET /products/:id`

| Route           | HTTP  | Headers        | Body   | Description          | Additional Info |
| --------------- | ----- | -------------- | ------ | -------------------- | --------------- |
| `/products/:id` | `GET` | `token:String` | `none` | Get a single product |                 |

Status : `200`
Response :

```
{
    "_id" : "123",
    "productName" : "sendal gunung",
    "price" : 1000,
    "category" : "sendal",
    "image" : "http://storage.google.com",
    "stock" : 10
    "userId" : "123"
}
```

### `POST /products`

| Route       | HTTP   | Headers        | Body                                                         | Description        | Additional Info         |
| ----------- | ------ | -------------- | ------------------------------------------------------------ | ------------------ | ----------------------- |
| `/products` | `POST` | `token:String` | `productName:String, price:Number, category:String, image:File, stock:Number, userId:String` | Add a new products | Authentication required |

Status : `201`
Response :

```
{
    "_id" : "123",
    "productName" : "sendal gunung",
    "price" : 1000,
    "category" : "sendal",
    "image" : "http://storage.google.com",
    "stock" : 10,
    "userId" : "123"
}
```

### `PATCH /products/:id`

| Route           | HTTP    | Headers        | Body                                                         | Description                  | Additional Info                           |
| --------------- | ------- | -------------- | ------------------------------------------------------------ | ---------------------------- | ----------------------------------------- |
| `/products/:id` | `PATCH` | `token:String` | `productName:String, price:Number, category:String, image:File, stock:Number, userId:String` | Edit all details of  product | Authentication and authorization required |

Status : `200`
Response :

```
{
    "_id" : "123",
    "productName" : "sendal gunung",
    "price" : 1000,
    "category" : "sendal",
    "image" : "http://storage.google.com",
    "stock" : 10
    "userId" : "123"
}
```

### `DELETE /products/:id`

| Route           | HTTP     | Headers        | Body   | Description      | Additional Info                           |
| --------------- | -------- | -------------- | ------ | ---------------- | ----------------------------------------- |
| `/products/:id` | `DELETE` | `token:String` | `none` | Delete a product | Authentication and authorization required |

Status : `200`
Response :

```
{
    "_id" : "123",
    "productName" : "sendal gunung",
    "price" : 1000,
    "category" : "sendal",
    "image" : "http://storage.google.com",
    "stock" : 10,
    "userId" : "123"
}
```



## List of carts routing

### `GET /carts`

| Route    | HTTP  | Headers        | Body   | Description              | Additional Info         |
| -------- | ----- | -------------- | ------ | ------------------------ | ----------------------- |
| `/carts` | `GET` | `token:String` | `none` | Get a user's unpaid cart | Authentication required |

Status : `200`
Response :

```
{
    "status": "unpaid",
    "_id": "5d800a7fd59c36177c8227e9",
    "userId": "5d7f7f64e58ee6108f417344",
    "items": [
        {
            "_id": "5d800a81d59c36177c8227ea",
            "productId": {
                "_id": "5d7f9f03db6198156b231bff",
                "productName": "jagung",
                "price": 5000,
                "category": "minuman",
                "stock": 10,
                "userId": "5d7f7f64e58ee6108f417344",
                "image": "https://storage.googleapis.com/storage-			ecommerce.zakiarsyad.com/1568644866293astetic.jpg",
                "createdAt": "2019-09-16T14:41:07.386Z",
                "updatedAt": "2019-09-16T14:41:07.386Z",
                "__v": 0
            },
            "qty": 2
        }
    ],
    "createdAt": "2019-09-16T22:19:43.012Z",
    "updatedAt": "2019-09-16T22:19:45.249Z",
    "__v": 1
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
    "_id": "5d85caf91404a562f0c6e7cc",
    "userId": "5d85caf91404a562f0c6e7cb",
    "items": [],
    "createdAt": "2019-09-21T07:02:17.898Z",
    "updatedAt": "2019-09-21T08:18:02.376Z",
    "__v": 6
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

### `PATCH /carts/:id`

| Route                | HTTP    | Headers        | Body   | Description                             | Additional Info                           |
| -------------------- | ------- | -------------- | ------ | --------------------------------------- | ----------------------------------------- |
| `/carts/product/:id` | `PATCH` | `token:String` | `none` | Edit confirmation status to user's cart | Authentication and authorization required |

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
            "productId": "5d85a0178cbce55fb31ff93b",
            "qty": 3
        },
        {
            "_id": "5d85d03c1404a562f0c6e7ce",
            "productId": "5d85a0388cbce55fb31ff93c",
            "qty": 2
        },
        {
            "_id": "5d85d0701404a562f0c6e7cf",
            "productId": "5d85a0178cbce55fb31ff93b",
            "qty": 5
        }
    ],
    "createdAt": "2019-09-21T07:02:17.898Z",
    "updatedAt": "2019-09-21T08:18:02.376Z",
    "__v": 6
}
```

### `POST /carts/product/:id`

| Route                | HTTP   | Headers        | Body         | Description                  | Additional Info                           |
| -------------------- | ------ | -------------- | ------------ | ---------------------------- | ----------------------------------------- |
| `/carts/product/:id` | `POST` | `token:String` | `qty:Number` | Add a product to user's cart | Authentication and authorization required |

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
            "productId": "5d85a0178cbce55fb31ff93b",
            "qty": 3
        },
        {
            "_id": "5d85d03c1404a562f0c6e7ce",
            "productId": "5d85a0388cbce55fb31ff93c",
            "qty": 2
        },
        {
            "_id": "5d85d0701404a562f0c6e7cf",
            "productId": "5d85a0178cbce55fb31ff93b",
            "qty": 5
        }
    ],
    "createdAt": "2019-09-21T07:02:17.898Z",
    "updatedAt": "2019-09-21T08:18:02.376Z",
    "__v": 6
}
```

### `DELETE /carts/product/:id`

| Route                | HTTP     | Headers        | Body   | Description                       | Additional Info                           |
| -------------------- | -------- | -------------- | ------ | --------------------------------- | ----------------------------------------- |
| `/carts/product/:id` | `DELETE` | `token:String` | `none` | Delete a product from user's cart | Authentication and authorization required |

Status : `200`
Response :

```
{
		"deletedProduct" : "kopi"
}
```





