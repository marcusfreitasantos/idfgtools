import React, { useState } from "react";

export default function UseForm(type) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const types = {
    email: {
      regex:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
      message: "Preencha um e-mail válido.",
    },

    password: {
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      message:
        "A senha precisa ter 1 letra maiúscula, 1 letra minúscula, 1 dígito e no mínimo 8 caracteres.",
    },
  };

  function validate() {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Campo obrigatório!");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}
