const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    weight: {
      value: {
        type: Number,
        required: true,
        min: 0,
      },
      unit: {
        type: String,
        required: true,
        enum: ["kg", "g", "lbs"],
        default: "kg",
      },
    },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingCost: {
      type: Number,
      default: 50,
      min: 0,
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    // Razorpay fields
    razorpayOrderId: {
      type: String,
      required: false,
    },
    razorpayPaymentId: {
      type: String,
      required: false,
    },
    razorpaySignature: {
      type: String,
      required: false,
    },
    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    paidAt: {
      type: Date,
      required: false,
    },
    deliveredAt: {
      type: Date,
      required: false,
    },
    // Additional fields
    notes: {
      type: String,
      trim: true,
    },
    trackingNumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for order total with shipping
orderSchema.virtual("finalTotal").get(function () {
  return this.totalAmount + this.shippingCost;
});

// Virtual for formatted order ID
orderSchema.virtual("orderNumber").get(function () {
  return `AAI${this._id.toString().slice(-8).toUpperCase()}`;
});

// Index for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ razorpayOrderId: 1 });
orderSchema.index({ razorpayPaymentId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });

// Pre-save middleware to validate total amount
orderSchema.pre("save", function (next) {
  if (
    this.isNew ||
    this.isModified("items") ||
    this.isModified("totalAmount")
  ) {
    let calculatedItemsTotal = 0;
    this.items.forEach((item) => {
      calculatedItemsTotal += item.price * item.quantity;
    });

    // Calculate expected total including shipping
    const expectedTotal = calculatedItemsTotal + (this.shippingCost || 0);

    console.log("💰 Order validation:", {
      itemsTotal: calculatedItemsTotal,
      shippingCost: this.shippingCost || 0,
      expectedTotal,
      actualTotal: this.totalAmount,
      difference: Math.abs(expectedTotal - this.totalAmount),
    });

    // Allow small rounding differences (up to 1 rupee)
    const tolerance = 1;
    if (Math.abs(this.totalAmount - expectedTotal) > tolerance) {
      const error = new Error(
        `Total amount validation failed. Expected: ₹${expectedTotal} (Items: ₹${calculatedItemsTotal} + Shipping: ₹${
          this.shippingCost || 0
        }), Received: ₹${this.totalAmount}`
      );
      console.error("❌ Order validation error:", error.message);
      return next(error);
    }

    console.log("✅ Order total validation passed");
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
