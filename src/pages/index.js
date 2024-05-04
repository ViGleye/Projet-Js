import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import Dropdown from "@/components/Dropdown"
import Button from "@/components/Button"
export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/locations")
  const initialLocations = response.data

  return {
    props: { initialLocations },
  }
}

export default function Home({ initialLocations }) {
  const [locations, setLocations] = useState(initialLocations)
  const [filters, setFilters] = useState({
    type: "",
    typeOfParc: "",
    isFree: "",
    isPrivate: "",
    price: "",
    typesOfArt: "",
    ArtisticCurrent: "",
    restaurantType: "",
    stars: "",
    typeOfBar: "",
    prices: "",
  })
  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value })
    applyFilters()
  }
  const applyFilters = () => {
const filtered = initialLocations.filter((location) =>
  Object.keys(filters).every((key) => {
    const filterValue = filters[key]
    if (filterValue === "") return true  

    if (key === "isFree") {
      return location[key] === (filterValue === "Gratuit")
    }

    return location[key] === filterValue
  }),
)

    setLocations(filtered)
  }
  const resetFilters = () => {
    setFilters({
      type: "",
      typeOfParc: "",
      isFree: "",
      isPrivate: "",
      price: "",
      typesOfArt: "",
      ArtisticCurrent: "",
      restaurantType: "",
      stars: "",
      typeOfBar: "",
      prices: "",
    })
    setLocations(initialLocations)
  }

  return (
    <main>
      <h1 className="text-xl font-bold text-yellow-500">Filtre</h1>
      <Dropdown
        title="Type"
        options={Array.from(
          new Set(initialLocations.map((location) => location.type)),
        )}
        selected={filters.type}
        onChange={(value) => handleFilterChange("type", value)}
      />
      {filters.type === "Musée" && (
        <>
          <Dropdown
            title="Types d'Art"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Musée")
                  .map((location) => location.typesOfArt),
              ),
            )}
            selected={filters.typesOfArt}
            onChange={(value) => handleFilterChange("typesOfArt", value)}
          />
          <Dropdown
            title="Courant Artistique"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Musée")
                  .map((location) => location.ArtisticCurrent),
              ),
            )}
            selected={filters.ArtisticCurrent}
            onChange={(value) => handleFilterChange("ArtisticCurrent", value)}
          />
          <Dropdown
            title="Accès"
            options={["Gratuit", "Payant"]}
            selected={filters.isFree === true ? "Gratuit" : "Payant"}
            onChange={(value) =>
              handleFilterChange("isFree", value === "Gratuit")
            }
          />
        </>
      )}
      {filters.type === "Musée" && !filters.isFree ? (
        <div>
          <Dropdown
            title="Prix moyen"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Musée")
                  .map((location) => location.price),
              ),
            )}
            selected={filters.price}
            onChange={(value) => handleFilterChange("price", value)}
          />
          <Dropdown
            title="Prix"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Musée")
                  .map((location) => location.prices),
              ),
            )}
            selected={filters.prices}
            onChange={(value) => handleFilterChange("prices", value)}
          />
        </div>
      ) : null}

      {filters.type === "Restaurant" && (
        <>
          <Dropdown
            title="Type de Restaurant"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Restaurant")
                  .map((location) => location.restaurantType),
              ),
            )}
            selected={filters.restaurantType}
            onChange={(value) => handleFilterChange("restaurantType", value)}
          />
          <Dropdown
            title="Etoiles"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Restaurant")
                  .map((location) => location.stars),
              ),
            )}
            selected={filters.stars}
            onChange={(value) => handleFilterChange("stars", value)}
          />
          <Dropdown
            title="Prix moyen"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Restaurant")
                  .map((location) => location.price),
              ),
            )}
            selected={filters.prices}
            onChange={(value) => handleFilterChange("price", value)}
          />
        </>
      )}
      {filters.type === "Parc" && (
        <>
          <Dropdown
            title="Type de Parc"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Parc")
                  .map((location) => location.typeOfParc),
              ),
            )}
            selected={filters.typeOfParc}
            onChange={(value) => handleFilterChange("typeOfParc", value)}
          />
          <Dropdown
            title="Accès"
            options={["Public", "Privé"]}
            selected={filters.isPrivate === true ? "Public" : "Privée"}
            onChange={(value) =>
              handleFilterChange("isPrivate", value === "Public")
            }
          />
          
          <Dropdown
            title="Accès"
            options={["Gratuit", "Payant"]}
            selected={filters.isFree === true ? "Gratuit" : "Payant"}
            onChange={(value) =>
              handleFilterChange("isFree", value === "Gratuit")
            }
          />
        </>
      )}
      {filters.type === "Parc" && !filters.isFree ? (
        <div>
          <Dropdown
            title="Prix moyen"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Parc")
                  .map((location) => location.price),
              ),
            )}
            selected={filters.price}
            onChange={(value) => handleFilterChange("price", value)}
          />
          <Dropdown
            title="Prix"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Parc")
                  .map((location) => location.prices),
              ),
            )}
            selected={filters.prices}
            onChange={(value) => handleFilterChange("prices", value)}
          />
        </div>
      ) : null}
      {filters.type === "Bar" && (
        <>
          <Dropdown
            title="Type de Bar"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Bar")
                  .map((location) => location.typeOfBar),
              ),
            )}
            selected={filters.typeOfBar}
            onChange={(value) => handleFilterChange("typeOfBar", value)}
          />
          <Dropdown
            title="Prix Moyen"
            options={Array.from(
              new Set(
                initialLocations
                  .filter((location) => location.type === "Bar")
                  .map((location) => location.price),
              ),
            )}
            selected={filters.price}
            onChange={(value) => handleFilterChange("price", value)}
          />
        </>
      )}
      {/* Vous pouvez ajouter d'autres Dropdown pour d'autres types avec une logique similaire */}
      <Button onClick={resetFilters} text="Reset Filter" />

      <h1 className="text-xl font-bold text-yellow-500">Liste</h1>
      <ul className="flex flex-col gap-4">
        {locations.map(
          ({ _id, name, type, street, city, zipCode, country }) => (
            <li key={_id} className="group flex items-center gap-2">
              <Link
                href={`/locations/${_id}`}
                className="flex gap-2 py-1 underline decoration-solid rounded bg-blue-400 text-white px-4"
              >
                Nom de l'enseigne: {name}, Type: {type}, Adresse: {street},{" "}
                {city}, {zipCode}, {country}
              </Link>
            </li>
          ),
        )}
      </ul>
    </main>
  )
}
