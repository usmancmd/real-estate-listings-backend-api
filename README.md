# Real Estate Market Backend API Documentation

Welcome to the documentation for the Real Estate Market Backend API. This API provides access to various endpoints that allow you to retrieve real estate market data.

## Description

The Real Estate Market API provides developers with real-time access to comprehensive real estate market data, including property listings, prices, and details. Enhance your real estate applications with up-to-date information and improve user experiences.

## Base URL

The base URL for all API endpoints is: [https://rem-api.onrender.com](https://rem-api.onrender.com)

## API Version

The current version of the API is: `version 1.0.0`

## Authentication

All endpoints except for the signup and signin routes require authentication using JWT token.

### Sign up

**Endpoint**: POST /auth/signup  
Registers a new user by sending a post request to the endpoint. The request body must be a valid json data with the required fields email and password.  
**Example request**  
`POST /auth/signup`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Example response**

HTTP/1.1 201 Created

```json
{
  "message": "User registered successfully"
}
```

Once a user is registered, if you try to register the same user again you get a conflict response which indicate the you are trying to create existing data again.

HTTP/1.1 409 Conflict

```json
{
  "message": "conflict!, user already exist"
}
```

### Sign in

**Endpoint**: POST /api/signin  
Signin to have access to various endpoints.
We authenticates users by generating a JWT token stored in a cookie.  
**Example request**  
`POST /auth/signin`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Example response**

HTTP/1.1 200 OK

```json
{
  "message": "User signed in successfully"
}
```

### Sign out

**Endpoint**: GET /api/signout  
Authenticated users are signed out by clearing the JWT token stored in the cookie.  
**Example request**  
`GET /auth/signout`

**Example response**

HTTP/1.1 200 OK

```json
{
  "message": "User signed out successfully"
}
```

And if you send a GET request to the api enpoint again you will get:

HTTP/1.1 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "You are already logged out"
}
```

## Other Endpoints

### Get Real Estate Listings

Retrieve a list of real estate listings.  
**Example request**  
`GET /listings`

**Example response**

HTTP/1.1 200 OK

```json

