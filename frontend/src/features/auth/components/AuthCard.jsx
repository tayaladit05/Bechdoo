import { Link } from "react-router-dom";

const AuthCard = ({ title, subtitle, children, alternateText, alternateLink, alternateCta }) => {
  return (
    <section className="auth-card">
      <header className="auth-card__header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      {children}
      {alternateLink && (
        <p className="auth-card__alternate">
          {alternateText} <Link to={alternateLink}>{alternateCta}</Link>
        </p>
      )}
    </section>
  );
};

export default AuthCard;
