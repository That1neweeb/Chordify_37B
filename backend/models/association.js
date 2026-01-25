import { Products } from "./productModel.js";
import { GuitarDetails } from "./guitarDetailsModel.js";
import { Users } from "./userModel.js"
import { Cart } from "./cartModel.js";
import { CartItem } from "./cartItemModel.js";
import { Comment } from "./commentModel.js";
import { Songs } from "./songModel.js";
import { Favourite } from "./favouriteModel.js";
import { Rating } from "./ratingModel.js";

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


// User and Comment relationship
Comment.belongsTo(Users, {
  foreignKey: 'user_id'
});

Users.hasMany(Comment, {
  foreignKey:"user_id"
});

// User and Rating relationship
Rating.belongsTo(Users, { 
  foreignKey: "user_id" 
});

Users.hasMany(Rating, { 
  foreignKey: "user_id" 
});

// Product and Rating relationship
Rating.belongsTo(Products, { 
  foreignKey: "product_id" 
});

Products.hasMany(Rating, { 
  foreignKey: "product_id" 
});


// User and Favourites relationship
Users.belongsToMany(Products, { 
    through: Favourite, 
    foreignKey: "user_id", 
    otherKey: "product_id" 
});

Users.hasMany(Favourite, { 
  foreignKey: "user_id" 
});

Favourite.belongsTo(Users, { 
  foreignKey: "user_id" 
});

// Products and Favourites relationship
Products.belongsToMany(Users, { 
    through: Favourite, 
    foreignKey: "product_id", 
    otherKey: "user_id" 
});

Products.hasMany(Favourite, { 
  foreignKey: "product_id" 
});

Favourite.belongsTo(Products, { 
  foreignKey: "product_id" 
});




export {
  Products,
  GuitarDetails,
  CartItem,
  Cart,
  Users,
  Comment,
  Songs,
  Favourite,
  Rating
};