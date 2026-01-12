
import { Products } from '../models/productModel.js';
import { Users } from '../models/userModel.js';
import { GuitarDetails } from '../models/guitarDetailsModel.js';
import { Op } from 'sequelize';
import { Comment } from '../models/commentModel.js'
import jwt from "jsonwebtoken";
import { error } from 'console';

//to get all the products
export const getAllProducts = async (req,res) => {
    try {
        const products = await Products.findAll({
              include: {
                model: GuitarDetails,
                as: 'guitarDetails',
                attributes: ['type']
            }
    });
        res.status(200).send({data: products, message: "Products fetched successfully"})
    } catch(e) {
        res.status(500).send(e)
        
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
export const getSuggestedProducts = async (req,res) => {
    try {
        const products = await Products.findAll({
            order: [['rating', 'DESC']],
            limit: 4,
            include: {
                GuitarDetails,
                as: 'guitarDetails',
                attributes: ['type']
            }
        });
        res.status(200).send({data: products, message: "Suggested products successfully fetched"})
    } catch(e) {
        res.status(500).send(e)   
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, brand, price, condition, rating, category, type, description } = req.body;

        if(category === 'guitar' && !type) {
            return res.status(400).json({message: "Guitar type is required"});
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }

        const image_urls = req.files.map(file => `/uploads/${file.filename}`);

        // Create product
        const product = await Products.create({
            name,
            brand,
            price,
            condition,
            rating,
            category,
            image_urls, 
            description
        });

        // If category is guitar, create guitar details
        if (category === 'guitar') {
            await GuitarDetails.create({
                product_id: product.id,
                type
            });
        }

        res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (err) {
        console.error("Database error: " + err);
        res.status(500).json({ message: "Server error" });
    }


}

export const searchProduct = async (req,res) => {
    try {
        const { search } = req.query

        if(!search || search.trim() === "") {
            return res.status(200).json([]);
        }

        const products = await Products.findAll({
            where: {
                [Op.or] : [
                    {name: {[Op.iLike]: `%${search}%`}},
                    {brand: {[Op.iLike]: `%${search}%`}},
                    {category: {[Op.iLike]: `%${search}%`}},
                ]
            }
        })
        
        res.status(200).json(products);
       
    } catch(e) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
    }
}




export const addComment = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const { comment_text } = req.body;
    const product_id = req.params.id;

    if (!product_id) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comment = await Comment.create({
      comment_text,
      user_id: user.id,
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