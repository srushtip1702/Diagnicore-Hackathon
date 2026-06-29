import "./UserForm.css";

function UserForm({ fields, formData, handleChange }) {
  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="form-group">

          <label>
            {field.label}
          </label>

          <input
            type={field.type || "text"}
            name={field.name}
            placeholder={field.label}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required
          />

        </div>
      ))}
    </>
  );
}

export default UserForm;