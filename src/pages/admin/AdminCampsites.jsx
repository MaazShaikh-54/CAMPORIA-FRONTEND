import { useState, useEffect } from "react";
import { getCampsites, addCampsite, updateCampsite, deleteCampsite } from "../../utils/adminHook.js";
import { Trash2, Pencil, X } from 'lucide-react';

const AdminCampsites = () => {
    const [campsites, setCampsites] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCampsite, setEditingCampsite] = useState(null);

    const fetchCampsites = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await getCampsites({ headers: { Authorization: `Bearer ${token}` } });
            setCampsites(res.data);
        } catch (err) {
            console.error("Error fetching campsites:", err);
        }
    };

    const handleAddCampsite = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData(e.target);
            const newCampsite = {
                name: formData.get("name"),
                location: formData.get("location"),
                price: parseFloat(formData.get("price")),
                description: formData.get("description"),
                imageUrl: formData.get("imageUrl").split(",").map(s => s.trim()).filter(Boolean),
                feature: formData.get("feature").split(",").map(s => s.trim()).filter(Boolean),
                amenities: formData.get("amenities").split(",").map(s => s.trim()).filter(Boolean),
                campsiteType: formData.get("campsiteType"),
                campsiteSize: formData.get("campsiteSize"),
                capacity: parseInt(formData.get("capacity")),
                isAvailable: formData.get("isAvailable") === "true",
                checkInTime: formData.get("checkInTime"),
                checkOutTime: formData.get("checkOutTime"),
            };
            await addCampsite(newCampsite, { headers: { Authorization: `Bearer ${token}` } });
            setShowAddModal(false);
            fetchCampsites();
        } catch (err) {
            console.error("Error adding campsite", err);
        }
    };

    const handleUpdateCampsite = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData(e.target);
            const updatedData = {
                name: formData.get("name"),
                location: formData.get("location"),
                price: parseFloat(formData.get("price")),
                description: formData.get("description"),
                imageUrl: formData.get("imageUrl").split(",").map(s => s.trim()).filter(Boolean),
                feature: formData.get("feature").split(",").map(s => s.trim()).filter(Boolean),
                amenities: formData.get("amenities").split(",").map(s => s.trim()).filter(Boolean),
                campsiteType: formData.get("campsiteType"),
                campsiteSize: formData.get("campsiteSize"),
                capacity: parseInt(formData.get("capacity")),
                isAvailable: formData.get("isAvailable") === "true",
                checkInTime: formData.get("checkInTime"),
                checkOutTime: formData.get("checkOutTime"),
            };
            await updateCampsite(editingCampsite._id, updatedData, { headers: { Authorization: `Bearer ${token}` } });
            setEditingCampsite(null);
            fetchCampsites();
        } catch (err) {
            console.error("Error updating campsite", err);
        }
    };

    const handleDeleteCampsite = async (id) => {
        if (!window.confirm("Are you sure? This action cannot be undone")) return;
        try {
            const token = localStorage.getItem("token");
            await deleteCampsite(id, { headers: { Authorization: `Bearer ${token}` } });
            fetchCampsites();
        } catch (err) {
            console.error("Error deleting campsite", err);
        }
    };

    useEffect(() => {
        fetchCampsites();
    }, []);

    const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" };

    const thStyle = { padding: "12px 20px", whiteSpace: "nowrap" };
    const tdStyle = { padding: "12px 20px", whiteSpace: "nowrap" };

    return (
        <div style={{ fontSize: "16px", color: "#000", padding: "0px 10px", background: "#fff" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h1 style={{ margin: "10px 0px" }}>Campsites</h1>
                <button onClick={() => setShowAddModal(true)} style={{ background: "#2d6a4f", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Add Campsite</button>
            </div>

            <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #ccc" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", minWidth: "1200px" }}>
                    <thead>
                        <tr style={{ background: "#2d6a4f", color: "#fff" }}>
                            <th style={thStyle}>No</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Location</th>
                            <th style={thStyle}>Price</th>
                            <th style={thStyle}>Image</th>
                            <th style={thStyle}>Feature</th>
                            <th style={thStyle}>Amenities</th>
                            <th style={thStyle}>Campsite Type</th>
                            <th style={thStyle}>Campsite Size</th>
                            <th style={thStyle}>Capacity</th>
                            <th style={thStyle}>Check-in Time</th>
                            <th style={thStyle}>Check-out Time</th>
                            <th style={thStyle}>Availability</th>
                            <th style={thStyle}>Reviews</th>
                            <th style={thStyle}>Edit</th>
                            <th style={thStyle}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campsites.map((campsite, index) => (
                            <tr key={campsite._id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={tdStyle}>{index + 1}</td>
                                <td style={tdStyle}>{campsite.name}</td>
                                <td style={tdStyle}>{campsite.location}</td>
                                <td style={tdStyle}>₹{campsite.price.toFixed(2)}</td>
                                <td style={tdStyle}><img src={Array.isArray(campsite.imageUrl) ? campsite.imageUrl[0] : campsite.imageUrl} alt={campsite.name} style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} /></td>
                                <td style={{ ...tdStyle, maxWidth: "160px", whiteSpace: "normal" }}>{Array.isArray(campsite.feature) ? campsite.feature.join(", ") : campsite.feature}</td>
                                <td style={{ ...tdStyle, maxWidth: "160px", whiteSpace: "normal" }}>{Array.isArray(campsite.amenities) ? campsite.amenities.join(", ") : campsite.amenities}</td>
                                <td style={tdStyle}>{campsite.campsiteType}</td>
                                <td style={tdStyle}>{campsite.campsiteSize}</td>
                                <td style={tdStyle}>{campsite.capacity}</td>
                                <td style={tdStyle}>{campsite.checkInTime}</td>
                                <td style={tdStyle}>{campsite.checkOutTime}</td>
                                <td style={tdStyle}>{campsite.isAvailable ? "Yes" : "No"}</td>
                                <td style={tdStyle}>{campsite.reviews?.length || 0}</td>
                                <td style={tdStyle}><Pencil onClick={() => setEditingCampsite(campsite)} color="#fff" fill="#2d6a4f" size={20} strokeWidth={1.25} style={{ cursor: "pointer" }} /></td>
                                <td style={tdStyle}><Trash2 onClick={() => handleDeleteCampsite(campsite._id)} color="#b21807" size={20} strokeWidth={1.25} style={{ cursor: "pointer" }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingCampsite && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
                    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", width: "400px", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
                        <X onClick={() => setEditingCampsite(null)} size={20} style={{ position: "absolute", top: 15, right: 15, cursor: "pointer" }} />
                        <h2 style={{ marginBottom: "20px" }}>Edit Campsite</h2>
                        <form onSubmit={handleUpdateCampsite}>
                            <input type="text" name="name" defaultValue={editingCampsite.name} placeholder="Name" required style={inputStyle} />
                            <input type="text" name="location" defaultValue={editingCampsite.location} placeholder="Location" required style={inputStyle} />
                            <input type="number" name="price" defaultValue={editingCampsite.price} placeholder="Price" required style={inputStyle} />
                            <input type="text" name="description" defaultValue={editingCampsite.description} placeholder="Description" required style={inputStyle} />
                            <input type="text" name="imageUrl" defaultValue={Array.isArray(editingCampsite.imageUrl) ? editingCampsite.imageUrl.join(", ") : editingCampsite.imageUrl} placeholder="Image URLs (comma separated)" required style={inputStyle} />
                            <input type="text" name="feature" defaultValue={Array.isArray(editingCampsite.feature) ? editingCampsite.feature.join(", ") : editingCampsite.feature} placeholder="Features (comma separated)" style={inputStyle} />
                            <input type="text" name="amenities" defaultValue={Array.isArray(editingCampsite.amenities) ? editingCampsite.amenities.join(", ") : editingCampsite.amenities} placeholder="Amenities (comma separated)" style={inputStyle} />
                            <input type="text" name="campsiteType" defaultValue={editingCampsite.campsiteType} placeholder="Campsite Type" required style={inputStyle} />
                            <input type="text" name="campsiteSize" defaultValue={editingCampsite.campsiteSize} placeholder="Campsite Size" required style={inputStyle} />
                            <input type="number" name="capacity" defaultValue={editingCampsite.capacity} placeholder="Capacity" required style={inputStyle} />
                            <input type="text" name="checkInTime" defaultValue={editingCampsite.checkInTime} placeholder="Check-in Time" required style={inputStyle} />
                            <input type="text" name="checkOutTime" defaultValue={editingCampsite.checkOutTime} placeholder="Check-out Time" required style={inputStyle} />
                            <select name="isAvailable" defaultValue={String(editingCampsite.isAvailable)} required style={inputStyle}>
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                            <button type="submit" style={{ background: "#2d6a4f", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", width: "100%" }}>Update Campsite</button>
                        </form>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
                    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", width: "400px", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
                        <X onClick={() => setShowAddModal(false)} size={20} style={{ position: "absolute", top: 15, right: 15, cursor: "pointer" }} />
                        <h2 style={{ marginBottom: "20px" }}>Add Campsite</h2>
                        <form onSubmit={handleAddCampsite}>
                            <input type="text" name="name" placeholder="Name" required style={inputStyle} />
                            <input type="text" name="location" placeholder="Location" required style={inputStyle} />
                            <input type="number" name="price" placeholder="Price" required style={inputStyle} />
                            <input type="text" name="description" placeholder="Description" required style={inputStyle} />
                            <input type="text" name="imageUrl" placeholder="Image URLs (comma separated)" required style={inputStyle} />
                            <input type="text" name="feature" placeholder="Features (comma separated)" style={inputStyle} />
                            <input type="text" name="amenities" placeholder="Amenities (comma separated)" style={inputStyle} />
                            <input type="text" name="campsiteType" placeholder="Campsite Type" required style={inputStyle} />
                            <input type="text" name="campsiteSize" placeholder="Campsite Size" required style={inputStyle} />
                            <input type="number" name="capacity" placeholder="Capacity" required style={inputStyle} />
                            <input type="text" name="checkInTime" placeholder="Check-in Time" required style={inputStyle} />
                            <input type="text" name="checkOutTime" placeholder="Check-out Time" required style={inputStyle} />
                            <select name="isAvailable" defaultValue="true" required style={inputStyle}>
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                            <button type="submit" style={{ background: "#2d6a4f", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", width: "100%" }}>Add Campsite</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCampsites;