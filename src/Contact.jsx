import React, { useEffect, useState } from "react";

const Contact = () => {
  const contacts = [
    {
      busNumber: "Bus 101",
      driver: "Mr. Ravi Kumar",
      driverPhone: "+91 98765 43210",
      faculty: "Prof. Meena Sharma",
      facultyEmail: "meena.sharma@college.edu"
    },
    {
      busNumber: "Bus 202",
      driver: "Mr. Arul Raj",
      driverPhone: "+91 98456 78901",
      faculty: "Dr. Ramesh Iyer",
      facultyEmail: "ramesh.iyer@college.edu"
    },
    {
      busNumber: "Bus 303",
      driver: "Mr. Suresh Babu",
      driverPhone: "+91 99123 45678",
      faculty: "Prof. Anitha Devi",
      facultyEmail: "anitha.devi@college.edu"
    }
  ];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100); // delay to trigger animation
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        minHeight: "calc(100vh - 70px)",
        padding: "40px",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <h2 style={{ textAlign: "center", color: "white", marginBottom: "30px" }}>
        📞 Contact Bus Coordinators
      </h2>

      <div style={{ maxWidth: "800px", margin: "auto" }}>
        <style>
          {`
            .slide-in {
              opacity: 0;
              transform: translateX(-50px);
              animation: slideIn 0.6s ease forwards;
            }

            .slide-in.delay-1 { animation-delay: 0.2s; }
            .slide-in.delay-2 { animation-delay: 0.4s; }
            .slide-in.delay-3 { animation-delay: 0.6s; }

            @keyframes slideIn {
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}
        </style>

        {contacts.map((contact, idx) => (
          <div
            key={idx}
            className={visible ? `slide-in delay-${idx + 1}` : ""}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{ color: "#b71c1c", marginBottom: "10px" }}>{contact.busNumber}</h3>
            <p><strong>Driver:</strong> {contact.driver}</p>
            <p><strong>Phone:</strong> <a href={`tel:${contact.driverPhone}`} style={{ color: "#d32f2f" }}>{contact.driverPhone}</a></p>
            <p><strong>Faculty-in-charge:</strong> {contact.faculty}</p>
            <p><strong>Email:</strong> <a href={`mailto:${contact.facultyEmail}`} style={{ color: "#d32f2f" }}>{contact.facultyEmail}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
