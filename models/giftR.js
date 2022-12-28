const mongoose = require('mongoose');
var Schema = mongoose.Schema;

(GiftRschema = new Schema({
  // unique_id: Number,
  nameGiftR: String,
  // imageGift: {
  //data: Buffer,
  //contentType: String,
  //},
  priceGiftR: String,
  categoryGiftR: String,
})),
  (GiftR = mongoose.model('productR', GiftRschema));

module.exports = GiftR;
