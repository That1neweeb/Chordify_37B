import express from "express";
import request from "supertest";
import { jest } from "@jest/globals";

/* =========================
   Mock Controllers
========================= */
jest.unstable_mockModule("../controllers/songController.js", () => ({
  getRecommendedSongs: jest.fn((req, res) =>
    res.status(200).json({ message: "recommended" })
  ),
  getSongContent: jest.fn((req, res) =>
    res.status(200).json({ message: "song content" })
  ),
  searchSongs: jest.fn((req, res) =>
    res.status(200).json({ message: "search results" })
  ),
  setFavourite: jest.fn((req, res) =>
    res.status(200).json({ message: "added to favourite" })
  ),
  getMyFavourites: jest.fn((req, res) =>
    res.status(200).json({ message: "my favourites" })
  ),
  isFavourite: jest.fn((req, res) =>
    res.status(200).json({ data: true })
  ),
}));

/* =========================
   Mock Auth Middleware
========================= */
jest.unstable_mockModule("../middleware/authMiddleware.js", () => ({
  isAuthenticated: jest.fn((req, res, next) => {
    req.user = { id: 1 }; // fake logged-in user
    next();
  }),
}));

/* =========================
   Import router AFTER mocks
========================= */
const songRoutes = (await import("../routes/songs.js")).default;

/* =========================
   Setup Express App
========================= */
const app = express();
app.use(express.json());
app.use("/songs", songRoutes);

/* =========================
   Tests
========================= */
describe("Song Routes", () => {

  test("GET /songs/recommended", async () => {
    const res = await request(app).get("/songs/recommended");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("recommended");
  });

  test("GET /songs/getSongContent/:id", async () => {
    const res = await request(app).get("/songs/getSongContent/5");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("song content");
  });

  test("GET /songs/searchSong", async () => {
    const res = await request(app)
      .get("/songs/searchSong")
      .query({ search: "rock" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("search results");
  });

  test("POST /songs/:id/addFavourite (protected)", async () => {
    const res = await request(app).post("/songs/3/addFavourite");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("added to favourite");
  });

  test("GET /songs/getFavourites (protected)", async () => {
    const res = await request(app).get("/songs/getFavourites");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("my favourites");
  });

  test("GET /songs/:id/isFavourite (protected)", async () => {
    const res = await request(app).get("/songs/2/isFavourite");

    expect(res.status).toBe(200);
    expect(res.body.data).toBe(true);
  });
});
