import { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('employees');
        if (stored) {
            setEmployees(JSON.parse(stored));
        } else {
            // Seed initial mock data if empty
            const initialData = [
                {
                    id: '1',
                    fullName: 'Suresh Raina',
                    email: 'suresh@example.com',
                    gender: 'Male',
                    dob: '1986-11-27',
                    state: 'Uttar Pradesh',
                    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh',
                    active: true
                },
                {
                    id: '2',
                    fullName: 'Mithali Raj',
                    email: 'mithali@example.com',
                    gender: 'Female',
                    dob: '1982-12-03',
                    state: 'Rajasthan',
                    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mithali',
                    active: true
                }
            ];
            setEmployees(initialData);
            localStorage.setItem('employees', JSON.stringify(initialData));
        }
    }, []);

    // Sync to LS whenever employees change
    useEffect(() => {
        if (employees.length > 0) {
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    }, [employees]);

    const addEmployee = (employee) => {
        const newEmployee = { ...employee, id: Date.now().toString() };
        setEmployees((prev) => [...prev, newEmployee]);
    };

    const updateEmployee = (id, updatedData) => {
        setEmployees((prev) =>
            prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
        );
    };

    const deleteEmployee = (id) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};
