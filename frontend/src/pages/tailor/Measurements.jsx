import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

function Measurements() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    customer: "",
    chest: "",
    waist: "",
    extraMeasurements: ""   
  });
  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const fetchMeasurements = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/measurements/tailor/${user.id}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    if (!form.customer || !user) return;

    try {
      await api.post('/measurements', {
        tailor_id: user.id,
        customer_name: form.customer,
        measurements_data: {
            chest: form.chest,
            waist: form.waist,
            extraMeasurements: form.extraMeasurements
        }
      });
      setForm({ customer: "", chest: "", waist: "", extraMeasurements: "" });
      fetchMeasurements();
    } catch (error) {
      console.log(error);
    }
  };

  // Add functionality for delete is omitted since our measurement controller doesn't support it yet,
  // but if needed we can add it later. For now we just implement the Add.

  return (
    <div className="layout">
      <Sidebar role="tailor" />
      <div className="content">
        <Navbar />
        <h2>Measurements</h2>

        <div className="card">
          <input
            placeholder="Customer Name"
            value={form.customer}
            onChange={(e) =>
              setForm({ ...form, customer: e.target.value })
            }
          />
          <input
            placeholder="Chest"
            value={form.chest}
            onChange={(e) =>
              setForm({ ...form, chest: e.target.value })
            }
          />
          <input
            placeholder="Waist"
            value={form.waist}
            onChange={(e) =>
              setForm({ ...form, waist: e.target.value })
            }
          />

          {/* ✅ Extra Measurements Box */}
          <input
            placeholder="Extra Measurements (e.g. Hand width, Shoulder, etc.)"
            value={form.extraMeasurements}
            onChange={(e) =>
              setForm({ ...form, extraMeasurements: e.target.value })
            }
          />

          <button onClick={handleAdd}>
            Save
          </button>
        </div>

        {data.map((m) => (
          <div key={m.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                {m.customer_name} - Chest: {m.measurements_data?.chest || ''} - Waist: {m.measurements_data?.waist || ''} 
                {m.measurements_data?.extraMeasurements && ` - Extra: ${m.measurements_data.extraMeasurements}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Measurements;
