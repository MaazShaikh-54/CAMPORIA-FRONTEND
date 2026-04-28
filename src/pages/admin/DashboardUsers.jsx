import { useState, useEffect } from "react";
import { getUsers } from "../../utils/adminHook.js";

const DashboardUsers = () => {
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
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardUsers