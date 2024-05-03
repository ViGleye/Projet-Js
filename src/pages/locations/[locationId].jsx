import axios from "axios"
import { useRouter } from "next/router"
import Button from "@/components/Button"
export const getServerSideProps = async ({ params }) => {
  const response = await axios.get(
    `http://localhost:3000/api/locations/${params.locationId}`
  )
  const location = response.data

  
return {
    props: { location },
  }
}
const LocationPage = ({ location }) => {
  const handleDelete = (locationId) => async () => {
    await axios.delete(`http://localhost:3000/api/locations/${locationId}`)
  }
  const router = useRouter()

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        Le nom de l'établissement est : {location.name}
      </h1>
      <h1 className="text-lg">
        Il se situe : {location.cityCode} rue {location.street} {location.city}{" "}
        {location.zipCode} {location.country}
      </h1>
      <h1 className="text-lg">
        Le type d'établissement est un : {location.type}
      </h1>
      {location.type === "Restaurant" && (
        <div>
          <h1 className="text-lg">
            Le type de restaurant est : {location.restaurantType}
          </h1>
          <h1 className="text-lg">
            Le nombre d'étoile est de : {location.stars}
          </h1>
          <h1 className="text-lg">Le prix moyen est de : {location.price}</h1>
        </div>
      )}
      {location.type === "Bar" && (
        <div>
          <h1 className="text-lg">Le type de bar est : {location.typeOfBar}</h1>
          <h1 className="text-lg">Le prix moyen est de : {location.price}</h1>
        </div>
      )}
      {location.type === "Parc" && (
        <div>
          <h1 className="text-lg">
            Le type de parc est : {location.typeOfParc}
          </h1>
          <h1 className="text-lg">Le prix moyen est de : {location.price}</h1>
          <h1 className="text-lg">Le prix est de : {location.prices}</h1>
        </div>
      )}
      {location.type === "Musée" && (
        <div>
          <h1 className="text-lg">
            Le courant artistique est : {location.ArtisticCurrent}{" "}
          </h1>
          <h1 className="text-lg">
            Le type de l'art est :{location.typesOfArt}
          </h1>
          <h1 className="text-lg">Le prix moyen est de : {location.price}</h1>
          <h1 className="text-lg">Le prix est de : {location.prices}</h1>
        </div>
      )}
      <h1 className="text-lg">{location.isFree}</h1>
      <h1 className="text-lg">{location.isPrivate}</h1>

      <div className="flex justify-center mt-4">
        <Button
          text="Supprimer"
          onClick={async () => {
            await handleDelete(location._id)()
            router.push("/")
          }}
        />
      </div>
      <Button
        text="Edit"
        onClick={() => router.push(`/locations/${location._id}/edit`)}
      />
    </div>
  )
}

export default LocationPage
