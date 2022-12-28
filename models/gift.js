const mongoose = require('mongoose');
var Schema = mongoose.Schema;

(Giftschema = new Schema({
  // unique_id: Number,
  nameGift: String,
  // imageGift: {
  //data: Buffer,
  //contentType: String,
  //},
  priceGift: String,
  categoryGift: String,
})),
  (Gift = mongoose.model('product', Giftschema));

module.exports = Gift;
