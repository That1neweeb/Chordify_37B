import { Products } from "./productModel.js";
import { GuitarDetails } from "./guitarDetailsModel.js";

Products.hasOne(GuitarDetails, {
    foreignKey: 'product_id',
    as: 'guitarDetails',
    onDelete: 'CASCADE'
})

GuitarDetails.belongsTo(Products, {
    foreignKey: 'product_id'
})

export {
  Products,
  GuitarDetails,
};