import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  marginBottom: "30px",
};

const center = {
  lat: 8.1749,
  lng: 77.4281,
};

const TrackBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [stop, setStop] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [busPosition, setBusPosition] = useState(center);
  const [visible, setVisible] = useState(false);

  const busDelays = {
    "101": 3.2,
    "202": 3.2,
    "303": 7.5,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC9sn8X8VPfmp8P_ORqxLS0o7aqEEmSXOk", // Replace with your actual API Key
  });

  const getETA = () => {
    const distance = busDelays[busNumber] || 3.2;
    const speed = 16;
    const time = distance / speed;
    return Math.round(time * 60);
  };

  const handleTrack = () => {
    if (!busNumber || !stop) {
      alert("Please select both bus number and stop name");
      return;
    }
    setShowDetails(true);
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 70px)",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        padding: "20px",
      }}
    >
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .slide-box {
            animation: slideIn 0.6s ease forwards;
            opacity: 0;
          }
        `}
      </style>

      <div
        className={visible ? "slide-box" : ""}
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#d32f2f", marginBottom: "10px" }}>🚌 Track My Bus</h2>

        {/* Dropdowns */}
        <div style={{ marginBottom: "20px" }}>
          <label>Select your bus number:</label>
          <select
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", marginTop: "10px" }}
          >
            <option value="">-- Choose Bus Number --</option>
            <option value="101">Bus 101</option>
            <option value="202">Bus 202</option>
            <option value="303">Bus 303</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Select your stop name:</label>
          <select
            value={stop}
            onChange={(e) => setStop(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", marginTop: "10px" }}
          >
            <option value="">-- Choose Stop --</option>
            <option value="Rajiv Nagar Stop">Rajiv Nagar Stop</option>
            <option value="Library Stop">Library Stop</option>
            <option value="City Market Stop">City Market Stop</option>
            <option value="Junction Stop">Junction Stop</option>
            <option value="Tech Park St">Tech Park St</option>
          </select>
        </div>

        <button
          onClick={handleTrack}
          style={{
            padding: "10px 20px",
            backgroundColor: "#388e3c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Show Bus Status
        </button>

        {/* Show Live Data */}
        {showDetails && (
          <>
            <div
              style={{
                padding: "20px",
                background: "#fff3e0",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                marginBottom: "20px",
              }}
            >
              <h4>Live Bus Status</h4>
              <p>
                🚍 <strong>{`Bus ${busNumber}`}</strong> is{" "}
                {busDelays[busNumber] || 3.2} km from <strong>{stop}</strong>.
              </p>
              <p>🕒 ETA at {stop}: {getETA()} mins</p>
            </div>

            {/* Google Map */}
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={busPosition}
                zoom={15}
              >
                <Marker position={busPosition} />
              </GoogleMap>
            ) : (
              <p>Loading Map...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TrackBus;
