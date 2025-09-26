import React, { useState } from "react";
import API from "../api";

const TicketForm = ({ onTicketCreated }) => {
  const [form, setForm] = useState({ name: "", issue: "", priority: "Low" });
  const [success, setSuccess] = useState(false); // <-- added success state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/tickets", form);
      setForm({ name: "", issue: "", priority: "Low" });
      setSuccess(true); // <-- show success message
      if (onTicketCreated) onTicketCreated();

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {success && (
        <p className="max-w-lg mx-auto mb-4 p-3 bg-green-300 text-green-800 rounded-lg text-center">
          ✅ Your problem has been recorded and will be solved soon.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 mb-6 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎫 Create Ticket</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="issue"
          value={form.issue}
          onChange={handleChange}
          placeholder="Describe your issue"
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Ticket
        </button>
      </form>
    </>
  );
};

export default TicketForm;
