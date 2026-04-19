import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "../components/AuthCard";
import AuthFormField from "../components/AuthFormField";
import { registerSchema } from "../validation/authSchemas";
import { registerRequest } from "../api/authApi";

const RegisterPage = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setServerError("");
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      const response = await registerRequest(values);
      setSuccessMessage(response.data?.message || "Registration successful. Please verify your email.");
      reset();
    } catch (error) {
      setServerError(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start by creating auth credentials"
      alternateText="Already have an account?"
      alternateLink="/login"
      alternateCta="Login"
    >
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <AuthFormField
          id="name"
          label="Full name"
          placeholder="Adit Tyal"
          register={register}
          error={errors.name}
          disabled={isSubmitting}
        />
        <AuthFormField
          id="email"
          label="Email"
          type="email"
          placeholder="name@company.com"
          register={register}
          error={errors.email}
          disabled={isSubmitting}
        />
        <AuthFormField
          id="password"
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          register={register}
          error={errors.password}
          disabled={isSubmitting}
        />
        {serverError && <p className="form-error">{serverError}</p>}
        {successMessage && <p className="form-success">{successMessage}</p>}
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </button>
      </form>
    </AuthCard>
  );
};

export default RegisterPage;
