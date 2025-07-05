const mongoose = require("mongoose");
const Product = require("../models/Product");
const Review = require("../models/Review");
const Testimonial = require("../models/Testimonial");
const connectDB = require("../config/database");
require("dotenv").config();

// Sample products data
const products = [
  {
    name: "Pure Organic Jaggery Block",
    category: "jaggery-blocks",
    description:
      "Traditional hand-made jaggery blocks crafted using age-old methods. Rich in minerals and completely chemical-free.",
    price: 120,
    weight: { value: 1, unit: "kg" },
    images: [
      {
        url: "/images/jaggery-block-1.jpg",
        alt: "Pure Organic Jaggery Block",
        isPrimary: true,
      },
    ],
    features: [
      "100% Organic",
      "Chemical-free",
      "Rich in minerals",
      "Traditional process",
    ],
    nutritionalInfo: {
      calories: 383,
      carbohydrates: "98.0g",
      sugar: "84.0g",
      protein: "0.4g",
      fat: "0.1g",
      fiber: "0g",
      minerals: ["Iron", "Magnesium", "Potassium", "Manganese"],
    },
    stock: 100,
    averageRating: 4.8,
    reviewCount: 45,
    seo: {
      metaTitle: "Pure Organic Jaggery Block - Chemical Free | Anand Agro",
      metaDescription:
        "Buy pure organic jaggery blocks made using traditional methods. Chemical-free, rich in minerals and perfect for healthy cooking.",
      keywords: [
        "organic jaggery",
        "chemical free jaggery",
        "traditional jaggery blocks",
      ],
    },
  },
  {
    name: "Premium Jaggery Block",
    category: "jaggery-blocks",
    description:
      "Premium quality jaggery blocks with enhanced sweetness and purity. Perfect for daily cooking and health benefits.",
    price: 150,
    weight: { value: 1, unit: "kg" },
    images: [
      {
        url: "/images/premium-jaggery-block.jpg",
        alt: "Premium Jaggery Block",
        isPrimary: true,
      },
    ],
    features: [
      "Premium Quality",
      "Enhanced Sweetness",
      "Health Benefits",
      "Daily Use",
    ],
    nutritionalInfo: {
      calories: 383,
      carbohydrates: "98.0g",
      sugar: "84.0g",
      protein: "0.4g",
      fat: "0.1g",
      fiber: "0g",
      minerals: ["Iron", "Magnesium", "Potassium", "Manganese"],
    },
    stock: 75,
    averageRating: 4.9,
    reviewCount: 32,
  },
  {
    name: "Fine Jaggery Powder",
    category: "jaggery-powder",
    description:
      "Finely ground jaggery powder ideal for quick dissolution in beverages and cooking. Maintains all nutritional benefits.",
    price: 130,
    weight: { value: 500, unit: "g" },
    images: [
      {
        url: "/images/jaggery-powder.jpg",
        alt: "Fine Jaggery Powder",
        isPrimary: true,
      },
    ],
    features: ["Quick Dissolving", "Fine Texture", "Nutritional", "Versatile"],
    nutritionalInfo: {
      calories: 383,
      carbohydrates: "98.0g",
      sugar: "84.0g",
      protein: "0.4g",
      fat: "0.1g",
      fiber: "0g",
      minerals: ["Iron", "Magnesium", "Potassium", "Manganese"],
    },
    stock: 150,
    averageRating: 4.7,
    reviewCount: 28,
  },
  {
    name: "Instant Jaggery Powder",
    category: "jaggery-powder",
    description:
      "Ultra-fine jaggery powder for instant mixing. Perfect for tea, coffee, and quick recipes.",
    price: 140,
    weight: { value: 500, unit: "g" },
    images: [
      {
        url: "/images/instant-jaggery-powder.jpg",
        alt: "Instant Jaggery Powder",
        isPrimary: true,
      },
    ],
    features: ["Ultra-fine", "Instant Mix", "Tea & Coffee", "Quick Recipes"],
    nutritionalInfo: {
      calories: 383,
      carbohydrates: "98.0g",
      sugar: "84.0g",
      protein: "0.4g",
      fat: "0.1g",
      fiber: "0g",
      minerals: ["Iron", "Magnesium", "Potassium", "Manganese"],
    },
    stock: 120,
    averageRating: 4.6,
    reviewCount: 19,
  },
  {
    name: "Coconut Jaggery Cubes",
    category: "flavored-cubes",
    description:
      "Delicious jaggery cubes infused with natural coconut flavor. A healthy snack option for the entire family.",
    price: 180,
    weight: { value: 250, unit: "g" },
    images: [
      {
        url: "/images/coconut-jaggery-cubes.jpg",
        alt: "Coconut Jaggery Cubes",
        isPrimary: true,
      },
    ],
    features: [
      "Coconut Flavor",
      "Natural Taste",
      "Healthy Snack",
      "Family Pack",
    ],
    nutritionalInfo: {
      calories: 400,
      carbohydrates: "96.0g",
      sugar: "82.0g",
      protein: "0.6g",
      fat: "1.2g",
      fiber: "0.8g",
      minerals: ["Iron", "Magnesium", "Potassium", "Manganese"],
    },
    stock: 80,
    averageRating: 4.8,
    reviewCount: 24,
  },
  {
    name: "Elaichi Jaggery Cubes",
    category: "flavored-cubes",
    description:
      "Premium jaggery cubes with aromatic cardamom (elaichi) flavor. Traditional taste with modern convenience.",
    price: 190,
    weight: { value: 250, unit: "g" },
    images: [
      {
        url: "/images/elaichi-jaggery-cubes.jpg",
        alt: "Elaichi Jaggery Cubes",
        isPrimary: true,
      },
    ],
    features: [
      "Cardamom Flavor",
      "Aromatic",
      "Traditional Taste",
      "Premium Quality",
    ],
    nutritionalInfo: {
      calories: 390,
      carbohydrates: "97.0g",
      sugar: "83.0g",
      protein: "0.5g",
      fat: "0.8g",
      fiber: "0.5g",
      minerals: ["Iron", "Magnesium", "Potassium", "Manganese"],
    },
    stock: 60,
    averageRating: 4.9,
    reviewCount: 31,
  },
  {
    name: "Badishep Jaggery Cubes",
    category: "flavored-cubes",
    description:
      "Unique jaggery cubes with badishep (fennel) flavor. Known for digestive properties and refreshing taste.",
    price: 185,
    weight: { value: 250, unit: "g" },
    images: [
      {
        url: "/images/badishep-jaggery-cubes.jpg",
        alt: "Badishep Jaggery Cubes",
        isPrimary: true,
      },
    ],
    features: [
      "Fennel Flavor",
      "Digestive Properties",
      "Refreshing",
      "Unique Taste",
    ],
    nutritionalInfo: {
      calories: 385,
      carbohydrates: "97.5g",
      sugar: "83.5g",
      protein: "0.4g",
      fat: "0.6g",
      fiber: "0.3g",
      minerals: ["Iron", "Magnesium", "Potassium", "Manganese"],
    },
    stock: 50,
    averageRating: 4.7,
    reviewCount: 18,
  },
];

