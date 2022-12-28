const mongoose = require('mongoose');
var Schema = mongoose.Schema;

(GiftPschema = new Schema({
  // unique_id: Number,
  nameGiftP: String,
  // imageGiftP: {
  //data: Buffer,
  //contentType: String,
  //},
  priceGiftP: String,
  categoryGiftP: String,
})),
  (GiftP = mongoose.model('productP', GiftPschema));

module.exports = GiftP;
