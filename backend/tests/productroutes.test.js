import request from "supertest";
import express from "express";
import router from "../routes/productRoutes.js";
import {jest} from "@jest/globals";

/* ---------------- MOCK MIDDLEWARE ---------------- */

jest.unstable_mockModule("../middleware/authMiddleware.js", () => ({
  isAuthenticated: (req, res, next) => {
    req.user = { id: 1 };
    next();
  }
}));

jest.unstable_mockModule("../middleware/multerConfig.js", () => ({
  upload: {
    array: () => (req, res, next) => next()
  }
}));

/* ---------------- MOCK CONTROLLERS ---------------- */

jest.unstable_mockModule("../controllers/productController.js", () => ({
  getSuggestedProducts: jest.fn((req, res) =>
    res.status(200).json({ message: "suggested" })
  ),
  getAllProducts: jest.fn((req, res) =>
    res.status(200).json({ message: "all products" })
  ),
  addProduct: jest.fn((req, res) =>
    res.status(201).json({ message: "product added" })
  ),
  searchProduct: jest.fn((req, res) =>
    res.status(200).json({ message: "search" })
  ),
  filterProducts: jest.fn((req, res) =>
    res.status(200).json({ message: "filter" })
  ),
  getProductById: jest.fn((req, res) =>
    res.status(200).json({ message: "product" })
  ),
  addComment: jest.fn((req, res) =>
    res.status(200).json({ message: "comment added" })
  ),
  fetchComments: jest.fn((req, res) =>
    res.status(200).json({ message: "comments" })
  ),
  giveRating: jest.fn((req, res) =>
    res.status(200).json({ message: "rating" })
  ),
  getProductRatings: jest.fn((req, res) =>
    res.status(200).json({ message: "ratings" })
  ),
  getMyProductListings: jest.fn((req, res) =>
    res.status(200).json({ message: "my listings" })
  ),
  updateProduct: jest.fn((req, res) =>
    res.status(200).json({ message: "updated" })
  ),    
  deleteProduct: jest.fn((req, res) =>
    res.status(200).json({ message: "deleted" })
  )
}));

/* ---------------- SETUP APP ---------------- */

const app = express();
app.use(express.json());
app.use("/products", router);

/* ---------------- TESTS ---------------- */

describe("Product Routes", () => {
  test("GET /products/suggested", async () => {
    const res = await request(app).get("/products/suggested");
    expect(res.status).toBe(200);
  });

  test("GET /products/buy", async () => {
    const res = await request(app).get("/products/buy");
    expect(res.status).toBe(200);
  });

  test("POST /products/add", async () => {
    const res = await request(app).post("/products/add");
    expect(res.status).toBe(201);
  });

  test("GET /products/search", async () => {
    const res = await request(app).get("/products/search");
    expect(res.status).toBe(200);
  });

  test("GET /products/1", async () => {
    const res = await request(app).get("/products/1");
    expect(res.status).toBe(200);
  });

  test("DELETE /products/1", async () => {
    const res = await request(app).delete("/products/1");
    expect(res.status).toBe(200);
  });
});
