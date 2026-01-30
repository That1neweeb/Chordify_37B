import { Products, Rating, Users, GuitarDetails, Comment } from '../models/association.js';
import { Op, Sequelize } from 'sequelize';
import jwt from "jsonwebtoken";
import fs from "fs";


//to get all the products which are approved
export const getAllProducts = async (req,res) => {
    try {
        const products = await Products.findAll({
            where: { status: "approved" },  // only approved products
            include: {
                model: GuitarDetails,
                as: 'guitarDetails',
                attributes: ['type']
            },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).send({data: products, message: "Products fetched successfully"});
    } catch(e) {
        res.status(500).send({ message: "Server error", error: e.message });
    }
}

export const getProductById = async(req,res) => {
    try {
        const { id } = req.params;
        const product = await Products.findOne({where: {id}});
        
        if(!product) {
            return res.status(404).send({message: "Product not found"})
        }

        if(product.category === "guitar") {
            const guitarDetail = await GuitarDetails.findOne({where:{id}});
            product.dataValues.guitarDetail = guitarDetail;
        }
        res.status(200).send({data: product, message: "Product fetched successfully"})
    } catch(e) {
        res.status(500).send({message: "Server error", error: e.message});
    }
}

export const getSuggestedProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      limit: 4,
      include: [{
        model: GuitarDetails,
        as: 'guitarDetails',
        attributes: ['type']
      }],
      order: [['createdAt', 'DESC']] // latest products
    });

    res.status(200).send({
      data: products,
      message: "Suggested products successfully fetched"
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server error", error: e.message });
  }
};

//helper function if the db error or any other error occurs it will delete the uploaded 

const deleteUploadedFiles = (files) => {
  if (!files || files.length === 0) return;

  files.forEach(file => {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Failed to delete file:", file.path);
      }
    });
  });
};

export const addProduct = async (req, res) => {
  try {
      console.log("REQ.BODY:", req.body);
      console.log("REQ.FILES:", req.files);

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const user = jwt.verify(token, process.env.secretkey);
    console.log(user);
    

    const { name, brand, price, condition, category, type, description } = req.body;

    // Validate images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Validations
    if (!name || name.trim() === "") {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: "Product name is required" });
    }

    if (!brand || brand.trim() === "") {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: "Brand is required" });
    }

    if (!condition || condition.trim() === "") {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: "Condition is required" });
    }

    if (!category || category.trim() === "") {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: "Category is required" });
    }

    if (category === "guitar" && (!type || type.trim() === "")) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: "Guitar type is required" });
    }

    if (!description || description.trim() === "") {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: "Description is required" });
    }

    if (!price || isNaN(price)) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: "Price must be a number" });
    }

    const image_urls = req.files.map(file => `/uploads/products/${file.filename}`);

    // Create product
    const product = await Products.create({
      name,
      brand,
      price,
      condition,
      category,
      image_urls,
      description,
      user_id: user.id,
      status: "pending"
    });

    // Guitar-specific details
    if (category === "guitar") {
      await GuitarDetails.create({
        product_id: product.id,
        type
      });
    }

    res.status(201).json({
      message: "Product submitted successfully and is pending approval",
      product
    });

  } catch (err) {
    console.error("Add product error:", err);
    deleteUploadedFiles(req.files);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search || search.trim() === "") {
      return res.status(200).json({ data: [], message: "No search term provided" });
    }

    const products = await Products.findAll({
      where: {
        status: "approved", // <-- Only approved products
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { brand: { [Op.iLike]: `%${search}%` } },
          { category: { [Op.iLike]: `%${search}%` } },
        ],
      },
    });

    res.status(200).json({
      data: products,
      message: "Search results fetched successfully",
    });
  } catch (e) {
    console.error("Search error:", e);
    res.status(500).json({ message: "Search failed" });
  }
};




export const addComment = async (req, res) => {
  try {
   

    const user_id = req.user.id; 
    const { comment_text } = req.body;
    const product_id = req.params.id;

    if (!product_id) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comment = await Comment.create({
      comment_text,
      user_id,
      product_id
    });

    return res.status(200).json({
      message: "Comment added successfully",
      comment
    });

  } catch (e) {
    return res.status(500).json({
      message: "Server error",
      error: e.message
    });
  }
};

export const fetchComments = async(req,res) => {
  try {
    const { id } = req.params
    const comments = await Comment.findAll({
      where: { product_id : id },
      include: [
        {
          model: Users,
          attributes: ["full_name"]
        }
      ]
      
    });

    res.status(200).json({message:"Comments fetched successfully", data: comments});
  } catch(e) {
    return res.status(500).json({message: "Server error : ", error: e.message})
  }
}

