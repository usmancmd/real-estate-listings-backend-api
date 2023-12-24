# Real Estate Listings API Documentation

Welcome to the documentation for the Real Estate Listings API. This API
provides access to various endpoints that allow you to retrieve real estate
listing data.

## Description

The Real Estate Listings API provides developers with real-time access to
comprehensive real estate market data, including property listings, prices,
and details. Enhance your real estate applications with up-to-date information
and improve user experiences.

## Base URL

The base URL for all API endpoints is:
[https://rel-api.onrender.com](https://rel-api.onrender.com)

## API Version

The current version of the API is: `version 1.0.0`

## Authentication Endpoints

All endpoints except for the sign-up and sign-in routes require authentication
using a JWT token.

### Sign up

**Endpoint:** `POST /auth/signup`

Registers a new user by sending a post request to the endpoint. The request
body must be valid JSON data with the required fields email and password.

```json
{
	"email": "user@example.com",
	"password": "password123"
}
```

#### Sign up example response

`HTTP/1.1 201 Created`

```json
{
	"message": "User registered successfully"
}
```

Once a user is registered, if you try to register the same user again you get a
conflict response which indicates that you are trying to create existing user
again.

[`HTTP/1.1 409 Conflict`](#error-handling)

```json
{
	"message": "conflict!, user already exist"
}
```

### Sign in

**Endpoint:** `POST /api/signin`

Sign-in to have access to various endpoints.
We authenticate users by generating a JWT token stored in a cookie.

```json
{
	"email": "user@example.com",
	"password": "password123"
}
```

#### Sign in example response

`HTTP/1.1 200 OK`

```json
{
	"message": "User signed in successfully",
	"email": "user@example.com"
}
```

### Sign out

**Endpoint:** `GET /api/signout`

Authenticated users are signed out by clearing the JWT token stored in the
cookie.

#### Sign out example response

`HTTP/1.1 200 OK`

```json
{
	"message": "User signed out successfully"
}
```

And if you send a GET request to the API endpoint again, you will get:

[`HTTP/1.1 401 Unauthorized`](#error-handling)

```json
{
	"error": "Unauthorized",
	"message": "You are already logged out"
}
```

## Other Endpoints

### Get Real Estate Listings

**Endpoint:** `GET /listings`

Retrieve a list of real estate listings without being authenticated.

#### Get listings example response

`HTTP/1.1 200 OK`

```json
[
	{
		"_id": "658012b8ae632ffe6a4765e2",
		"name": "Serene Haven",
		"description": "Spacious and peaceful villa",
		"address": "1234 Serenity Street",
		"regularPrice": "$1000",
		"discountPrice": "$800",
		"bathrooms": 3,
		"bedrooms": 4,
		"furnished": true,
		"parking": true,
		"type": "rent",
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"createdAt": "2023-12-18T09:36:56.052Z",
		"updatedAt": "2023-12-18T09:36:56.052Z",
		"__v": 0
	},
	{
		"_id": "658012e3ae632ffe6a4765e5",
		"name": "Cozy Cottage",
		"description": "Charming cottage with a garden",
		"address": "5678 Pleasant Lane",
		"regularPrice": "$4600",
		"discountPrice": "$550",
		"bathrooms": 1,
		"bedrooms": 2,
		"furnished": false,
		"parking": true,
		"type": "rent",
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"createdAt": "2023-12-18T09:37:39.463Z",
		"updatedAt": "2023-12-18T09:37:39.463Z",
		"__v": 0
	},
	{
		"_id": "6580130bae632ffe6a4765e8",
		"name": "Luxury Penthouse",
		"description": "Stunning penthouse with panoramic views",
		"address": "9101 Skyline Avenue",
		"regularPrice": "$2000",
		"discountPrice": "$800",
		"bathrooms": 3,
		"bedrooms": 3,
		"furnished": true,
		"parking": true,
		"type": "rent",
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"createdAt": "2023-12-18T09:38:19.612Z",
		"updatedAt": "2023-12-18T09:38:19.612Z",
		"__v": 0
	},
	{
		"_id": "65801382ae632ffe6a4765ee",
		"name": "Family Home",
		"description": "Comfortable home for a growing family",
		"address": "1415 Harmony Lane",
		"regularPrice": "$1500",
		"discountPrice": "$400",
		"bathrooms": 2,
		"bedrooms": 3,
		"furnished": false,
		"parking": true,
		"type": "rent",
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"createdAt": "2023-12-18T09:40:18.896Z",
		"updatedAt": "2023-12-18T09:40:18.896Z",
		"__v": 0
	},
	{
		"_id": "658013b8ae632ffe6a4765f1",
		"name": "Seaside Retreat",
		"description": "Relaxing beachfront villa",
		"address": "1617 Ocean View Drive",
		"regularPrice": "$1200",
		"discountPrice": "$100",
		"bathrooms": 4,
		"bedrooms": 5,
		"furnished": true,
		"parking": true,
		"type": "sale",
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"createdAt": "2023-12-18T09:41:12.350Z",
		"updatedAt": "2023-12-18T09:41:12.350Z",
		"__v": 0
	},
	{
		"_id": "658015166b802d6c0ccf1798",
		"name": "Rustic Cabin",
		"description": "Cozy log cabin in the woods",
		"address": "1819 Woodland Lane",
		"regularPrice": "$1500",
		"discountPrice": "$450",
		"bathrooms": 1,
		"bedrooms": 2,
		"furnished": false,
		"parking": true,
		"type": "sale",
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"createdAt": "2023-12-18T09:47:02.979Z",
		"updatedAt": "2023-12-18T09:47:02.979Z",
		"__v": 0
	}
	"_more..."
]
```

The endpoint is using pagination. By default, you get 12 listings per request.
To get more listings, you have to indicate the `startIndex` in the query
parameter like this `GET /listings?startIndex=13`.

### Create A Listing

**Endpoint:** `POST listings/create`

To create a listing, you have to specify the required fields.
Set`discountPrice`to 0 if there is no discount for your listing.
For`imageUrls`, a minimum of at least 1 URL is required and a maximum of
4 URLs per listing.  
To create your first listing, send a post request to the endpoint.
The request body must be valid JSON data with the listing fields.

```json
{
	"name": "Modern Urban Haven",
	"description": "Stylish apartment in a vibrant city neighborhood",
	"address": "5253 Trendy Street",
	"regularPrice": "$1100",
	"discountPrice": "$100",
	"bathrooms": "1",
	"bedrooms": "1",
	"furnished": true,
	"parking": false,
	"type": "rent",
	"imageUrls": ["http://listingurl.png", "http://listingurl.png"]
}
```

#### Create a listing example response

`HTTP/1.1 200 OK`

```json
{
	"message": "listing created successfully",
	"response": {
		"name": "Modern Urban Haven",
		"description": "Stylish apartment in a vibrant city neighborhood",
		"address": "5253 Trendy Street",
		"regularPrice": "$1100",
		"discountPrice": "$100",
		"bathrooms": 1,
		"bedrooms": 1,
		"furnished": true,
		"parking": false,
		"type": "rent",
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"_id": "658019f5096a4b04dd8814bf",
		"createdAt": "2023-12-18T10:07:49.442Z",
		"updatedAt": "2023-12-18T10:07:49.442Z",
		"__v": 0
	}
}
```

You will notice that some fields are added to the listing,
they are additional informations to keep track of the listing.

If the listing is created successfully and you try to create the same listing
again you will get a conflict response which indicates that you are trying to
create a listing that exist.

[`HTTP/1.1 409 Conflict`](#error-handling)

```json
{
	"message": "conflict!, user already exist"
}
```

### Update Listing

**Endpoint:** `POST /listings/update/listing_id`

You can update your listing by specifying its `id` as the URL parameter where
`listing_id` is the `id` of the listing to update. You can get your listing
`id` from the response you got when you created the listing as `_id`.
You can just specify the field you want to update. For example, the below code
only updates the `description` and `address` fields.

```json
{
	"description": "A tranquil retreat in the midst of a vibrant city",
	"address": "4849 Skyline Avenue"
}
```

#### Update listing example response

`HTTP/1.1 200 OK`

```json
{
	"message": "listing updated successfully",
	"updatedListing": {
		"_id": "657a1b9a361787d932faa840",
		"name": "Modern Urban Haven",
		"description": "A tranquil retreat in the midst of a vibrant city",
		"address": "4849 Skyline Avenue",
		"regularPrice": "$1100",
		"discountPrice": "$100",
		"bathrooms": 1,
		"bedrooms": 1,
		"furnished": true,
		"parking": false,
		"type": "rent",
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"createdAt": "2023-12-13T21:01:14.778Z",
		"updatedAt": "2023-12-13T21:03:29.185Z",
		"__v": 0
	}
}
```

### Delete Listing

**Endpoint:** `DELETE /listings/delete/listing_id`

You can delete your listing by specifying its `id` as the URL parameter it's
similar to updating a listing where `listing_id` is the `id` of the listing
to delete.

#### Delete listing example response

`HTTP/1.1 200 OK`

```json
{
	"message": "listing deleted successfully!"
}
```

### Get User listings

**Endpoint:** `GET user/listings`

Get all your listings by sending a Get request to the endpoint.

#### Get user listings example response

`HTTP/1.1 200 OK`

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
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
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
		"imageUrls": ["http://listingurl.png", "http://listingurl.png"],
		"createdAt": "2023-12-14T13:20:39.296Z",
		"updatedAt": "2023-12-14T13:20:39.296Z",
		"__v": 0
	}
]
```

### Get a listing

**Endpoint:** GET `user/listing/listing_id`

Retrieve a single listing by its `id`  
where `listing_id` is the `id` of the listing to retrieve.

#### Get listing example response

`HTTP/1.1 200 OK`

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
	"createdAt": "2023-12-14T13:10:38.981Z",
	"updatedAt": "2023-12-14T13:10:38.981Z",
	"__v": 0,
	"regularPrice": "$2000",
	"discountPrice": "$1800"
}
```

### Update User Endpoint

**Endpoint:** `PUT /user/update`

you can update your email and password using this endpoint.

```json
{
	"email": "new_user@example.com",
	"password": "new_password123"
}
```

#### Update user example response

`HTTP/1.1 200 OK`

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
