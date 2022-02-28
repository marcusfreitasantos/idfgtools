import React, { Children } from "react";

export default function Select({
  children,
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
      <label htmlFor={id}>{label}</label>
      <select
        className="form-select"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        id={id}
      >
        {children}
      </select>
      {error && <p className="error"> {error} </p>}
    </div>
  );
}
