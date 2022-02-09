import React from "react";

export default function Input({
  placeholder,
  type,
  value,
  onChange,
  error,
  onBlur,
  required,
}) {
  return (
    <div>
      <input
        className="form-control"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
      {error && <p className="error"> {error} </p>}
    </div>
  );
}
