# CarStore - Server

Application that lets the user book a car, and see car specifications. CarStore integrates all information related to booking a car, such as seeing other users' reviews for each car, car review videos from youtube, dealer location, etc.

### Main features:
- Register function
- Login function
- Login using Google OAuth
- Product list to show all available products
- Product detail page (show reviews, youtube videos for this product (youtube API), and product detail)
- Booking product 5% from product price (payment using midtrans)
- Send email after customer pay booking fee (nodemailer)
- Show selected dealers location
- Show dealers phone number
- Show all my cars (cars that already booked and paid)
- Edit profile (first name, last name, email, phone number, and password)
- Show all transactions done by user (status: canceled, pending, paid)

## Tech stack

Client: Vue, Pinia, Tailwind, Leaflet, Midtrans,
Youtube API, Google Oauth

Server: PostgreSQL, Express, Sequelize, JWT, BcryptJs, Midtrans

## Credits
- Flaticon (All logo)
- Unsplash (Picture assets)
- Pixabay (Picture assets)
- HyperUI

## [Client Repository](https://github.com/joshnatanael/p2-iproject-client)
