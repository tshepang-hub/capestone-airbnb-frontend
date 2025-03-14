Airbnb Clone Frontend
This project is the frontend of an Airbnb clone application. It is built using React and interacts with a backend server via RESTful APIs. The frontend handles user authentication, displays accommodations, and manages reservations.

How It Works
1. User Authentication
Login and Registration: Users can register a new account or log in to an existing one. Upon successful login or registration, a JSON Web Token (JWT) is received from the backend.
Storing the JWT: The token is stored in a cookie using js-cookie. This token is used to authenticate subsequent requests to the backend, ensuring that only logged-in users can access certain features.
2. Fetching Data
Axios for API Requests: Axios is used to make HTTP requests to the backend API. It sends requests to endpoints to retrieve, create, update, or delete data.
Protected Routes: Certain routes, such as viewing your reservations or creating a listing, require the user to be authenticated. The token is automatically included in these requests.
3. Managing Accommodations
List Accommodations: Users can view a list of available accommodations. This list is fetched from the backend using a GET request to the /api/accommodations endpoint.
Create Accommodation: Authenticated users can create a new accommodation listing. The listing is posted to the backend and stored in the database.
Delete Accommodation: Authenticated users can delete their own listings. This sends a DELETE request to the backend with the accommodation ID.
4. Managing Reservations
Create Reservation: Users can book an accommodation by creating a reservation. This involves selecting dates and specifying the number of guests. The reservation details are sent to the backend.
View Reservations: Users can view their own reservations, and hosts can view reservations for their accommodations. This data is retrieved using GET requests to the relevant endpoints.
5. Notifications
React Toastify: The app uses React Toastify to display notifications to the user. For example, when a user logs in successfully, a success message is shown. If an error occurs, an error notification is displayed.
Conclusion
This Airbnb clone frontend interacts with a backend server to provide a complete user experience. It handles user authentication, data fetching, and management, while keeping the user informed through notifications. By using React, Axios, and other modern tools, the frontend ensures a smooth and responsive interface for managing accommodations and reservations.
