import { Products } from "./productModel.js";
import { GuitarDetails } from "./guitarDetailsModel.js";
import { Users } from "./userModel.js";
import { Cart } from "./cartModel.js";
import { CartItem } from "./cartItemModel.js";
import { Comment } from "./commentModel.js";
import { Songs } from "./songModel.js";
import { Favourite } from "./favouriteModel.js";
import { Rating } from "./ratingModel.js";
import { Order } from "./orderModel.js";
import { OrderItem } from "./orderItem.js";
import { SongFavourite } from "./songFavouriteModel.js";


// Product and GuitarDetails relationship
Products.hasOne(GuitarDetails, {
  foreignKey: "product_id",
  as: "guitarDetails",
  onDelete: "CASCADE",
});

GuitarDetails.belongsTo(Products, {
  foreignKey: "product_id",
});

//User and Cart relationship
Users.hasOne(Cart, {
  foreignKey: "user_id",
  as: "cart",
  onDelete: "CASCADE",
});

Cart.belongsTo(Users, {
  foreignKey: "user_id",
});

// Cart and CartItem relationship
Cart.hasMany(CartItem, {
  foreignKey: "cart_id",
  onDelete: "CASCADE",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cart_id",
});

// Product and CartItem relationship
Products.hasMany(CartItem, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

CartItem.belongsTo(Products, {
  foreignKey: "product_id",
});

// User and Comment relationship
Users.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Users, {
  foreignKey: "user_id",
});

// Product and Comment relationship
Products.hasMany(Comment, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Products, {
  foreignKey: "product_id",
});

// User and Rating relationship

Users.hasMany(Rating, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Rating.belongsTo(Users, {
  foreignKey: "user_id",
});

// Product and Rating relationship

Products.hasMany(Rating, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

Rating.belongsTo(Products, {
  foreignKey: "product_id",
});


// Products and User relationship through favourite

Users.belongsToMany(Products, {
  through: Favourite,
  foreignKey: "user_id",
  otherKey: "product_id",
});


Users.hasMany(Favourite, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});


Favourite.belongsTo(Users, {
  foreignKey: "user_id",
});

Products.belongsToMany(Users, {
  through: Favourite,
  foreignKey: "product_id",
  otherKey: "user_id",
});

// Product and Favourite Product relationship
Products.hasMany(Favourite, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

Favourite.belongsTo(Products, {
  foreignKey: "product_id",
});

// User and Order relationship
Users.hasMany(Order, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Order.belongsTo(Users, {
  foreignKey: "user_id",
});


// Order and OrderItem relationship

Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
});

// Product and OrderItem relationship

Products.hasMany(OrderItem, {
  foreignKey: "product_id",
});

OrderItem.belongsTo(Products, {
  foreignKey: "product_id",
});

// Song and Favourite relationship

SongFavourite.belongsTo(Songs, { 
  foreignKey: "song_id" 
});

Songs.hasMany(SongFavourite, { 
  foreignKey: "song_id" 
});

// User ↔ Song through SongFavourite
Users.belongsToMany(Songs, {
  through: SongFavourite,
  foreignKey: "user_id",
  otherKey: "song_id",
});

Users.hasMany(SongFavourite, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

SongFavourite.belongsTo(Users, {
  foreignKey: "user_id",
});

Songs.belongsToMany(Users, {
  through: SongFavourite,
  foreignKey: "song_id",
  otherKey: "user_id",
});


Users.belongsToMany(Songs, { through: SongFavourite, foreignKey: "user_id", otherKey: "song_id" });
Songs.belongsToMany(Users, { through: SongFavourite, foreignKey: "song_id", otherKey: "user_id" });




export {
  Products,
  GuitarDetails,
  CartItem,
  Cart,
  Users,
  Comment,
  Songs,
  Favourite,
  Rating,
  Order,
  OrderItem,
  SongFavourite
};
