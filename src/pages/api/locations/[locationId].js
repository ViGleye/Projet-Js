import { mw } from "@/api/mw"
import {
  readLocation,
  updateLocations,
  deleteLocation,
} from "@/db/crud"

const handle = mw(async (req, res) => {
  const { locationId } = req.query

  if (req.method === "GET") {
    const location = await readLocation(locationId)

    if (!location) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(location)

    return
  }

  if (req.method === "PATCH") {
    const location = await updateLocations(locationId, req.body.values)

    if (!location) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(location)

    return
  }

  if (req.method === "DELETE") {
    const locationToBeDelete = await deleteLocation(locationId)

    if (!locationToBeDelete) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(locationToBeDelete)

    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
