const AuthFormField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
}) => {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} {...register(id)} disabled={disabled} />
      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
};

export default AuthFormField;
