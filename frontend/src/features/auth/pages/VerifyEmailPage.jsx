import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { verifyEmailRequest } from "../api/authApi";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmailRequest(token);
        setStatus("success");
        setMessage(response.data?.message || "Email verified. You can now login.");
      } catch (error) {
        setStatus("error");
        setMessage(error?.response?.data?.message || "Invalid or expired token.");
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("error");
      setMessage("Verification token is missing.");
    }
  }, [token]);

  return (
    <AuthCard title="Email verification" subtitle="Finish account activation">
      <div className="verification-box">
        <p className={status === "success" ? "form-success" : status === "error" ? "form-error" : "form-info"}>{message}</p>
        <Link to="/login" className="btn-secondary">
          Go to login
        </Link>
      </div>
    </AuthCard>
  );
};

export default VerifyEmailPage;
