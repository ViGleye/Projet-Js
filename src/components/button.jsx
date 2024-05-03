import React from "react"

const Button = ({ text, onClick }) => (
    <div className="flex justify-center">
      <button
        className="rounded-3xl bg-blue-400 text-white px-5 py-3 "
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )

export default Button
