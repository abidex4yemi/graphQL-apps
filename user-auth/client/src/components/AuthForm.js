import React, { useState } from "react";

const AuthForm = ({ handleSubmit, errors }) => {
  const [form, setFormValue] = useState({ email: "", password: "" });

  const handleInput = e => {
    const { name, value } = e.target;
    setFormValue(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="row">
      <form
        className="col s6"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(form);
        }}
      >
        <div className="card">
          <div className="input-field col s6">
            <input
              placeholder="Email"
              id="email"
              name="email"
              type="text"
              className="validate"
              value={form.email}
              onChange={handleInput}
            />
          </div>

          <div className="input-field col s6">
            <input
              id="password"
              type="password"
              name="password"
              className="validate"
              placeholder="password"
              value={form.password}
              onChange={handleInput}
            />
          </div>
        </div>

        {errors.map(error => (
          <div style={{ color: "red" }} key={error}>
            {error.replace('"', "")}
          </div>
        ))}

        <button
          className="btn waves-effect waves-light right"
          type="submit"
          name="action"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
