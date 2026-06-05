import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { getCampsites, addCampsite, updateCampsite, deleteCampsite } from "../../utils/adminHook.js";
import {
    Trash2,
    Pencil,
    X,
    Eye,
    Info,
    Image,
    Tent,
    IndianRupee,
    Clock3,
} from 'lucide-react';
import './admin-campsites.css';

const CampsiteRow = React.memo(
    ({ campsite, index, setEditingCampsite, handleDeleteCampsite, setPreviewImages, setPreviewIndex }) => (
        <tr className="admin-table-row">
            <td>{index + 1}</td>
            <td>{campsite.name}</td>
            <td>{campsite.location}</td>
            <td>₹{Number(campsite.price || 0).toFixed(2)}</td>

            <td>
                <button
                    type="button"
                    className="image-preview-btn"
                    onClick={() => {
                        const images = Array.isArray(campsite.imageUrl)
                            ? campsite.imageUrl
                            : [campsite.imageUrl];

                        setPreviewImages(images.filter(Boolean));
                        setPreviewIndex(0);
                    }}
                >
                    <Eye size={18} />
                    <span>
                        {Array.isArray(campsite.imageUrl)
                            ? campsite.imageUrl.length
                            : 1}
                    </span>
                </button>
            </td>

            <td className="wrap-cell">
                {Array.isArray(campsite.feature)
                    ? campsite.feature.join(", ")
                    : campsite.feature}
            </td>

            <td className="wrap-cell">
                {Array.isArray(campsite.amenities)
                    ? campsite.amenities.join(", ")
                    : campsite.amenities}
            </td>

            <td>{campsite.campsiteType}</td>
            <td>{campsite.campsiteSize}</td>
            <td>{campsite.capacity}</td>
            <td>{campsite.checkInTime}</td>
            <td>{campsite.checkOutTime}</td>
            <td>{campsite.isAvailable ? "Yes" : "No"}</td>
            <td>{campsite.reviews?.length || 0}</td>

            <td>
                <Pencil
                    onClick={() => setEditingCampsite(campsite)}
                    color="#fff"
                    fill="#2d6a4f"
                    size={20}
                    strokeWidth={1.25}
                    style={{ cursor: "pointer" }}
                />
            </td>

            <td>
                <Trash2
                    onClick={() => handleDeleteCampsite(campsite._id)}
                    color="#b21807"
                    size={20}
                    strokeWidth={1.25}
                    style={{ cursor: "pointer" }}
                />
            </td>
        </tr>
    )
);

CampsiteRow.displayName = 'CampsiteRow';
CampsiteRow.propTypes = {
    campsite: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        location: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        imageUrl: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        feature: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        amenities: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        campsiteType: PropTypes.string,
        campsiteSize: PropTypes.string,
        capacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        checkInTime: PropTypes.string,
        checkOutTime: PropTypes.string,
        isAvailable: PropTypes.bool,
        reviews: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    index: PropTypes.number.isRequired,
    setEditingCampsite: PropTypes.func.isRequired,
    handleDeleteCampsite: PropTypes.func.isRequired,
    setPreviewImages: PropTypes.func.isRequired,
    setPreviewIndex: PropTypes.func.isRequired,
};