// Sample testimonials data
const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    message:
      "Anand Agro jaggery brings back memories of my grandmother's cooking. Pure, natural, and incredibly delicious!",
    isApproved: true,
    isFeatured: true,
    displayOrder: 1,
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    message:
      "Amazing quality products! The coconut jaggery cubes are my family's favorite healthy snack.",
    isApproved: true,
    isFeatured: true,
    displayOrder: 2,
  },
  {
    name: "Meera Patel",
    location: "Ahmedabad, Gujarat",
    rating: 4,
    message:
      "Great alternative to refined sugar. Love the traditional taste and health benefits.",
    isApproved: true,
    isFeatured: true,
    displayOrder: 3,
  },
  {
    name: "Arjun Singh",
    location: "Pune, Maharashtra",
    rating: 5,
    message:
      "Excellent packaging and fast delivery. The elaichi flavor is absolutely divine!",
    isApproved: true,
    isFeatured: true,
    displayOrder: 4,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Testimonial.deleteMany({});

    console.log("🗑️  Cleared existing data");

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Seeded ${createdProducts.length} products`);

    // Insert testimonials
    const createdTestimonials = await Testimonial.insertMany(testimonials);
    console.log(`✅ Seeded ${createdTestimonials.length} testimonials`);

    // Create sample reviews for products
    const sampleReviews = [
      {
        product: createdProducts[0]._id,
        name: "Priya Sharma",
        email: "priya@example.com",
        rating: 5,
        title: "Excellent Quality",
        comment:
          "Pure and natural taste reminds me of my grandmother's cooking. Highly recommended!",
        isApproved: true,
      },
      {
        product: createdProducts[0]._id,
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        rating: 4,
        title: "Good Product",
        comment: "Good quality product with fast delivery and nice packaging.",
        isApproved: true,
      },
      {
        product: createdProducts[4]._id,
        name: "Meera Patel",
        email: "meera@example.com",
        rating: 5,
        title: "Kids Love It",
        comment:
          "Love the coconut flavor! My kids enjoy these cubes as a healthy snack.",
        isApproved: true,
      },
      {
        product: createdProducts[5]._id,
        name: "Arjun Singh",
        email: "arjun@example.com",
        rating: 5,
        title: "Perfect for Festivals",
        comment:
          "Perfect cardamom flavor. Great for festive occasions and daily use!",
        isApproved: true,
      },
    ];

    const createdReviews = await Review.insertMany(sampleReviews);
    console.log(`✅ Seeded ${createdReviews.length} reviews`);

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

// Run seeder
if (require.main === module) {
  seedData();
}

module.exports = seedData;
