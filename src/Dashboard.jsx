import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [showTimetable, setShowTimetable] = useState(false);
  const [visible, setVisible] = useState(false);

  const busStyle = {
    display: "inline-block",
    fontSize: "40px",
    animation: "moveIcon 3s ease-in-out infinite",
  };

  const clockStyle = {
    display: "inline-block",
    fontSize: "28px",
    animation: "moveIcon 3s ease-in-out infinite",
  };

  const timetable = [
    { bus: "Bus 101", stop: "Rajiv Nagar Stop", time: "07:30 AM" },
    { bus: "Bus 101", stop: "Library Stop", time: "07:50 AM" },
    { bus: "Bus 202", stop: "City Market Stop", time: "08:00 AM" },
    { bus: "Bus 202", stop: "Tech Park Stop", time: "08:20 AM" },
    { bus: "Bus 303", stop: "Junction Stop", time: "08:15 AM" },
    { bus: "Bus 303", stop: "Rajiv Nagar Stop", time: "08:35 AM" },
  ];

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes moveIcon {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(10px); }
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .slide-box {
            animation: slideIn 0.6s ease forwards;
          }

          .track-button {
            margin-top: 30px;
            background-color: rgba(255, 0, 0, 0.7);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 600;
            transition: background-color 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 250px;
            margin: 30px auto 0 auto;
            text-align: center;
          }
          .track-button:hover {
            background-color: #b71c1c;
          }
          .timetable-button {
            background-color: rgba(0, 123, 255, 0.8);
          }
          .timetable-button:hover {
            background-color: #004a99;
          }

          .modal-backdrop {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-box {
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            text-align: center;
          }
          .modal-box h3 {
            margin-bottom: 20px;
            color: #d32f2f;
          }
          .modal-box table {
            width: 100%;
            border-collapse: collapse;
          }
          .modal-box th, .modal-box td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
          }
          .modal-box th {
            background-color: #f2f2f2;
          }
          .close-btn {
            margin-top: 20px;
            background-color: #d32f2f;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          }
          .close-btn:hover {
            background-color: #b71c1c;
          }
        `}
      </style>

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
        <div
          className={visible ? "slide-box" : ""}
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            opacity: 0,
          }}
        >
          <h2 style={{ color: "#d32f2f", marginBottom: "20px" }}>
            🎉 Welcome to the Dashboard
          </h2>
          <p style={{ fontSize: "16px" }}>
            Logged in as <strong>{user?.email}</strong>
          </p>

          <button
            className="track-button"
            onClick={() => navigate("/track-bus")}
            aria-label="Track My Bus"
          >
            <span style={busStyle} role="img" aria-label="bus">
              🚌
            </span>
            <span
              style={{ display: "inline-block", position: "relative", top: "6px" }}
            >
              Track My Bus
            </span>
          </button>

          <button
            className="track-button timetable-button"
            onClick={() => setShowTimetable(true)}
            aria-label="Bus Timetable"
          >
            <span style={clockStyle} role="img" aria-label="clock">
              🕒
            </span>
            <span
              style={{ display: "inline-block", position: "relative", top: "-1px" }}
            >
              Bus Timetable
            </span>
          </button>
        </div>
      </div>

      {showTimetable && (
        <div className="modal-backdrop" onClick={() => setShowTimetable(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>📅 Bus Timetable</h3>
            <table>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Stop</th>
                  <th>Arrival</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map(({ bus, stop, time }, idx) => (
                  <tr key={idx}>
                    <td>{bus}</td>
                    <td>{stop}</td>
                    <td>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-btn" onClick={() => setShowTimetable(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
