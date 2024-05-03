import { mw } from "@/api/mw"
import { readLocations, createLocations } from "@/db/crud"

const handle = mw(async (req, res) => {
  const data = req.body

  if (req.method === "GET") {
    const locations = await readLocations(data)

    res.send(locations)

    return
  }

  if (req.method === "POST") {
    const newlocations = await createLocations(data.values)
    res.send(newlocations)

    
return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
