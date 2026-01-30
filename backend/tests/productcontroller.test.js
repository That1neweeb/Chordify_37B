import { jest } from "@jest/globals";

/* =========================
   Mock fs (file deletion)
========================= */
jest.unstable_mockModule("fs", () => ({
  unlink: jest.fn((path, cb) => cb && cb(null)),
}));

/* =========================
   Mock JWT
========================= */
jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: jest.fn(() => ({ id: 1 })),
  },
}));

/* =========================
   Mock Sequelize Models
========================= */
jest.unstable_mockModule("../models/association.js", () => ({
  Products: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Users: {},
  GuitarDetails: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Comment: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
  Rating: {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  },
}));

/* =========================
   Import AFTER mocks
========================= */
const {
  getAllProducts,
  getProductById,
  addProduct,
  searchProduct,
  addComment,
  fetchComments,
  getMyProductListings,
  deleteProduct,
} = await import("../controllers/productController.js");

const {
  Products,
  GuitarDetails,
  Comment,
} = await import("../models/association.js");

/* =========================
   Test Helpers
========================= */
const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
});

describe("Product Controller Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* =========================
     getAllProducts
  ========================= */
  test("getAllProducts - success", async () => {
    Products.findAll.mockResolvedValue([{ id: 1 }]);

    const req = {};
    const res = mockRes();

    await getAllProducts(req, res);

    expect(Products.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* =========================
     getProductById
  ========================= */
  test("getProductById - not found", async () => {
    Products.findOne.mockResolvedValue(null);

    const req = { params: { id: 5 } };
    const res = mockRes();

    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("getProductById - guitar product", async () => {
    Products.findOne.mockResolvedValue({
      id: 1,
      category: "guitar",
      dataValues: {},
    });

    GuitarDetails.findOne.mockResolvedValue({ type: "electric" });

    const req = { params: { id: 1 } };
    const res = mockRes();

    await getProductById(req, res);

    expect(GuitarDetails.findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* =========================
     addProduct
  ========================= */
  test("addProduct - missing images", async () => {
    const req = {
      headers: { authorization: "Bearer token" },
      body: { name: "Guitar" },
      files: [],
    };
    const res = mockRes();

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("addProduct - success guitar", async () => {
    Products.create.mockResolvedValue({ id: 10 });
    GuitarDetails.create.mockResolvedValue({});

    const req = {
      headers: { authorization: "Bearer token" },
      body: {
        name: "Guitar",
        brand: "Fender",
        price: 1000,
        condition: "new",
        category: "guitar",
        type: "electric",
        description: "Nice guitar",
      },
      files: [{ filename: "img.png", path: "x" }],
    };
    const res = mockRes();

    await addProduct(req, res);

    expect(Products.create).toHaveBeenCalled();
    expect(GuitarDetails.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  /* =========================
     searchProduct
  ========================= */
  test("searchProduct - empty search", async () => {
    const req = { query: { search: "" } };
    const res = mockRes();

    await searchProduct(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });

  /* =========================
     addComment
  ========================= */
  test("addComment - success", async () => {
    Comment.create.mockResolvedValue({ id: 1 });

    const req = {
      headers: { authorization: "Bearer token" },
      params: { id: 5 },
      body: { comment_text: "Nice product" },
    };
    const res = mockRes();

    await addComment(req, res);

    expect(Comment.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* =========================
     fetchComments
  ========================= */
  test("fetchComments - success", async () => {
    Comment.findAll.mockResolvedValue([]);

    const req = { params: { id: 1 } };
    const res = mockRes();

    await fetchComments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* =========================
     getMyProductListings
  ========================= */
  test("getMyProductListings - empty", async () => {
    Products.findAll.mockResolvedValue([]);

    const req = { user: { id: 1 } };
    const res = mockRes();

    await getMyProductListings(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* =========================
     deleteProduct
  ========================= */
  test("deleteProduct - not found", async () => {
    Products.findOne.mockResolvedValue(null);

    const req = { params: { id: 1 }, user: { id: 1 } };
    const res = mockRes();

    await deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
