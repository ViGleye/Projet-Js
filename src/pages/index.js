import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import MyCombobox from "@/components/FilterCombobox.jsx"
import Button from "@/components/Button.jsx"
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
    const filtered = initialLocations.filter((location) => {
      const isFreeMatch =
        filters.isFree !== "" ? location.isFree === filters.isFree : true
      const priceMatch =
        !filters.isFree && filters.price
          ? location.price === filters.price
          : true
      const pricesMatch =
        !filters.isFree && filters.prices
          ? location.prices === filters.prices
          : true
      const typeOfParcMatch = filters.typeOfParc
        ? location.typeOfParc === filters.typeOfParc
        : true
      const isPrivateMatch = filters.isPrivate
        ? location.isPrivate === filters.isPrivate
        : true
      const typesOfArtMatch = filters.typesOfArt
        ? location.typesOfArt === filters.typesOfArt
        : true
      const ArtisticCurrentMatch = filters.ArtisticCurrent
        ? location.ArtisticCurrent === filters.ArtisticCurrent
        : true
      const restaurantTypeMatch = filters.restaurantType
        ? location.restaurantType === filters.restaurantType
        : true
      const starsMatch = filters.stars
        ? location.stars === filters.stars
        : true
      const typeOfBarMatch = filters.typeOfBar
        ? location.typeOfBar === filters.typeOfBar
        : true
      const typeMatch = filters.type ? location.type === filters.type : true

      
return (
        typeMatch &&
        typeOfParcMatch &&
        typeOfBarMatch &&
        ArtisticCurrentMatch &&
        restaurantTypeMatch &&
        typesOfArtMatch &&
        isPrivateMatch &&
        starsMatch &&
        isFreeMatch &&
        priceMatch &&
        pricesMatch
      )
    })

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
      <h1 className="font-weight: 800 text-xl text-yellow-500">Filtre</h1>
      <MyCombobox
        options={Array.from(new Set(initialLocations.map(({ type }) => type)))}
        selectedOption={filters.type}
        setSelectedOption={(value) => handleFilterChange("type", value)}
      />

      {filters.type === "Parc" && (
        <>
          <MyCombobox
            options={initialLocations
              .filter(({ type }) => type === "Parc")
              .map(({ typeOfParc }) => typeOfParc)}
            selectedOption={filters.typeOfParc}
            setSelectedOption={(value) =>
              handleFilterChange("typeOfParc", value)
            }
          />
          <MyCombobox
            options={["Gratuit", "Payant"]}
            selectedOption={filters.isFree === true ? "Gratuit" : "Payant"}
            setSelectedOption={(value) =>
              handleFilterChange("isFree", value === "Gratuit")
            }
          />

          {!filters.isFree && (
            <div>
              <MyCombobox
                options={initialLocations
                  .filter(({ type }) => type === "Parc" && !location.isFree)
                  .map(({ price }) => price)}
                selectedOption={filters.price}
                setSelectedOption={(value) =>
                  handleFilterChange("price", value)
                }
              />
              <MyCombobox
                options={initialLocations
                  .filter(({ type }) => type === "Parc" && !location.isFree)
                  .map(({ prices }) => prices)}
                selectedOption={filters.prices}
                setSelectedOption={(value) =>
                  handleFilterChange("prices", value)
                }
              />
            </div>
          )}
        </>
      )}

      {filters.type === "Restaurant" && (
        <>
          <MyCombobox
            options={initialLocations
              .filter(({ type }) => type === "Restaurant")
              .map(({ restaurantType }) => restaurantType)}
            selectedOption={filters.restaurantType}
            setSelectedOption={(value) =>
              handleFilterChange("restaurantType", value)
            }
          />
          {
            <MyCombobox
              options={initialLocations
                .filter(({ type }) => type === "Restaurant")
                .map(({ stars }) => stars)}
              selectedOption={filters.stars}
              setSelectedOption={(value) => handleFilterChange("stars", value)}
            />
          }
          <MyCombobox
            options={["Gratuit", "Payant"]}
            selectedOption={filters.isFree === true ? "Gratuit" : "Payant"}
            setSelectedOption={(value) =>
              handleFilterChange("isFree", value === "Gratuit")
            }
          />

          {!filters.isFree && (
            <MyCombobox
              options={initialLocations
                .filter(({ type }) => type === "Restaurant" && !location.isFree)
                .map(({ price }) => price)}
              selectedOption={filters.price}
              setSelectedOption={(value) => handleFilterChange("price", value)}
            />
          )}
        </>
      )}

      {filters.type === "Bar" && (
        <>
          <MyCombobox
            options={initialLocations
              .filter(({ type }) => type === "Bar")
              .map(({ typeOfBar }) => typeOfBar)}
            selectedOption={filters.typeOfBar}
            setSelectedOption={(value) =>
              handleFilterChange("typeOfBar", value)
            }
          />
          <MyCombobox
            options={["Gratuit", "Payant"]}
            selectedOption={filters.isFree === true ? "Gratuit" : "Payant"}
            setSelectedOption={(value) =>
              handleFilterChange("isFree", value === "Gratuit")
            }
          />

          {!filters.isFree && (
            <MyCombobox
              options={initialLocations
                .filter(({ type }) => type === "Bar" && !location.isFree)
                .map(({ price }) => price)}
              selectedOption={filters.price}
              setSelectedOption={(value) => handleFilterChange("price", value)}
            />
          )}
        </>
      )}
      {filters.type === "Musée" && (
        <>
          <MyCombobox
            options={initialLocations
              .filter(({ type }) => type === "Musée")
              .map(({ typesOfArt }) => typesOfArt)}
            selectedOption={filters.typesOfArt}
            setSelectedOption={(value) =>
              handleFilterChange("typesOfArt", value)
            }
          />
          <MyCombobox
            options={initialLocations
              .filter(({ type }) => type === "Musée")
              .map(({ ArtisticCurrent }) => ArtisticCurrent)}
            selectedOption={filters.ArtisticCurrent}
            setSelectedOption={(value) =>
              handleFilterChange("ArtisticCurrent", value)
            }
          />
          <MyCombobox
            options={["Gratuit", "Payant"]}
            selectedOption={filters.isFree === true ? "Gratuit" : "Payant"}
            setSelectedOption={(value) =>
              handleFilterChange("isFree", value === "Gratuit")
            }
          />

          {!filters.isFree && (
            <div>
              <MyCombobox
                options={initialLocations
                  .filter(({ type }) => type === "Musée" && !location.isFree)
                  .map(({ price }) => price)}
                selectedOption={filters.price}
                setSelectedOption={(value) =>
                  handleFilterChange("price", value)
                }
              />
              <MyCombobox
                options={initialLocations
                  .filter(({ type }) => type === "Musée" && !location.isFree)
                  .map(({ prices }) => prices)}
                selectedOption={filters.prices}
                setSelectedOption={(value) =>
                  handleFilterChange("prices", value)
                }
              />
            </div>
          )}
        </>
      )}

      <Button onClick={resetFilters} text="ResetFilter"></Button>

      <h1 className="font-weight: 800 text-xl text-yellow-500">List</h1>

      <ul className="flex flex-col gap-4">
        {locations.map(
          ({ _id, name, type, street, city, zipCode, country }) => (
            <li key={_id} className="group flex items-center gap-2">
              <Link
                href={`/locations/${_id}`}
                className="flex gap-2 py-1 underline decoration-solid  rounded bg-blue-400 text-white px-4 "
              >
                Nom de l'enseigne : {name}, Type: {type}, Adresse: {street},{" "}
                {city}, {zipCode}, {country}
              </Link>
            </li>
          )
        )}
      </ul>
    </main>
  )
}
