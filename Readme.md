# Ecommerce Web app

A full-stack e-commerce project where you can browse, search, add & view details of products.

Built with React frontend, Express/Node backend, Mongodb database.

---

## Demo Link

[Live Demo](https://luxlina-wrgu.vercel.app)

---

## Quick Start

```
git clone https://github.com/rahulCode1/luxlina_.git
cd luxlina_
npm install
npm start
```

---


## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
REACT_APP_BACKEND_URL=XXXXXXXX

REACT_APP_RAZORPAY_KEY_ID=XXXXXXXX

REACT_APP_RAZORPAY_KEY_SECRET=XXXXXXXX
```


---


## Technologies

- React JS
- React Router
- Node JS
- Express
- Mongodb
- JWT 

## Demo Video

Watch a walkthrough (6 minutes) of all the major features of this app:
[Google drive link](https://drive.google.com/file/d/1sRnu-lii1OZmBhoFYYujOxuP8v8na-eQ/view?usp=sharing)

---

## Features

**Home**

- Display different products category.
- Search products by title, keywords.

**Products List**

- View all products.
- Apply different filters, Sort products via price.
- Add, Remove products to Cart & Wishlist.

**Product Details**

- View Product information.
- View similar products.
- Add or Remove to Cart & Wishlist.
- Similar products
- User review

**Cart Page**

- Increase or Decrease product quantity.
- Remove from Cart.
- Move to Wishlist.

**Wishlist Page**

- All Products that added to Wishlist.
- Move product to Cart.

**Checkout Page**

- View order summary (Product that added to cart).
- Add, Select address.

**User Profile**
-- Show all User information.
-- Add, Update & delete address.
-- View & Cancel user orders.

---

## API Reference

## **GET /api/products**<br>

List all products.<br>

Sample Response:<br>

```
[
  {
    id,
    materialType,
    category,
    rating,
    variations: [
      {
        id,
        name,
        shortDescription,
        price,
        discountPrice,
        images,
        ...
      }
    ],
    ...
  }
]
```

---

## **GET /api/product/:productId**<br>

Product details.<br>

Sample Response:<br>

```
{
  id,
  materialType,
  category,
  care,
  metaTitle,
  metaDescription,
  keywords,
  rating,
  variations: [
    {
      id,
      name,
      shortDescription,
      price,
      discountPrice,
      images,
      ...
    }
  ],
  ...
}
```

---

## **POST /api/product/add**<br>

Add new product.<br>

Sample Response:<br>

```
{
  id,
  materialType,
  category,
  variations,
  ...
}
```

---

## **PATCH /api/product/:productId/variation/add**<br>

Add product variation.<br>

Sample Response:<br>

```
{
  success,
  message
}
```

---

## **DELETE /api/product/:productId/removeVariation/:variationId**<br>

Remove product variation.<br>

---

## **GET /api/product/:productId/similar**<br>

Get similar products.<br>

Sample Response:<br>

```
[
  {
    id,
    materialType,
    category,
    variations,
    ...
  },
  ...
]
```

---

## **PATCH /api/product/:productId**<br>

Update product.<br>

Sample Response:<br>

```
{
  success,
  message,
  product: {
    id,
    materialType,
    category,
    variations,
    ...
  }
}
```

## **POST /api/product/:productId/review**<br>

Add a product review.<br>

Sample Response:<br>

```
{
  success,
  message
}
```

---

## **GET /api/products/:productId/reviews**<br>

Get all product reviews.<br>

Sample Response:<br>

```
[
  {
    id,
    rating,
    reviewText,
    user,
    images,
    createdAt,
    ...
  },
  ...
]
```

<!-- ---

## **PATCH /api/product/:productId/addVideo/:variationId**<br>

Add a product video to a variation.<br>

Sample Response:<br>

```
{
  success,
  message
}
```

---

## **PATCH /api/product/:productId/deleteVideo/:variationId**<br>

Delete product video from a variation.<br>

Sample Response:<br>

```
{
  success,
  message
}
```

---

## **POST /api/product/:productId/featureVideo/:variationId**<br>

Add a feature video for a product variation.<br>

Sample Response:<br>

```
{
  success,
  message
}
```

---

## **GET /api/feature/:productId/videos**<br>

Get all feature videos of a product.<br>

Sample Response:<br>

```
[
  {
    id,
    title,
    url,
    variationId,
    uploadedBy,
    createdAt,
    ...
  },
  ...
]
```

---

## **DELETE /api/product/:productId/variation/:variationId/featureVideo/:videoId**<br>

Delete a feature video.<br>

Sample Response:<br>

```
{
  success,
  message
}
``` -->

## **POST /api/addToCart/:productId/variation/:variationId**<br>

Add product to cart.<br>

Sample Response:<br>

```
{
  success,
  message,
  cart: {
    id,
    quantity,
    product,
    selectedVariation,
    ...
  },
  quantity
}
```

---

## **GET /api/getAllCart**<br>

Get all cart items.<br>

Sample Response:<br>

```
[
  {
    id,
    quantity,
    product,
    selectedVariation,
    createdAt,
    ...
  },
  ...
]
```

---

## **PATCH /api/increase/:productId/variation/:variationId**<br>

Increase product quantity.<br>

Sample Response:<br>

```
{
  success,
  message,
  productId,
  variationId
}
```

---

## **PATCH /api/decrease/:productId/variation/:variationId**<br>

Decrease product quantity.<br>

Sample Response:<br>

```
{
  success,
  message,
  productId,
  variationId
}
```

---

## **PATCH /api/remove/:productId/variation/:variationId**<br>

Remove product from cart.<br>

Sample Response:<br>

```
{
  success,
  message,
  productId,
  variationId
}
```

---

## **PATCH /api/moveto_wishlist/:productId/variation/:variationId**<br>

Move product from cart to wishlist.<br>

Sample Response:<br>

```
{
  success,
  message,
  productId,
  variationId
}
```

---

## **GET /api/getAllWishlist**<br>

Get all wishlist items.<br>

Sample Response:<br>

```
[
  {
    id,
    quantity,
    product,
    selectedVariation,
    createdAt,
    ...
  },
  ...
]
```

---

## **POST /api/addToWishlist/:productId/variation/:variationId**<br>

Add product to wishlist.<br>

Sample Response:<br>

```
{
  message,
  wishlist: {
    id,
    product,
    selectedVariation,
    createdAt,
    ...
  }
}
```

---

## **DELETE /api/removeFromWishlist/:productId/variation/:variationId**<br>

Remove product from wishlist.<br>

Sample Response:<br>

```
{
  message,
  productId,
  variationId
}
```

---

## **PATCH /api/moveToCart/:productId/variation/:variationId**<br>

Move product from wishlist to cart.<br>

Sample Response:<br>

```
{
  success,
  message,
  productId,
  variationId
}
```

## **POST /api/address/new**<br>

Add new Address<br>
Sample Response<br>

```
[{name, phoneNumber, zipCode,  ...}, ...]
```

## **GET /api/address/:id**<br>

Get user addresses<br>
Sample Response<br>

```
[{name, phoneNumber, zipCode,  ...}, ...]
```

## **GET /api/address/address_info/id**<br>

Get user addresses information<br>
Sample Response<br>

```
{name, phoneNumber, zipCode,  ...}
```

## **PATCH /api/address/update/:id/default**<br>

Update default address.<br>
Sample Response<br>

```
{name, phoneNumber, isDefault,  ...}
```

## **PATCH /api/address/update/:id**<br>

Update address.<br>
Sample Response<br>

```
{name, phoneNumber, isDefault,  ...}
```

## **POST /api/placeOrder**<br>

Place order from cart.<br>

Sample Response:<br>

```
{
  success,
  message,
  order: {
    id,
    products,
    address,
    summary,
    paymentMethod,
    paymentStatus,
    orderStatus,
    ...
  }
}
```

---

## **GET /api/getUserOrders**<br>

Get all user orders.<br>

Sample Response:<br>

```
[
  {
    id,
    products: [
      {
        product,
        selectedVariation,
        ...
      }
    ],
    address,
    summary,
    paymentMethod,
    paymentStatus,
    orderStatus,
    createdAt,
    ...
  },
  ...
]
```

---

## **GET /api/:orderId/details**<br>

Get order details.<br>

Sample Response:<br>

```
{
  id,
  products: [
    {
      product,
      selectedVariation,
      ...
    }
  ],
  address,
  summary,
  paymentMethod,
  paymentStatus,
  orderStatus,
  orderPlacedBy,
  createdAt,
  ...
}
```

---

## **PATCH /api/:orderId/cancel**<br>

Cancel order.<br>

Sample Response:<br>

```
{
  success,
  message,
  orderId
}
```

<!-- ---

## **POST /api/create-order**<br>

Create Razorpay order.<br>

Sample Response:<br>

```
{
  id,
  amount,
  currency,
  receipt,
  status,
  ...
}
```

---

## **POST /api/verify-payment**<br>

Verify Razorpay payment.<br>

Sample Response:<br>

```
{
  success,
  message,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
}
``` -->

---

## **POST /api/addItemToBuyNow/:productId/:variationId**<br>

Add item to Buy Now.<br>

Sample Response:<br>

```
{
  success,
  message,
  order: {
    id,
    product,
    variation,
    quantity,
    ...
  }
}
```

---

## **GET /api/getBuyNowItem/:variationId**<br>

Get Buy Now item.<br>

Sample Response:<br>

```
{
  success,
  message,
  item: {
    id,
    product,
    quantity,
    selectedVariation,
    ...
  }
}
```

---

## **POST /api/placeOrderViaBuyNow**<br>

Place order using Buy Now.<br>

Sample Response:<br>

```
{
  success,
  message,
  orderId
}
```

---

## **GET /api/allOrders**<br>

Get all orders.<br>

Sample Response:<br>

```
[
  {
    id,
    products,
    summary,
    address,
    paymentMethod,
    paymentStatus,
    orderStatus,
    orderPlacedBy,
    createdAt,
    ...
  },
  ...
]
```

## **POST /api/send-otp**<br>

Send OTP to user's phone number.<br>

Sample Response:<br>

```
{
  message
}
```

---

## **POST /api/verify-otp**<br>

Verify OTP and login/register user.<br>

Sample Response:<br>

```
{
  success,
  token,
  user: {
    userId,
    name,
    phoneNumber
  }
}
```

---

## **GET /api/userDetails**<br>

Get logged in user details.<br>

Sample Response:<br>

```
{
  success,
  message,
  user: {
    id,
    name,
    phoneNumber,
    reviews,
    createdAt,
    ...
  }
}
```

## Contact

For bugs or feature request, please reach out to rahul7497678@gmail.com
