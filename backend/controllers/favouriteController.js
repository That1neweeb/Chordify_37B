import { Favourite } from "../models/association.js";
import { Products } from "../models/association.js";

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
