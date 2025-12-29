
import { Products } from '../models/productModel.js';
import { GuitarDetails } from '../models/guitarDetailsModel.js';
import { Op } from 'sequelize';


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
        const { name, brand, price, condition, rating, category, type } = req.body;

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
