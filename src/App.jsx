import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminDash from "./admindash";
import TrackBus from "./TrackBus";
import AskGemini from "./gemini";
import Contact from "./Contact";
import Layout from "./Layout";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Router>
      <Routes>
        {/* Login route always accessible */}
        <Route path="/login" element={<Login />} />

        {/* Default route redirecting based on role */}
        <Route
          path="/"
          element={
            user ? (
              role === "admin" ? <Navigate to="/admindash" /> : <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin route */}
        <Route
          path="/admindash"
          element={
            user && role === "admin" ? <AdminDash /> : <Navigate to="/login" />
          }
        />

        {/* Student routes */}
        {user && role === "student" && (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track-bus" element={<TrackBus />} />
            <Route path="/gemini" element={<AskGemini />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        )}

        {/* Fallback route for any undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