const AdminCampsites = () => {
    const [campsites, setCampsites] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCampsite, setEditingCampsite] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewImages, setPreviewImages] = useState([]);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [page, setPage] = useState(1);

    const perPage = 10;

    const displayedCampsites = React.useMemo(
        () =>
            campsites.slice(
                (page - 1) * perPage,
                page * perPage
            ),
        [campsites, page]
    );
    const totalPages = Math.max(
        1,
        Math.ceil(campsites.length / perPage)
    );

    const fetchCampsites = useCallback(async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await getCampsites({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCampsites(res.data);
        } catch (err) {
            console.error("Error fetching campsites:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleAddCampsite = useCallback(async (e) => {
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
                capacity: parseInt(formData.get("capacity"), 10),
                isAvailable: formData.get("isAvailable") === "true",
                checkInTime: formData.get("checkInTime"),
                checkOutTime: formData.get("checkOutTime"),
            };
            await addCampsite(newCampsite, { headers: { Authorization: `Bearer ${token}` } });
            await fetchCampsites();
            setShowAddModal(false);
        } catch (err) {
            console.error("Error adding campsite", err);
        }
    }, [fetchCampsites]);

    const handleUpdateCampsite = useCallback(async (e) => {
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
                capacity: parseInt(formData.get("capacity"), 10),
                isAvailable: formData.get("isAvailable") === "true",
                checkInTime: formData.get("checkInTime"),
                checkOutTime: formData.get("checkOutTime"),
            };
            await updateCampsite(editingCampsite._id, updatedData, { headers: { Authorization: `Bearer ${token}` } });
            await fetchCampsites();
            setEditingCampsite(null);
        } catch (err) {
            console.error("Error updating campsite", err);
        }
    }, [editingCampsite, fetchCampsites]);

    const handleDeleteCampsite = useCallback(async (id) => {
        if (!window.confirm("Are you sure? This action cannot be undone")) return;
        try {
            const token = localStorage.getItem("token");
            await deleteCampsite(id, { headers: { Authorization: `Bearer ${token}` } });
            await fetchCampsites();
        } catch (err) {
            console.error("Error deleting campsite", err);
        }
    }, [fetchCampsites]);

    useEffect(() => {
        fetchCampsites();
    }, [fetchCampsites]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    if (loading) {
        return <div className="Loading">Loading campsites...</div>;
    }

    return (
        <div className="admin-campsites">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h1 style={{ margin: "10px 0px" }}>Campsites</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="admin-button"
                >
                    Add Campsite
                </button>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr style={{ background: "#2d6a4f", color: "#fff" }}>
                            <th>No</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Feature</th>
                            <th>Amenities</th>
                            <th>Campsite Type</th>
                            <th>Campsite Size</th>
                            <th>Capacity</th>
                            <th>Check-in Time</th>
                            <th>Check-out Time</th>
                            <th>Availability</th>
                            <th>Reviews</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedCampsites.length === 0 ? (
                            <tr>
                                <td colSpan={16}>
                                    No campsites found
                                </td>
                            </tr>
                        ) : (
                            displayedCampsites.map((campsite, index) => (
                                <CampsiteRow
                                    key={campsite._id}
                                    campsite={campsite}
                                    index={(page - 1) * perPage + index}
                                    setEditingCampsite={setEditingCampsite}
                                    handleDeleteCampsite={handleDeleteCampsite}
                                    setPreviewImages={setPreviewImages}
                                    setPreviewIndex={setPreviewIndex}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>

            {editingCampsite && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <X onClick={() => setEditingCampsite(null)} size={20} style={{ position: "absolute", top: 15, right: 15, cursor: "pointer" }} />
                        <h2 style={{ marginBottom: "20px" }}>Edit Campsite</h2>
                        <form onSubmit={handleUpdateCampsite}>
                            <div className="form-section">
                                <div className="form-section-title">
                                    <Info size={16} />
                                    <span>Basic Information</span>
                                </div>

                                <div className="form-grid two-column">
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={editingCampsite.name}
                                        placeholder="Name"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="location"
                                        defaultValue={editingCampsite.location}
                                        placeholder="Location"
                                        required
                                    />
                                </div>

                                <textarea
                                    name="description"
                                    defaultValue={editingCampsite.description}
                                    placeholder="Description"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">
                                    <Image size={16} />
                                    <span>Images & Content</span>
                                </div>

                                <input
                                    type="text"
                                    name="imageUrl"
                                    defaultValue={
                                        Array.isArray(editingCampsite.imageUrl)
                                            ? editingCampsite.imageUrl.join(", ")
                                            : editingCampsite.imageUrl
                                    }
                                    placeholder="Image URLs (comma separated)"
                                    required
                                />

                                <input
                                    type="text"
                                    name="feature"
                                    defaultValue={
                                        Array.isArray(editingCampsite.feature)
                                            ? editingCampsite.feature.join(", ")
                                            : editingCampsite.feature
                                    }
                                    placeholder="Features (comma separated)"
                                />

                                <input
                                    type="text"
                                    name="amenities"
                                    defaultValue={
                                        Array.isArray(editingCampsite.amenities)
                                            ? editingCampsite.amenities.join(", ")
                                            : editingCampsite.amenities
                                    }
                                    placeholder="Amenities (comma separated)"
                                />
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">
                                    <Tent size={16} />
                                    <span>Campsite Details</span>
                                </div>

                                <div className="form-grid two-column">
                                    <input
                                        type="text"
                                        name="campsiteType"
                                        defaultValue={editingCampsite.campsiteType}
                                        placeholder="Campsite Type"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="campsiteSize"
                                        defaultValue={editingCampsite.campsiteSize}
                                        placeholder="Campsite Size"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">
                                    <IndianRupee size={16} />
                                    <span>Pricing & Capacity</span>
                                </div>

                                <div className="form-grid two-column">
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={editingCampsite.price}
                                        placeholder="Price"
                                        required
                                    />

                                    <input
                                        type="number"
                                        name="capacity"
                                        defaultValue={editingCampsite.capacity}
                                        placeholder="Capacity"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">
                                    <Clock3 size={16} />
                                    <span>Availability</span>
                                </div>

                                <div className="form-grid two-column">
                                    <input
                                        type="text"
                                        name="checkInTime"
                                        defaultValue={editingCampsite.checkInTime}
                                        placeholder="Check-in Time"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="checkOutTime"
                                        defaultValue={editingCampsite.checkOutTime}
                                        placeholder="Check-out Time"
                                        required
                                    />
                                </div>

                                <select
                                    name="isAvailable"
                                    defaultValue={String(editingCampsite.isAvailable)}
                                    required
                                >
                                    <option value="true">Available</option>
                                    <option value="false">Not Available</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button type="submit">
                                    Update Campsite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <X onClick={() => setShowAddModal(false)} size={20} style={{ position: "absolute", top: 15, right: 15, cursor: "pointer" }} />
                        <h2 style={{ marginBottom: "20px" }}>Add Campsite</h2>
                        <form onSubmit={handleAddCampsite}>
                            <div className="form-section">
                                <div className="form-section-title">
                                    <Info size={16} />
                                    <span>Basic Information</span>
                                </div>

                                <div className="form-grid two-column">
                                    <div className="field-group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            required
                                        />
                                        <small className="field-hint">
                                            Example: Himalayan Riverside Camp
                                        </small>
                                    </div>

                                    <div className="field-group">
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            required
                                        />
                                        <small className="field-hint">
                                            Example: Spiti Valley, Himachal Pradesh
                                        </small>
                                    </div>
                                </div>

                                <div className="field-group">
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        rows={4}
                                        required
                                    />
                                    <small className="field-hint">
                                        Short overview of campsite, surroundings and experience.
                                    </small>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">
                                    <Image size={16} />
                                    <span>Images & Content</span>
                                </div>

                                <div className="field-group">
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        placeholder="Image URLs (comma separated)"
                                        required
                                    />
                                    <small className="field-hint">
                                        Example: https://img1.jpg, https://img2.jpg
                                    </small>
                                </div>

                                <div className="field-group">
                                    <input
                                        type="text"
                                        name="feature"
                                        placeholder="Features (comma separated)"
                                    />
                                    <small className="field-hint">
                                        Example: River View, Bonfire, Mountain View
                                    </small>
                                </div>

                                <div className="field-group">
                                    <input
                                        type="text"
                                        name="amenities"
                                        placeholder="Amenities (comma separated)"
                                    />
                                    <small className="field-hint">
                                        Example: Parking, Washroom, WiFi, Electricity
                                    </small>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">
                                    <Tent size={16} />
                                    <span>Campsite Details</span>
                                </div>

                                <div className="form-grid two-column">
                                    <div className="field-group">
                                        <input
                                            type="text"
                                            name="campsiteType"
                                            placeholder="Campsite Type"
                                            required
                                        />
                                        <small className="field-hint">
                                            Example: Tent, Glamping, RV Site
                                        </small>
                                    </div>

                                    <div className="field-group">
                                        <input
                                            type="text"
                                            name="campsiteSize"
                                            placeholder="Campsite Size"
                                            required
                                        />
                                        <small className="field-hint">
                                            Example: Small, Medium, Large
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">
                                    <IndianRupee size={16} />
                                    <span>Pricing & Capacity</span>
                                </div>

                                <div className="form-grid two-column">
                                    <div className="field-group">
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="Price"
                                            required
                                        />
                                        <small className="field-hint">
                                            Example: 2500 (per night)
                                        </small>
                                    </div>

                                    <div className="field-group">
                                        <input
                                            type="number"
                                            name="capacity"
                                            placeholder="Capacity"
                                            required
                                        />
                                        <small className="field-hint">
                                            Maximum guests allowed.
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">
                                    <Clock3 size={16} />
                                    <span>Availability</span>
                                </div>

                                <div className="form-grid two-column">
                                    <div className="field-group">
                                        <input
                                            type="text"
                                            name="checkInTime"
                                            placeholder="Check-in Time"
                                            required
                                        />
                                        <small className="field-hint">
                                            Example: 02:00 PM
                                        </small>
                                    </div>

                                    <div className="field-group">
                                        <input
                                            type="text"
                                            name="checkOutTime"
                                            placeholder="Check-out Time"
                                            required
                                        />
                                        <small className="field-hint">
                                            Example: 11:00 AM
                                        </small>
                                    </div>
                                </div>

                                <div className="field-group">
                                    <select
                                        name="isAvailable"
                                        defaultValue="true"
                                        required
                                    >
                                        <option value="true">Available</option>
                                        <option value="false">Not Available</option>
                                    </select>

                                    <small className="field-hint">
                                        Controls campsite visibility for booking.
                                    </small>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="submit">
                                    Add Campsite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {previewImages.length > 0 && (
                <div className="admin-modal-overlay">
                    <div className="image-preview-modal">
                        <X
                            size={20}
                            className="image-preview-close"
                            onClick={() => setPreviewImages([])}
                        />

                        <img
                            src={previewImages[previewIndex]}
                            alt={`Preview ${previewIndex + 1}`}
                            className="preview-image"
                        />

                        {previewImages.length > 1 && (
                            <div className="carousel-controls">
                                <button
                                    onClick={() =>
                                        setPreviewIndex((prev) =>
                                            prev === 0
                                                ? previewImages.length - 1
                                                : prev - 1
                                        )
                                    }
                                >
                                    Previous
                                </button>

                                <span>
                                    {previewIndex + 1} / {previewImages.length}
                                </span>

                                <button
                                    onClick={() =>
                                        setPreviewIndex((prev) =>
                                            prev === previewImages.length - 1
                                                ? 0
                                                : prev + 1
                                        )
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCampsites;