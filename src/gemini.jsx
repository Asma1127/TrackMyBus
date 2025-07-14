import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAPg3sU0rXqekYpy2Z9A6CyPRWiciBUqfU");

const Gemini = () => {
  const [messages, setMessages] = useState([
    { sender: "gemini", text: "Hi! I'm Gemini. Ask me anything about your college bus 🚌" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { sender: "gemini", text }]);
    } catch (err) {
      console.error("Gemini error:", err);
      setMessages((prev) => [...prev, { sender: "gemini", text: "Something went wrong." }]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#d32f2f", marginBottom: "20px" }}>
          🤖 Ask Gemini
        </h2>

        <div
          style={{
            flexGrow: 1,
            height: "400px",
            overflowY: "auto",
            background: "#f9f9f9",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: msg.sender === "user" ? "#d32f2f" : "#eeeeee",
                  color: msg.sender === "user" ? "#fff" : "#333",
                  padding: "10px 15px",
                  borderRadius: "18px",
                  maxWidth: "75%",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something like 'Where is Bus 202?'"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              marginLeft: "10px",
              backgroundColor: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gemini;
