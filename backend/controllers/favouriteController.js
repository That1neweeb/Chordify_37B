import { Favourite, Products, SongFavourite, Songs } from "../models/association.js"


// product favourite

export const addToFavourite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const product_id = req.params.id;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const existing = await Favourite.findOne({
      where: { user_id, product_id },
    });

    if (existing) {
      return res.status(400).json({ message: "Product already in favourites" });
    }

    await Favourite.create({ user_id, product_id });

    return res.status(201).json({ message: "Added to favourites" });
  } catch (e) {
    console.error("FAV ERROR:", e);
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};


export const removeFromFavourite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const product_id = req.params.id;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const favourite = await Favourite.findOne({
      where: { user_id, product_id },
    });

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }

    await favourite.destroy();
    return res.status(200).json({ message: "Removed from favourites" });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const user_id = req.user.id;

    const favourites = await Favourite.findAll({
      where: { user_id },
      include: {
        model: Products,
      },
    });

    return res.status(200).json({
      message: "Favourites fetched successfully",
      favourites,
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};


// Songs favourite

export const addSongToFavourite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const song_id = req.params.id;

    if (!song_id) {
      return res.status(400).json({ message: "Song ID is required" });
    }

    const existing = await SongFavourite.findOne({
      where: { user_id, song_id },
    });

    if (existing) {
      return res.status(400).json({ message: "Song already in favourites" });
    }

    await SongFavourite.create({ user_id, song_id });

    return res.status(201).json({ message: "Added to favourites" });
  } catch (e) {
    console.error("SONG FAV ERROR:", e);
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};

export const removeSongFromFavourite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const song_id = req.params.id;

    const fav = await SongFavourite.findOne({ where: { user_id, song_id } });
    if (!fav) return res.status(404).json({ message: "Favourite song not found" });

    await fav.destroy();
    return res.status(200).json({ message: "Song removed from favourites" });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};


export const getSongFavourites = async (req, res) => {
  try {
    const user_id = req.user.id;

    const favourites = await SongFavourite.findAll({
      where: { user_id },
      include: [{ model: Songs, required: false }] 
    });

    return res.status(200).json({ favourites });
  } catch (e) {
    console.error("getSongFavourites ERROR:", e);
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};