export const giveRating = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { rating_point } = req.body;
    const product_id = req.params.id;

    if (!product_id) return res.status(404).json({ message: "Product not found" });
    if (!rating_point || rating_point < 1 || rating_point > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    let rating = await Rating.findOne({ where: { user_id, product_id } });

    if (rating) {
      rating.rating_point = rating_point;
      await rating.save();
    } else {
      rating = await Rating.create({ rating_point, user_id, product_id });
    }

    // Calculate average
    const ratings = await Rating.findAll({ where: { product_id } });
    const average = ratings.reduce((sum, r) => sum + r.rating_point, 0) / ratings.length;

    return res.status(200).json({
      message: rating ? "Rating updated" : "Rating added successfully",
      rating,
      average: parseFloat(average.toFixed(1)), // rounded 1 decimal
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};




export const getProductRatings = async (req, res) => {
  try {
    const product_id = req.params.id;
    
    const ratings = await Rating.findAll({
      where: { product_id },
      attributes: ["rating_point"]
    });
    
    if (ratings.length === 0) {
      return res.status(200).json({ average: 0, totalRatings: 0 });
    }
    
    const total = ratings.reduce((sum, r) => sum + r.rating_point, 0);
    const average = total / ratings.length;
    
    return res.status(200).json({
      average: parseFloat(average.toFixed(1)), 
      totalRatings: ratings.length
    });
  } catch (e) {
    console.error("Error fetching ratings:", e);
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};


export const getMyProductListings = async (req, res) => {
    try {
      
        // comes from isAuthenticated middleware
        const user_id = req.user.id;


        const products = await Products.findAll({
            where: { 
                user_id,
                status: { [Op.in]: ["pending", "approved"] }  // exclude rejected products
            },
            order: [["createdAt", "DESC"]]
        });


        if (!products || products.length === 0) {
            return res.status(200).json({ message: "No products found", data: [] });
        }

        return res.status(200).json({
            message: "Successfully fetched your listings",
            data: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const { name, brand, price, description, existingImages } = req.body;

    // Find product owned by user
    const product = await Products.findOne({ where: { id, user_id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found or not yours" });
    }

    // Parse existingImages if sent as JSON string
    let imagesToKeep = [];
    if (existingImages) {
      imagesToKeep = Array.isArray(existingImages)
        ? existingImages
        : JSON.parse(existingImages);
    }

    // Handle new uploaded files
    const newImages = req.files
      ? req.files.map((file) => `/uploads/products/${file.filename}`)
      : [];

    // Delete only removed images from disk
    const removedImages = product.image_urls.filter(
      (img) => !imagesToKeep.includes(img)
    );
    deleteProductImages(removedImages);

    // Merge existing images + new uploads
    const finalImages = [...imagesToKeep, ...newImages];

    // Update product
    await product.update({
      name,
      brand,
      price,
      description,
      image_urls: finalImages,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.error("Update product error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};




// Helper to delete uploaded images from disk
const deleteProductImages = (imageUrls) => {
  if (!imageUrls || !Array.isArray(imageUrls)) return;

  imageUrls.forEach((url) => {
    const filePath = `./backend${url}`; // adjust if needed
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete image:", filePath, err);
      });
    }
  });
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // Find product owned by user
    const product = await Products.findOne({ where: { id, user_id } });
    if (!product)
      return res.status(404).json({ message: "Product not found or not yours" });

    // Delete dependent rows first
    await Rating.destroy({ where: { product_id: id } });
    await Comment.destroy({ where: { product_id: id } });
    await GuitarDetails.destroy({ where: { product_id: id } });

    // Delete uploaded images from disk
    deleteProductImages(product.image_urls);

    // Delete product
    await product.destroy();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const filterProducts = async (req, res) => {
  try {
    const { category, brand, condition, minPrice, maxPrice, minRating, maxRating } = req.query;

    // Base product filter
    const productFilter = {
      status: "approved", // <-- Only approved products
    };

    if (brand) productFilter.brand = { [Op.iLike]: `%${brand}%` };
    if (condition) productFilter.condition = condition;
    if (minPrice || maxPrice) {
      productFilter.price = {
        ...(minPrice && { [Op.gte]: Number(minPrice) }),
        ...(maxPrice && { [Op.lte]: Number(maxPrice) }),
      };
    }
    if (category && category !== "guitar") {
      productFilter.category = category; // filter accessories or other categories
    }

    // GuitarDetails include (only join if category is guitar)
    const include = [];
    if (category === "guitar" || !category) {
      include.push({
        model: GuitarDetails,
        as: "guitarDetails",
        required: category === "guitar",
      });
    }

    // Include Ratings for avg calculation
    include.push({
      model: Rating,
      attributes: [],
    });

    // Build HAVING clause dynamically
    const havingConditions = [];
    if (minRating) havingConditions.push(Sequelize.literal(`AVG("Ratings"."rating_point") >= ${minRating}`));
    if (maxRating) havingConditions.push(Sequelize.literal(`AVG("Ratings"."rating_point") <= ${maxRating}`));

    const groupBy = ["Products.id"];
    if (category === "guitar" || !category) groupBy.push("guitarDetails.id");

    const products = await Products.findAll({
      where: productFilter,
      include,
      attributes: {
        include: [[Sequelize.fn("AVG", Sequelize.col("Ratings.rating_point")), "avgRating"]],
      },
      group: groupBy,
      having: havingConditions.length > 0 ? Sequelize.and(...havingConditions) : undefined,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      data: products,
      message: "Filtered products fetched successfully",
    });
  } catch (e) {
    console.error("Filter products error:", e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};