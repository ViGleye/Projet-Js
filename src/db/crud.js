import { LocationsModel } from "./Model/LocationsModel.js"

export const createLocations = async (input) => {
  const newLocations = new LocationsModel(input)

  await newLocations.save()

  return newLocations
}
export const readLocations = async () => await LocationsModel.find()
export const readLocation = async (locationsId) =>
  await LocationsModel.findById(locationsId)
export const updateLocations = async (locationId, input) => {
  const updatedLocations = await LocationsModel.findByIdAndUpdate(
    locationId,
    input,
    {
      returnDocument: "after",
    }
  )

  return updatedLocations
}
export const deleteLocation = async (locationId) => {
  const location = await LocationsModel.findOneAndDelete({ _id: locationId })

  if (!location) {
    return null
  }

  return location
}
