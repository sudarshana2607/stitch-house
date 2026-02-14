import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Measurements() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    customer: "",
    chest: "",
    waist: "",
    extraMeasurements: ""   
  });
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!form.customer) return;

    if (editId !== null) {
      const updatedData = data.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );
      setData(updatedData);
      setEditId(null);
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }

    setForm({ customer: "", chest: "", waist: "", extraMeasurements: "" }); // ✅ Reset added field
  };

  const handleEdit = (item) => {
    setForm({
      customer: item.customer,
      chest: item.chest,
      waist: item.waist,
      extraMeasurements: item.extraMeasurements || ""  // ✅ Added here
    });
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  };

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
            {editId !== null ? "Update" : "Save"}
          </button>
        </div>

        {data.map((m) => (
          <div key={m.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                {m.customer} - Chest: {m.chest} - Waist: {m.waist} 
                {m.extraMeasurements && ` - Extra: ${m.extraMeasurements}`}
              </span>

              <div>
                <button
                  onClick={() => handleEdit(m)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(m.id)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Measurements;
