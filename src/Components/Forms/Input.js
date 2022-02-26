import React from "react";

export default function Input({
  placeholder,
  type,
  value,
  onChange,
  error,
  onBlur,
  required,
  disabled,
  label,
  id,
}) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        className="form-control"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        id={id}
      />
      {error && <p className="error"> {error} </p>}
    </div>
  );
}
