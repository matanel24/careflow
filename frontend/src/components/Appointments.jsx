import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/appointments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load appointments");
        return res.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>טוען תורים...</p>;
  if (error) return <p style={{ color: "red" }}>שגיאה: {error}</p>;

  return (
    <div dir="rtl">
      <h2>תורים קרובים</h2>
      {appointments.length === 0 ? (
        <p>אין תורים להצגה.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>מטופל</th>
              <th>רופא</th>
              <th>התמחות</th>
              <th>מועד התור</th>
              <th>סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td>{apt.patient_name}</td>
                <td>{apt.doctor_name}</td>
                <td>{apt.specialty}</td>
                <td>{new Date(apt.appointment_time).toLocaleString("he-IL")}</td>
                <td>{apt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}