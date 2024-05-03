import { useState, Fragment, useEffect } from "react"
import { Combobox } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/20/solid"

function MyCombobox({ options, selectedOption, setSelectedOption }) {
  const [query, setQuery] = useState("")
  const [initialOptions,] = useState(
    options.map((option) => String(option))
  )
  const [filteredOptions, setFilteredOptions] = useState()

  useEffect(() => {
    setFilteredOptions(
      initialOptions.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, options])

  return (
    <Combobox value={selectedOption} onChange={setSelectedOption}>
      <div className="relative mt-2">
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option) => option}
          className={"w-full p-2 border border-gray-300 rounded-md"}
        />
        <Combobox.Options>
          {filteredOptions &&
            filteredOptions.map((option) => (
              <Combobox.Option key={option} value={option} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`${
                      active ? "bg-blue-500 text-white" : "bg-white text-black"
                    }`}
                  >
                    {selected && <CheckIcon className="h-4 w-4" />}
                    {option}
                  </li>
                )}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}
export default MyCombobox
