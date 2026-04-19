import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthFormField from "../components/AuthFormField";
import { loginSchema } from "../validation/authSchemas";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setServerError("");
    setIsSubmitting(true);
    try {
      await login(values);
      navigate("/dashboard");
    } catch (error) {
      setServerError(error?.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Login to continue to your workspace"
      alternateText="New here?"
      alternateLink="/register"
      alternateCta="Create account"
    >
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="Enter password"
          register={register}
          error={errors.password}
          disabled={isSubmitting}
        />
        {serverError && <p className="form-error">{serverError}</p>}
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthCard>
  );
};

export default LoginPage;
