import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../utils/adminHook.js";
import { Trash2, Pencil } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await getUsers({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure? This action cannot be undone")) return;
        try {
            const token = localStorage.getItem("token");

            await deleteUser(id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchUsers();
        } catch (err) {
            console.error("Error deleting user", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ fontSize: "18px", color: "#000", padding: "0px 10px", background: "#fff" }}>

            <h1 style={{ margin: "10px 0px" }}>Users</h1>

            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0px", borderRadius: "10px", overflow: "hidden", textAlign: "center", border: "1px solid #ccc" }}>

                <thead>
                    <tr style={{ background: "#2d6a4f", color: "#fff" }}>
                        <th style={{ padding: "10px" }}>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} style={{}}>
                            <td style={{ padding: "10px" }}>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><Pencil color="#fff" fill="#2d6a4f" size={20} strokeWidth={1.25} /></td>
                            <td><Trash2 onClick={() => handleDeleteUser(user._id)} color="#b21807" size={20} strokeWidth={1.25} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminUsers