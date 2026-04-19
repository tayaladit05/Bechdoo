# Bechdoo Frontend (React + Vite)

This frontend is structured for a production-oriented auth flow that integrates with the existing backend auth APIs.

## Tech Stack

- React + Vite
- React Router
- Axios
- React Hook Form + Zod

## Folder Structure

```text
src/
	components/
		layout/
			AppShell.jsx
	config/
		env.js
	features/
		auth/
			api/
				authApi.js
			components/
				AuthCard.jsx
				AuthFormField.jsx
			context/
				AuthContext.jsx
			pages/
				LoginPage.jsx
				RegisterPage.jsx
				VerifyEmailPage.jsx
			validation/
				authSchemas.js
	lib/
		apiClient.js
	pages/
		DashboardPage.jsx
	routes/
		ProtectedRoute.jsx
		PublicOnlyRoute.jsx
	App.jsx
	main.jsx
	index.css
```

## Environment

Create `.env` in this `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Backend should allow frontend origin and credentials:

```env
CLIENT_URL=http://localhost:5173
```

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Current Routes

- `/register`
- `/login`
- `/verify/:token`
- `/dashboard` (protected)
