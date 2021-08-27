Midterm for Lighthouse Labs
=========

# Taco Empire Project

Taco Empire is a multi-page food ordering app for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. The restaurant will receive a SMS notification when an order has been placed and the client will receive a SMS notification of the pick up time forMulti-page app with added single-page functionality using AJAX. their order will be ready via Twilio API.

This repository was created using a node skeleton from Lighthouse Labs. We have cloned there starter repository and used it to practice HTML, CSS, SASS, Bootstrap, jQuery and AJAX front end skills, and our Node, Express and Postgress back-end skills.

## App Functions

The app includes the following functionality:
- Multi-page app with added single-page functionality using AJAX.
- Uses Twilio API to text the restaurant when an order has been placed.
- Uses Twilio API to text the client when the restaurant has updated the preperation time. This text includes:
  - The clients name
  - The order number
  - The amount of time it will take to prepare the order
- Responsive design for mobile/tablet/desktop
- Communicates with the server via AJAX and HTTP request
- Communicates with the database using PG Native API
- Creates cookies for users on login and deletes them on logout
- Nav Bar:
  - is fixed to the top
  - has padding on both side
  - contains the Taco Empire logo in the top left
  - contains links for Current Orders and Order Now
  - contains buttons for register and login when user is not logged in
  - contains button for logout when the user is logged in
  - changes to hamburger menu for tablet and mobile
  - is styled using flexbox and bootstrap
- Footer Bar:
  - contains the address, email and phone number for the restaurant
  - contains icons for links to Facebook, Twitter and Instagram
  - is styled using flexbox
- Index Page:
  - contains Taco Empire logo in center top of page
  - contains a carousel of menu items below
  - responsive design for mobile/tablet/desktop
  - order buttons in carousel redirect to login page when not logged in and to order now page when logged in.
  - is styled using flexbox
- Order Page:
  - uses css styling to create a menu and an order summary box.
  - Order Summary Box:
    - single page funtionality using AJAX
    - items ordered, price and total update via AJAX
    - allows user to remove items ordered and updates via AJAX
    - place order button sends order to database and sends SMS message to restaurant via Twilio API and then redirects you to current ordrers page.
  - Menu Item Box:
    - displays a picture of the menu item
    - gives a price and description of the menu item
    - allows user to input a number by typing or clicking the counter arrows
    - add button uses AJAX to update the order summary box.
- Current Orders Page:
  - uses flexbox to create a box for the client current orders
  - Your Orders Box:
    - queries the database to display all of the current users orders that have not been marked as completed
    - updates to remove any order that the restaurant has marked as picked up
    - refresh button refreshes the page to update the table
- Owners Page:
  - Only accessible using the owners login information
  - uses flexbox to create to boxes for orders awaiting response and responded orders.
  - Orders Awaiting Response Box:
    - queries the database for all orders that have no duration assigned to them and displays them
    - allows restaurant to specify the prep time using keyboard or by clicking the counter arrows
    - submit button updates the database and refreshes the page
    - submit button sends a SMS message via Twilio API to the client containing the clients name, order number and time needed to prepare their order.
  - Responded Orders Box:
    - queries the database for all orders that have a duration but the value for completed_at is set to NULL and display them
    - completed at button allows restaurant to update the database for orders that have been picked up and removes them from the table

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
  - DB_PORT = 5432
  - TWILIO_ACCOUNT_SID = [your twilio SID]
  - TWILIO_AUTH_TOKEN = [your twilio Token]
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

Please note: 
 - To see the owners page you will need to login as 1@example.com with any password
 - You can log in with any other email and password to be logged in as user 2
 - The owners page needs to be refreshed to see new orders
 - The app has been setup to work on the local time of the server, if you need to convert from UTC some of the database queries will need to be adjusted

  ## Screenshots

!["Screenshot of character counter"](/public/images/ss-index-mobile.png)
###### Index page mobile version 

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.



## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Body-parser 1.19.0 or above
- Chalk 2.4.2 or above
- Cookie-session 1.4.0 or above
- Dotenv 2.0.0 or above
- Ejs 2.6.2 or above
- Express 4.17.1 or above
- Morgan 1.9.1 or above
- Node-sass-middleware 0.11.0 or above
- PG-native" 3.0.0 or above
- Twilio 3.67.0 or above

## Dev Dependencies
- nodemon 1.19.1 or above
