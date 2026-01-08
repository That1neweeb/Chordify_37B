import { Products } from "./productModel.js";
import { GuitarDetails } from "./guitarDetailsModel.js";
import { Users } from "./userModel.js"
import { Cart } from "./cartModel.js";
import { CartItem } from "./cartItemModel.js";

//Product and GuitarDetails relationship
Products.hasOne(GuitarDetails, {
    foreignKey: 'product_id',
    as: 'guitarDetails',
    onDelete: 'CASCADE'
})

GuitarDetails.belongsTo(Products, {
    foreignKey: 'product_id'
})


//Users and cart relationship
Users.hasOne(Cart, {
  foreignKey: 'user_id',
  as: 'cart',
  onDelete:'CASCADE'
})

Cart.belongsTo(Users, {
  foreignKey: 'user_id'
});

//Cart and CartItem relationship
CartItem.belongsTo(Cart, {
  foreignKey: 'cart_id'
})

Cart.hasMany(CartItem, {
  foreignKey: 'cart_id'
})

// Product and CartItem relationship
Products.hasMany(CartItem, {
  foreignKey: 'product_id'
});

CartItem.belongsTo(Products, {
  foreignKey: 'product_id'
});



export {
  Products,
  GuitarDetails,
};