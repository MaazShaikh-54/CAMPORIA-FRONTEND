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
        <div>
            <h1>Users</h1>
            <p>Welcome to the Users Page! Here you can manage users, view reports, and perform administrative tasks.</p>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><Pencil color="#daa520" size={20} strokeWidth={1.25} /></td>
                            <td><Trash2 onClick={() => handleDeleteUser(user._id)} color="#b21807" size={20} strokeWidth={1.25} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminUsers