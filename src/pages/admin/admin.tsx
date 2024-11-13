import Dashboard from '../dashboard/dashboard';
import { useState, useEffect } from 'react';
import styles from './admin.module.scss';
import { fetchArchivedUsers, fetchUsers } from '../../services/api';

const Admin: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [databis, setDatabis] = useState<any[]>([]);

    useEffect(() => {
        const loadAdminInfo = async () => {
            try {
                const response = await fetchArchivedUsers();
                setData(response); 
                console.log(response); 

                const responsebis = await fetchUsers();
                setDatabis(responsebis); 
                console.log(responsebis); 

            } catch (error) {
                console.error('Erreur lors de la récupération des informations', error);
            }
        };

        loadAdminInfo();
    }, []);

    return (
        <div className={styles.container}>
            <Dashboard />
            
            <h2>Archived Users</h2>
            <div>
                {data && data.length > 0 ? (
                    data.map((user, index) => (
                        <div key={index}>
                            <p>First Name: {user.first_name}</p>
                            <p>Last Name: {user.last_name}</p>
                            <p>Email: {user.email}</p>
                            <p>Position: {user.position}</p>
                            <p>Hire Date: {user.hire_date}</p>
                            <p>Salary: {user.salary}</p>
                            <p>Is Admin: {user.is_admin ? "Yes" : "No"}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No archived users found.</p>
                )}
            </div>

            <h2>Current Users</h2>
            <div>
                {databis && databis.length > 0 ? (
                    databis.map((user, index) => (
                        <div key={index}>
                            <p>First Name: {user.first_name}</p>
                            <p>Last Name: {user.last_name}</p>
                            <p>Email: {user.email}</p>
                            <p>Position: {user.position}</p>
                            <p>Hire Date: {user.hire_date}</p>
                            <p>Salary: {user.salary}</p>
                            <p>Is Admin: {user.is_admin ? "Yes" : "No"}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default Admin;
