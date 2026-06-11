// components/Input.jsx
import React from "react";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  accept,
  ...rest
}) {
  return (
    <div className="mb-3 text-start">
      <label className="form-label">{label}</label>

      <input
        type={type}
        name={name}
        className="form-control"
        value={type !== "file" ? value : undefined}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        accept={accept} //
        {...rest}
      />
    </div>
  );
}

export default Input;
