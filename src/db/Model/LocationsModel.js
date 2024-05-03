import mongoose from "mongoose"
import { LocationsSchema } from "@/db/Shema/LocationsShema"

export const LocationsModel =
  mongoose.models.locations || mongoose.model("locations", LocationsSchema)
