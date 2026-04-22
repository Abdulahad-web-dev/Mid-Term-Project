"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy login logic (replace with Supabase later)
    if (email && password) {
      router.push("/dashboard");
    }
  };

  const handleQuickLogin = (role: "buyer" | "seller") => {
    if (role === "buyer") {
      setEmail("abdulahad.web9@gmail.com");
      setPassword("12345678");
    } else {
      setEmail("abdulahad.web96@gmail.com");
      setPassword("12345678");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>

        {/* Quick Login */}
        <div style={styles.quickButtons}>
          <button onClick={() => handleQuickLogin("buyer")} style={styles.button}>
            Buyer Login
          </button>
          <button onClick={() => handleQuickLogin("seller")} style={styles.button}>
            Seller Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.loginBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

/* 🎨 Simple Styles (No dependency issues) */
const styles: any = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    width: "300px",
    textAlign: "center",
    color: "white",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
  },
  loginBtn: {
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  quickButtons: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  button: {
    flex: 1,
    padding: "8px",
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
