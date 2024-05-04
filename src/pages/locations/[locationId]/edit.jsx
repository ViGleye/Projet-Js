import { useFormik } from "formik"
import Dropdown from "@/components/Dropdown"
import * as Yup from "yup"
import axios from "axios"
import Button from "@/components/Button"

import {
  restaurantType,
  type,
  price,
  stars,
  isFree,
  ArtisticCurrent,
  typesOfArt,
  typeOfBar,
  typeOfParc,
  isPrivate,
  prices,
} from "@/components/array.js"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ params }) => {
  const response = await axios.get(
    `http://localhost:3000/api/locations/${params.locationId}`,
  )
  const initialLocation = response.data

  return {
    props: { initialLocation },
  }
}
const LocationEditPage = ({ initialLocation }) => {
  const validationFormulaire = Yup.object().shape({
    name: Yup.string()
      .min(2, "Il est nécessaire d'avoir au minimum 2 lettres")
      .required("Le nom de l'enseigne est obligatoire"),
    street: Yup.string().required("La rue est obligatoire"),
    city: Yup.string().required("La ville est obligatoire"),
    zipCode: Yup.string().required("Le code postal est obligatoire"),
    country: Yup.string().required("Le pays est obligatoire"),
    type: Yup.string().required("Le type d'enseigne est obligatoire"),
    //Price: Yup.number().required("Le prix est obligatoire"),
    //prices: Yup.number().required("Le prix d'entrée est obligatoire"),
    // restaurantType: Yup.string().when("type", {
    //   is: "Restaurant",
    //   then: Yup.string().required("Restaurant type est obligatoire"),
    // }),
    // typesOfArt: Yup.string().when("type", {
    //   is: "Musée",
    //   then: Yup.string().required("Le type de l'art est obligatoire"),
    // }),
    // ArtisticCurrent: Yup.string().when("type", {
    //   is: "Musée",
    //   then: Yup.string().required("Le courant artistique est obligatoire"),
    // }),
    // typesOfBar: Yup.string().when("type", {
    //   is: "Bar",
    //   then: Yup.string().required("Le type de bar est obligatoire"),
    // }),
    // typesOfParc: Yup.string().when("type", {
    //   is: "Parc",
    //   then: Yup.string().required("Le type de parc est obligatoire"),
    // }),
  })
  const router = useRouter()
  const formik = useFormik({
    initialValues: initialLocation,
    validationSchema: validationFormulaire,
    onSubmit: async (values) => {
      await axios.patch(`http://localhost:3000/api/locations/${values._id}`, {
        values,
      })
      router.push(`/locations/${values._id}`)
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full px-2">
            <input
              placeholder="Nom de l'enseigne"
              id="name"
              type="text"
              className="border border-gray-300 shadow-md p-2 w-full text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <div class="w-1/2 px-2">
            <input
              placeholder="Rue"
              id="street"
              type="text"
              className="border border-gray-300 shadow-md p-2 w-full text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={formik.handleChange}
              value={formik.values.street}
            />
            {formik.touched.street && formik.errors.street ? (
              <div>{formik.errors.street}</div>
            ) : null}
          </div>
          <div class="w-1/2 px-2 ">
            <input
              placeholder="Ville"
              id="city"
              type="text"
              className="border border-gray-300 shadow-md p-2 w-full text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
              <div>{formik.errors.city}</div>
            ) : null}
          </div>
          <div class="w-1/2 px-2">
            <input
              placeholder="Code Postale"
              id="zipCode"
              type="number"
              className="border border-gray-300 shadow-md p-2 w-full text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={formik.handleChange}
              value={formik.values.zipCode}
            />
            {formik.touched.zipCode && formik.errors.zipCode ? (
              <div>{formik.errors.zipCode}</div>
            ) : null}
          </div>
          <div class="w-1/2 px-2">
            <input
              placeholder="Pays"
              id="country"
              type="text"
              className="border border-gray-300 shadow-md p-2 w-full text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={formik.handleChange}
              value={formik.values.country}
            />
            {formik.touched.country && formik.errors.country ? (
              <div>{formik.errors.country}</div>
            ) : null}
          </div>
        </div>

        <Dropdown
          options={type}
          selected={formik.values.type}
          onChange={(selectedOption) =>
            formik.setFieldValue("type", selectedOption)
          }
          title={"Type d'enseigne"}
        />
        {formik.errors.name ? <div>{formik.errors.type}</div> : null}

        {formik.values.type === "Restaurant" ? (
          <div>
            <Dropdown
              options={restaurantType}
              selected={formik.values.restaurantType}
              onChange={(restaurantType) =>
                formik.setFieldValue("restaurantType", restaurantType)
              }
              title={"Type de restaurant"}
            />
            {/* {formik.touched.restaurantType && formik.errors.restaurantType ? (
              <div>{formik.errors.restaurantType}</div>
            ) : null} */}
            <Dropdown
              options={stars}
              selected={formik.values.stars}
              onChange={(stars) => formik.setFieldValue("stars", stars)}
              title={"Nombre d'étoile"}
            />
            <Dropdown
              options={price}
              selected={formik.values.price}
              onChange={(price) => formik.setFieldValue("price", price)}
              title={"Prix moyen entre 1 et 5"}
            />
            {/* {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null} */}
          </div>
        ) : null}
        {formik.values.type === "Musée" ? (
          <div>
            <Dropdown
              options={ArtisticCurrent}
              selected={formik.values.ArtisticCurrent}
              onChange={(ArtisticCurrent) =>
                formik.setFieldValue("ArtisticCurrent", ArtisticCurrent)
              }
              title={"Courant Artistique"}
            />
            {/* {formik.touched.ArtisticCurrent && formik.errors.ArtisticCurrent ? (
              <div>{formik.errors.ArtisticCurrent}</div>
            ) : null} */}
            <Dropdown
              options={typesOfArt}
              selected={formik.values.typesOfArt}
              onChange={(typesOfArt) =>
                formik.setFieldValue("typesOfArt", typesOfArt)
              }
              title={"Type de l'art"}
            />
            {/* {formik.touched.typesOfArt && formik.errors.typesOfArt ? (
              <div>{formik.errors.typesOfArt}</div>
            ) : null} */}
            <Dropdown
              options={isFree}
              selected={formik.values.isFree === true ? "Gratuit" : "Payant"}
              onChange={(isFree) =>
                formik.setFieldValue("isFree", isFree === "Gratuit")
              }
              title={"Gratuit ou Payant "}
            />
          </div>
        ) : null}
        {formik.values.type === "Musée" && !formik.values.isFree ? (
          <div>
            <Dropdown
              options={price}
              selected={formik.values.price}
              onChange={(price) => formik.setFieldValue("price", price)}
              title={"Prix moyens entre 1 et 5"}
            />
            {/* {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null} */}
            <Dropdown
              options={prices}
              selected={formik.values.prices}
              onChange={(prices) => formik.setFieldValue("prices", prices)}
              title={"Prix d'entrée"}
            />
            {/* {formik.touched.prices && formik.errors.prices ? (
              <div>{formik.errors.prices}</div>
            ) : null} */}
          </div>
        ) : null}

        {formik.values.type === "Bar" ? (
          <div>
            <Dropdown
              options={typeOfBar}
              selected={formik.values.typeOfBar}
              onChange={(typeOfBar) =>
                formik.setFieldValue("typeOfBar", typeOfBar)
              }
              title={"Type de bar :"}
            />
            {/* {formik.touched.typeOfBar && formik.errors.typeOfBar ? (
              <div>{formik.errors.typeOfBar}</div>
            ) : null} */}
            <Dropdown
              options={price}
              selected={formik.values.price}
              onChange={(price) => formik.setFieldValue("price", price)}
              title={"Prix moyens entre 1 et 5"}
            />
            {/* {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null} */}
          </div>
        ) : null}

        {formik.values.type === "Parc" ? (
          <div>
            <Dropdown
              options={typeOfParc}
              selected={formik.values.typeOfParc}
              onChange={(typeOfParc) =>
                formik.setFieldValue("typeOfParc", typeOfParc)
              }
              title={"Type de parc:"}
            />
            {/* {formik.touched.typeOfParc && formik.errors.typeOfParc ? (
              <div>{formik.errors.typeOfParc}</div>
            ) : null} */}
            <Dropdown
              options={isPrivate}
              selected={formik.values.isPrivate === true ? "Public" : "Private"}
              onChange={(isPrivate) =>
                formik.setFieldValue("isPrivate", isPrivate === "Public")
              }
              title={"Private ou Public "}
            />
            <Dropdown
              options={isFree}
              selected={formik.values.isFree === true ? "Gratuit" : "Payant"}
              onChange={(isFree) =>
                formik.setFieldValue("isFree", isFree === "Gratuit")
              }
              title={"Gratuit ou Payant "}
            />
          </div>
        ) : null}
        {formik.values.type === "Parc" && !formik.values.isFree ? (
          <div>
            <Dropdown
              options={price}
              selected={formik.values.price}
              onChange={(price) => formik.setFieldValue("price", price)}
              title={"Prix moyens entre 1 et 5"}
            />
            {/* {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null} */}
            <Dropdown
              options={prices}
              selected={formik.values.prices}
              onChange={(prices) => formik.setFieldValue("prices", prices)}
              title={"Prix d'entrée"}
            />
            {/* {formik.touched.prices && formik.errors.prices ? (
              <div>{formik.errors.prices}</div>
            ) : null} */}
          </div>
        ) : null}
        {formik.errors.location ? <div>{formik.errors.location}</div> : null}

        <Button type="submit" text="editer">
          submite
        </Button>
      </form>
    </div>
  )
}

export default LocationEditPage
