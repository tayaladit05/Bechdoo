const API_BASE = "http://localhost:5000/api/auth";

const outputEl = document.getElementById("output");
const registerForm = document.getElementById("registerForm");
const verifyForm = document.getElementById("verifyForm");
const loginForm = document.getElementById("loginForm");
const clearBtn = document.getElementById("clearBtn");

function setOutput(payload, isError = false) {
  outputEl.textContent = JSON.stringify(payload, null, 2);
  outputEl.style.color = isError ? "#ffc9c9" : "#d6e4ff";
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({ message: "No JSON response" }));
  if (!response.ok) {
    throw { status: response.status, data };
  }

  return data;
}

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    setOutput({ info: "Registering user..." });
    const data = await apiRequest("/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setOutput(data);
    registerForm.reset();
  } catch (error) {
    setOutput({ error: "Register failed", details: error.data || error }, true);
  }
});

verifyForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(verifyForm);
  const token = String(formData.get("token") || "").trim();

  if (!token) {
    setOutput({ error: "Verification token is required" }, true);
    return;
  }

  try {
    setOutput({ info: "Verifying email..." });
    const data = await apiRequest(`/verify/${encodeURIComponent(token)}`, {
      method: "GET",
    });
    setOutput(data);
    verifyForm.reset();
  } catch (error) {
    setOutput({ error: "Verification failed", details: error.data || error }, true);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    setOutput({ info: "Logging in..." });
    const data = await apiRequest("/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setOutput(data);
    loginForm.reset();
  } catch (error) {
    setOutput({ error: "Login failed", details: error.data || error }, true);
  }
});

clearBtn.addEventListener("click", () => {
  outputEl.textContent = "Ready.";
  outputEl.style.color = "#d6e4ff";
});
