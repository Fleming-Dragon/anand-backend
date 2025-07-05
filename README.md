# Anand Agro Industry - Backend API

This is the backend API for the Anand Agro Industry e-commerce website, built with Node.js, Express, and MongoDB.

## 🏗️ Project Structure

```
backend/
├── config/          # Configuration files
│   ├── config.js    # Application configuration
│   └── database.js  # MongoDB connection
├── controllers/     # Route controllers
│   ├── contactController.js
│   ├── productController.js
│   ├── reviewController.js
│   └── testimonialController.js
├── middleware/      # Custom middleware
│   ├── auth.js      # Authentication middleware
│   ├── errorHandler.js
│   └── rateLimiter.js
├── models/          # Mongoose models
│   ├── Contact.js
│   ├── Product.js
│   ├── Review.js
│   └── Testimonial.js
├── routes/          # API routes
│   ├── contact.js
│   ├── products.js
│   ├── reviews.js
│   └── testimonials.js
├── services/        # Business logic services
│   └── emailService.js
├── utils/           # Utility functions
│   ├── helpers.js
│   └── seeder.js    # Database seeder
├── validators/      # Input validation
│   ├── contactValidator.js
│   ├── productValidator.js
│   ├── reviewValidator.js
│   └── testimonialValidator.js
├── uploads/         # File uploads
├── tests/           # Test files
├── .env.example     # Environment variables template
├── package.json
└── server.js        # Main server file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository and navigate to backend**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your configurations:

   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/anand-agro
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start MongoDB** (if using local installation)

   ```bash
   mongod
   ```

5. **Seed the database** (optional - adds sample data)

   ```bash
   npm run seed
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

## 🚀 Deployment

### Render Deployment

This backend is configured for easy deployment on Render. See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Render:**

1. Push your code to a Git repository
2. Create a new Web Service on Render
3. Set the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add your environment variables
5. Deploy!

### Environment Variables for Production

Copy the variables from `.env.production` to your Render service environment variables.

**Required Environment Variables:**
- `NODE_ENV=production`
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure JWT secret
- `FRONTEND_URL` - Your frontend domain
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins

## 📋 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## 🔗 API Endpoints

### Products

- `GET /api/products` - Get all products (with filtering, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured` - Get featured products

### Reviews

- `GET /api/reviews/product/:productId` - Get reviews for a product
- `POST /api/reviews` - Create a new review
- `GET /api/reviews` - Get all reviews (admin)

### Testimonials

- `GET /api/testimonials` - Get approved testimonials
- `GET /api/testimonials/featured` - Get featured testimonials
- `POST /api/testimonials` - Submit new testimonial

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `GET /api/contact/:id` - Get single contact submission (admin)
- `PUT /api/contact/:id/status` - Update contact status (admin)

### Health Check

- `GET /api/health` - API health status

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request rate limiting per IP
- **Input Validation**: Joi validation for all inputs
- **Error Handling**: Centralized error handling
- **Environment Variables**: Sensitive data protection

## 🔄 Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Contact Form**: 5 submissions per hour per IP
- **Reviews**: 3 submissions per hour per IP
- **Testimonials**: 2 submissions per day per IP

## 📧 Email Configuration

The application uses Nodemailer for sending emails. Configure the following environment variables:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@anandagro.com
```

For Gmail, you'll need to:

1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `EMAIL_PASS`

## 🗄️ Database Models

### Product

- Basic product information
- Categories, pricing, stock
- Images and features
- Nutritional information
- SEO fields
- Rating aggregation

### Review

- Product reviews and ratings
- Approval system
- Email validation
- Helpful votes tracking

### Testimonial

- Customer testimonials
- Featured testimonials
- Approval and ordering system

### Contact

- Contact form submissions
- Status tracking
- Priority levels
- Admin notes

## 🔍 Validation

All API endpoints include comprehensive input validation using express-validator:

- **Email format validation**
- **Required field validation**
- **Length constraints**
- **Type validation**
- **Custom business logic validation**

## 🚨 Error Handling

The API includes centralized error handling for:

- **Validation errors**: 400 Bad Request
- **Not found errors**: 404 Not Found
- **Database errors**: 500 Internal Server Error
- **Authentication errors**: 401 Unauthorized
- **Authorization errors**: 403 Forbidden

## 📊 Sample Data

The seeder script (`utils/seeder.js`) includes:

- 7 sample products across 3 categories
- 4 featured testimonials
- Sample reviews for products
- Proper relationships between models

Run the seeder with:

```bash
node utils/seeder.js
```

## 🔧 Development Tips

1. **Database Connection**: Ensure MongoDB is running before starting the server
2. **Environment Variables**: Copy `.env.example` to `.env` and configure
3. **API Testing**: Use tools like Postman or Thunder Client
4. **Logs**: Check console for detailed error messages in development
5. **CORS**: Frontend URL must match `FRONTEND_URL` in environment

## 📈 Production Deployment

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Configure proper JWT secrets
4. Set up SSL/TLS
5. Configure reverse proxy (nginx)
6. Set up proper logging
7. Configure email service

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper validation for new endpoints
3. Include error handling
4. Update this README if needed
5. Test all endpoints before submitting

## 📄 License

This project is licensed under the MIT License.
