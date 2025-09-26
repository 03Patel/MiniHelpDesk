import React, { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token"); // check if admin is logged in

  const fetchTickets = async () => {
    try {
      const res = await API.get("/auth/tickets"); // public endpoint
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    if (!token) return; // prevent non-admins from updating
    try {
      await API.put(`/auth/tickets/${id}`, { status }); // protected route
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTicket = async (id) => {
    if (!token) return; // only admin can delete
    try {
          await API.delete(`/auth/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // <--- send token
      },
    });
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Tickets Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Issue</th>
              <th className="p-3 border">Priority</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Created At</th>
              {token && <th className="p-3 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50 transition">
                <td className="p-3 border">{t.name}</td>
                <td className="p-3 border">{t.issue}</td>
                <td className="p-3 border font-medium">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      t.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : t.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {t.priority}
                  </span>
                </td>
                <td className="p-3 border">{t.status}</td>
                <td className="p-3 border">
                  {new Date(t.createdAt).toLocaleString()}
                </td>
                {token && (
                  <td className="p-3 border flex gap-2">
                    <select
                      value={t.status}
                      onChange={(e) => updateStatus(t._id, e.target.value)}
                      className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Closed</option>
                    </select>
                    <button
                      onClick={() => deleteTicket(t._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
