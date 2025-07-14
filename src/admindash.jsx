import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import logoImg from "./assets/logo.png";

const AdminDash = () => {
  const navigate = useNavigate();
  const [busNumber, setBusNumber] = useState("");
  const [busLocation, setBusLocation] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "trackingStudents"));
        const all = snapshot.docs.map((doc) => doc.data().email);
        const shuffled = all.sort(() => 0.5 - Math.random());
        const randomSubset = shuffled.slice(0, 5);
        setStudents(randomSubset);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  const handleUpdate = async () => {
    if (!busNumber || !busLocation || !arrivalTime || !departureTime) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await setDoc(doc(db, "busStatus", busNumber), {
        busNumber,
        location: busLocation,
        arrivalTime,
        departureTime,
        updatedAt: new Date().toISOString(),
      });

      alert(`✅ Bus ${busNumber} info updated!`);
    } catch (err) {
      alert("❌ Error updating Firestore: " + err.message);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          height: "70px",
          backgroundColor: "white",
          color: "rgba(255, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          fontFamily: "Poppins, sans-serif",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={logoImg} alt="Logo" style={{ height: "120px" }} />
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>TrackMyBus - Admin</span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>

      {/* RED BACKGROUND PAGE */}
      <div
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.7)",
          minHeight: "100vh",
          padding: "50px 20px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* WHITE BOX CONTAINER */}
        <div
          style={{
            backgroundColor: "#fff",
            maxWidth: "700px",
            margin: "0 auto",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ color: "#d32f2f", marginBottom: "20px" }}>🛠 Admin Panel</h2>

          <div style={{ marginBottom: "10px" }}>
            <label>🚌 Select Bus Number:</label>
            <select
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "6px",
                width: "60%",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">-- Choose Bus --</option>
              <option value="BUS101">BUS101</option>
              <option value="BUS202">BUS202</option>
              <option value="BUS303">BUS303</option>
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>📍 Bus Current Location:</label>
            <input
              type="text"
              value={busLocation}
              onChange={(e) => setBusLocation(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "6px",
                width: "60%",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>🕒 Set Arrival Time:</label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>🕔 Set Departure Time:</label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            onClick={handleUpdate}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#388e3c",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            🚍 Start Ride & Update
          </button>

          <div style={{ marginTop: "40px" }}>
            <h3>📋 Students Currently Tracking</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {students.length > 0 ? (
                students.map((s, i) => <li key={i}>{s}</li>)
              ) : (
                <li>No students found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