[
	{
		"_id": "657afe6340cb6db006d8659b",
		"name": "Serene Haven",
		"description": "Spacious and peaceful villa",
		"address": "1234 Serenity Street",
		"bathrooms": 3,
		"bedrooms": 4,
		"furnished": true,
		"parking": true,
		"type": "rent",
		"imageUrls": [
			"http://listingurl.png",
			"http://listingurl.png"
		],
		"userRef": "657aed5d43d833e070e19605",
		"createdAt": "2023-12-14T13:08:51.689Z",
		"updatedAt": "2023-12-14T13:08:51.689Z",
		"__v": 0,
		"regularPrice": "$1000",
		"discountPrice": "$800"
	},
	{
		"_id": "657afe9140cb6db006d8659d",
		"name": "Cozy Cottage",
		"description": "Charming cottage with a garden",
		"address": "5678 Pleasant Lane",
		"bathrooms": 1,
		"bedrooms": 2,
		"furnished": false,
		"parking": true,
		"type": "rent",
		"imageUrls": [
			"http://listingurl.png",
			"http://listingurl.png"
		],
		"userRef": "657aed5d43d833e070e19605",
		"createdAt": "2023-12-14T13:09:37.026Z",
		"updatedAt": "2023-12-14T13:09:37.026Z",
		"__v": 0,
		"regularPrice": "$600",
		"discountPrice": "$550"
	},
	{
		"_id": "657afece40cb6db006d8659f",
		"name": "Luxury Penthouse",
		"description": "Stunning penthouse with panoramic views",
		"address": "9101 Skyline Avenue",
		"bathrooms": 3,
		"bedrooms": 3,
		"furnished": true,
		"parking": true,
		"type": "rent",
		"imageUrls": [
			"http://listingurl.png",
			"http://listingurl.png"
		],
		"userRef": "657aed5d43d833e070e19605",
		"createdAt": "2023-12-14T13:10:38.981Z",
		"updatedAt": "2023-12-14T13:10:38.981Z",
		"__v": 0,
		"regularPrice": "$2000",
		"discountPrice": "$1800"
	}
	...
]
```

The endpoint is using pagination, by default you get 12 listings per each request, so to get more listings you have to indicate the startIndex in the query parameter.  
`GET /listings?startIndex=13`

### create listing

To create a listing you have to specify the name, description, address, bathrooms, bedrooms, furnished, parking, type, imageUrls, regularPrice and discountPrice. Set discountPrice to 0 if their is no discount for your listing. For imageUrls minimum of at leaest 1 url is required and maximum is 4 urls per listing.  
So, to create your first listing send a post request to the endpoint. The request body must be a valid json data with the listing fields.  
**Example request**  
`POST /listing/create`

```json
{
  "name": "Modern Urban Haven",
  "description": "Stylish apartment in a vibrant city neighborhood",
  "address": "5253 Trendy Street",
  "regularPrice": 1100,
  "discountPrice": 1000,
  "bathrooms": "1",
  "bedrooms": "1",
  "furnished": true,
  "parking": false,
  "type": "rent",
  "imageUrls": ["http://listingurl.png", "http://listingurl.png"]
}
```

**Example response**

HTTP/1.1 200 OK

```json
{
  "message": "listing created successfully",
  "listing": {
    "name": "Modern Urban Haven",
    "description": "Stylish apartment in a vibrant city neighborhood",
    "address": "5253 Trendy Street",
    "regularPrice": 1100,
    "discountPrice": 1000,
    "bathrooms": 1,
    "bedrooms": 1,
    "furnished": true,
    "parking": false,
    "type": "rent",
    "imageUrls": ["http://listingurl.png", "http://listingurl.png"],
    "userRef": "657b00df40cb6db006d865bc",
    "_id": "657b012740cb6db006d865c1",
    "createdAt": "2023-12-14T13:20:39.296Z",
    "updatedAt": "2023-12-14T13:20:39.296Z",
    "__v": 0
  }
}
```

### update listing

**Endpoint**: POST /listings/update/{listing_id}  
Update your existing listing by it's {id}.
You can update your listing by specifying it's {id} as the url parameter where `listing_id` is the `id` of listing to update, you can get your listing `id` from the response you got when you create the listing as `_id`  
**Example request**  
`POST /listings/update/657b012740cb6db006d865c1`

```json
{
  "name": "Modern Urban Haven",
  "description": "A tranquil retreat in the midst of a vibrant city",
  "address": "4849 Skyline Avenue",
  "regularPrice": "1100",
  "discountPrice": "1000",
  "bathrooms": "1",
  "bedrooms": "1",
  "furnished": true,
  "parking": false,
  "type": "rent",
  "imageUrls": ["http://listingurl.png", "http://listingurl.png"]
}
```

**Example response**  
Now we just update the listing's description and address

HTTP/1.1 200 OK

```json
{
  "message": "listing updated successfully",
  "updatedListing": {
    "_id": "657a1b9a361787d932faa840",
    "name": "Modern Urban Haven",
    "description": "A tranquil retreat in the midst of a vibrant city",
    "address": "4849 Skyline Avenue",
    "regularPrice": 1100,
    "discountPrice": 1000,
    "bathrooms": 1,
    "bedrooms": 1,
    "furnished": true,
    "parking": false,
    "type": "rent",
    "imageUrls": ["http://listingurl.png", "http://listingurl.png"],
    "userRef": "657a1adc95c2e512d7a245b9",
    "createdAt": "2023-12-13T21:01:14.778Z",
    "updatedAt": "2023-12-13T21:03:29.185Z",
    "__v": 0
  }
}
```

### Delete Listing

**Endpoint**: DELETE /listings/delete/{listing_id}  
You can delete your listing by specifying it's {id} as the url parameter it's similar to updating a listing where `listing_id` is the `id` of the listing to delete.  
**Example request**  
`DELETE /listings/delete/657a1b9a361787d932faa840`

**Example response**

HTTP/1.1 200 OK

```json
{
  "message": "listing deleted successfully!"
}
```

### Get all your listings

**Endpoint**: GET user/listings  
Get all your listings by sending a Get request to the endpoint.  
**Example request**  
`GET /user/listings`

**Example response**

HTTP/1.1 200 OK

```json
[
	{
		"_id": "657b011140cb6db006d865bf",
		"name": "Oceanfront Paradise",
		"description": "Exquisite villa with stunning ocean views",
		"address": "3637 Coastal Drive",
		"regularPrice": 2500,
		"discountPrice": 2300,
		"bathrooms": 4,
		"bedrooms": 5,
		"furnished": true,
		"parking": true,
		"type": "rent",
		"imageUrls": [
			"http://listingurl.png",
			"http://listingurl.png"
		],
		"userRef": "657b00df40cb6db006d865bc",
		"createdAt": "2023-12-14T13:20:17.417Z",
		"updatedAt": "2023-12-14T13:20:17.417Z",
		"__v": 0
	},
	{
		"_id": "657b012740cb6db006d865c1",
		"name": "Quaint Bungalow",
		"description": "Charming bungalow in a peaceful neighborhood",
		"address": "3839 Serenity Street",
		"regularPrice": 700,
		"discountPrice": 650,
		"bathrooms": 1,
		"bedrooms": 2,
		"furnished": false,
		"parking": true,
		"type": "rent",
		"imageUrls": [
			"http://listingurl.png",
			"http://listingurl.png"
		],
		"userRef": "657b00df40cb6db006d865bc",
		"createdAt": "2023-12-14T13:20:39.296Z",
		"updatedAt": "2023-12-14T13:20:39.296Z",
		"__v": 0
	}
    ...
]
```

### Get a single listing

**Endpoint**: GET user/listing/{listing_id}  
Retrieve a single listing by it's `id`  
`listing_id` id the `id` of the listing to retrieve.  
**Example request**  
`GET user/listing/657afece40cb6db006d8659f`

**Example response**

HTTP/1.1 200 OK

```json
{
  "_id": "657afece40cb6db006d8659f",
  "name": "Luxury Penthouse",
  "description": "Stunning penthouse with panoramic views",
  "address": "9101 Skyline Avenue",
  "bathrooms": 3,
  "bedrooms": 3,
  "furnished": true,
  "parking": true,
  "type": "rent",
  "imageUrls": ["http://listingurl.png", "http://listingurl.png"],
  "userRef": "657aed5d43d833e070e19605",
  "createdAt": "2023-12-14T13:10:38.981Z",
  "updatedAt": "2023-12-14T13:10:38.981Z",
  "__v": 0,
  "regularPrice": "$2000",
  "discountPrice": "$1800"
}
```

### Update User Endpoint

you can update your email and password using this endpoint.  
**Enpoint**: PUT /user/update

**Example request**  
`PUT /user/update`

```json
{
  "email": "new_user@example.com",
  "password": "new_password123"
}
```

**Example response**

HTTP/1.1 200 OK

```json
{
  "message": "user updated successfully!",
  "response": {
    "email": "new_user@example.com",
    "createdAt": "2023-12-13T20:55:37.313Z",
    "updatedAt": "2023-12-13T20:57:15.530Z",
    "__v": 0
  }
}
```

### Error Handling

If an error occurs while processing a request, the API will return an appropriate HTTP status code along with an error message in the response body.

**Here are some common error codes you may encounter:**

`400 Bad Request:` The request is invalid or missing required parameters.  
`401 Unauthorized:` Authentication failed or JWT token missing.  
`404 Not Found:` The requested resource could not be found.  
`409 Conflict:` Trying to create existing data.  
`500 Internal Server Error:` An unexpected error occurred on the server.
