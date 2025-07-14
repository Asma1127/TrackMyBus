import React, { useState } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import busImg from "./assets/bus.png";
import logoImg from "./assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("student");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async () => {
    if (!email || !pass) return alert("Please enter email and password.");
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);
      const uid = userCred.user.uid;
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const storedRole = userDoc.data().role;
        if (storedRole === "admin") navigate("/admindash");
        else navigate("/dashboard");
      } else {
        alert("User role not found in Firestore. Contact admin.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignup = async () => {
    if (!email || !pass) return alert("Please enter email and password.");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        role,
      });

      // Auto-login after signup
      if (role === "admin") navigate("/admindash");
      else navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBlockedLink = (e) => {
    e.preventDefault();
    alert("You should login/signup first.");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          height: "70px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(8px)",
          color: "rgba(255, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          fontFamily: "Poppins, sans-serif",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logoImg}
            alt="Logo"
            style={{ height: "120px", objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            TrackMyBus
          </span>
        </div>
        <div style={{ display: "flex", gap: "25px" }}>
          <a href="#" style={{ color: "rgba(255, 0, 0, 0.7)" }}>
            Home
          </a>
          <a href="#" onClick={handleBlockedLink} style={{ color: "rgba(255, 0, 0, 0.7)" }}>
            Track Bus
          </a>
          <a href="#" onClick={handleBlockedLink} style={{ color: "rgba(255, 0, 0, 0.7)" }}>
            Ask Gemini
          </a>
          <a href="#" onClick={handleBlockedLink} style={{ color: "rgba(255, 0, 0, 0.7)" }}>
            Contact
          </a>
        </div>
      </nav>

      {/* BODY */}
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 70px)",
          width: "100vw",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* IMAGE SIDE */}
        <div
          style={{
            flex: 1,
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={busImg}
            alt="Bus"
            style={{
              width: "80%",
              maxWidth: "500px",
              objectFit: "contain",
              marginTop: "-40px",
            }}
          />
        </div>

        {/* FORM SIDE */}
        <div
          style={{
            flex: 1,
            background: "rgba(255, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "380px",
              padding: "30px",
              backgroundColor: "white",
              boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                color: "rgba(255, 0, 0, 0.7)",
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            {/* ROLE DROPDOWN */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              {isLogin ? (
                <>
                  <option value="student">Login as Student</option>
                  <option value="admin">Login as Admin</option>
                </>
              ) : (
                <>
                  <option value="student">Signup as Student</option>
                  <option value="admin">Signup as Admin</option>
                </>
              )}
            </select>

            {/* EMAIL INPUT */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            {/* PASSWORD INPUT */}
            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            {/* SUBMIT BUTTON */}
            <button
              onClick={isLogin ? handleLogin : handleSignup}
              style={{
                width: "100%",
                padding: "10px",
                background: "rgba(255, 0, 0, 0.7)",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p style={{ marginTop: "15px" }}>
              {isLogin ? "New user?" : "Already registered?"}
              <span
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  color: "rgba(255, 0, 0, 0.7)",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
