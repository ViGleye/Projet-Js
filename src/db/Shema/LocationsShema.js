import { Schema } from "mongoose"

export const LocationsSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: Number, required: true },
  country: { type: String },
  cityCode: { type: String },
  restaurantType: { type: String },
  typeOfBar: { type: String },
  typeOfParc: { type: String },
  typesOfArt: { type: String },
  ArtisticCurrent: { type: String },
  isFree: { type: Boolean },
  isPrivate: { type: Boolean },
  stars: { type: Number, min: 1, max: 3 },
  price: { type: Number, min: 1, max: 5 },
  prices: { type: Number },
})
