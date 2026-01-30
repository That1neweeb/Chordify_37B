import { jest } from "@jest/globals";

jest.unstable_mockModule("../models/association.js", () => ({
  Songs: {
    findAll: jest.fn(),
    findOne: jest.fn(),
  },
  Users: {
    findByPk: jest.fn(),
  },
  FavouriteSongs: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const {
  getRecommendedSongs,
  getSongContent,
  searchSongs,
  setFavourite,
  getMyFavourites,
  isFavourite,
} = await import("../controllers/songController.js");

const { Songs, Users, FavouriteSongs } = await import("../models/association.js");


describe("Song Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      user: { id: 1 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    jest.clearAllMocks();
  });

  // ===============================
  // getRecommendedSongs
  // ===============================
  test("getRecommendedSongs - success", async () => {
    Songs.findAll.mockResolvedValue([{ id: 1, title: "Song 1" }]);

    await getRecommendedSongs(req, res);

    expect(Songs.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      data: [{ id: 1, title: "Song 1" }],
      message: "Songs successfully fetched",
    });
  });

  // ===============================
  // getSongContent
  // ===============================
  test("getSongContent - success", async () => {
    req.params.id = 10;
    Songs.findOne.mockResolvedValue({ id: 10, title: "Test Song" });

    await getSongContent(req, res);

    expect(Songs.findOne).toHaveBeenCalledWith({ where: { id: 10 } });
    expect(res.send).toHaveBeenCalledWith({
      data: { id: 10, title: "Test Song" },
      message: "Song content fetched successfully",
    });
  });

  // ===============================
  // searchSongs
  // ===============================
  test("searchSongs - returns songs", async () => {
    req.query.search = "rock";
    Songs.findAll.mockResolvedValue([{ title: "Rock Song" }]);

    await searchSongs(req, res);

    expect(Songs.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      data: [{ title: "Rock Song" }],
      message: "Songs fetched successfully",
    });
  });

  test("searchSongs - empty search", async () => {
    req.query.search = "";

    await searchSongs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  // ===============================
  // setFavourite
  // ===============================
  test("setFavourite - add to favourites", async () => {
    req.params.id = 5;
    FavouriteSongs.findOne.mockResolvedValue(null);

    await setFavourite(req, res);

    expect(FavouriteSongs.create).toHaveBeenCalledWith({
      user_id: 1,
      song_id: 5,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("setFavourite - remove from favourites", async () => {
    req.params.id = 5;

    FavouriteSongs.findOne.mockResolvedValue({
      destroy: jest.fn(),
    });

    await setFavourite(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Song removed from favourites",
    });
  });

  // ===============================
  // getMyFavourites
  // ===============================
  test("getMyFavourites - success", async () => {
    Users.findByPk.mockResolvedValue({
      favouriteSongs: [{ id: 1, title: "Fav Song" }],
    });

    await getMyFavourites(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ id: 1, title: "Fav Song" }],
      message: "Favourites fetched successfully",
    });
  });

  // ===============================
  // isFavourite
  // ===============================
  test("isFavourite - true", async () => {
    req.params.id = 7;
    FavouriteSongs.findOne.mockResolvedValue({ id: 1 });

    await isFavourite(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: true,
      message: "Song is favourite",
    });
  });

  test("isFavourite - false", async () => {
    req.params.id = 7;
    FavouriteSongs.findOne.mockResolvedValue(null);

    await isFavourite(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: false,
      message: "Song is not favourite",
    });
  });
});
