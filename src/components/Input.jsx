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
}) {
  return (
    <div className="mb-3 text-start">
      <label className="form-label">{label}</label>

      <input
        type={type}
        name={name}
        className="form-control"
        value={type !== "file" ? value : undefined} // 👈 สำคัญ
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        accept={accept} // 👈 สำหรับ file
      />
    </div>
  );
}

export default Input;
