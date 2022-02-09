import React from "react";

export default function Checkbox({ type, value, name, label, children }) {
  return (
    <div>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        name={name}
        id={name}
      />
      <label
        className="form-check-label"
        htmlFor={name}
        style={{ paddingLeft: "5px" }}
      >
        {label}
      </label>
    </div>
  );
}
