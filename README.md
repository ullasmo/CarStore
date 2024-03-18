# CarStore: Car Sales and Marketplace Platform

**Overview:**
CarStore is a comprehensive platform designed for buying, selling, and exploring cars. It provides users with a seamless experience for managing listings, scheduling test drives, and interacting with other users in the car marketplace.

**Features:**
- **User Authentication and Profiles:**
  - Sign up, Sign in, and profile management.
  - Personal details, contact information, and search preferences.
- **Car Listings and Management:**
  - Detailed car listings creation and editing.
  - Status tracking (e.g., Available, Sold, Pending).
- **Car Search and Filtering:**
  - Advanced search options with customized parameters.
- **Test Drive Scheduling and Alerts:**
  - Scheduling test drives and receiving notifications.

**Database Schema:**

*Car Listing Schema:*
- make: String (required)
- model: String (required)
- year: Number
- mileage: Number
- price: Number
- images: [String] (Array of image URLs)
- owner: ObjectId (reference to User)
- status: String (e.g., Available, Sold, Pending)
- createdAt: Date
- updatedAt: Date

*Test Drive Schedule Schema:*
- car: ObjectId (reference to Car Listing)
- user: ObjectId (reference to User)
- scheduledDate: Date
- status: String (e.g., Pending, Confirmed, Completed)
- createdAt: Date
- updatedAt: Date

*User Listing Schema:*
- username: String (required)
- password: String (required)
- email: String (required)
- avthar: String
- notifications: [Notification] (Array of notification objects)
- seennotifications: [Notification] (Array of notification objects)

**Technologies Used:**
- Frontend: HTML, CSS, JavaScript, React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- UI Components: Ant Design, Tailwind CSS
- State Management: Redux
- Routing: React Router
- HTTP Requests: Fetch

**Challenges Faced:**
- Implementing real-time notifications and alerts for test drive scheduling and listing updates.
- Ensuring efficient search functionality with complex filtering options.
- Managing image uploads and storage for car listings.
- Handling user authentication and authorization securely.

By incorporating user-friendly features and robust functionalities, CarStore aims to provide a seamless and enjoyable experience for users in the car sales and marketplace domain.
