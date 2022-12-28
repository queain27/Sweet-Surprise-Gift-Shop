const mongoose = require('mongoose');
var Schema = mongoose.Schema;

(GiftMschema = new Schema({
  // unique_id: Number,
  nameGiftM: String,
  // imageGift: {
  //data: Buffer,
  //contentType: String,
  //},
  priceGiftM: String,
  categoryGiftM: String,
})),
  (GiftM = mongoose.model('productM', GiftMschema));

module.exports = GiftM;
