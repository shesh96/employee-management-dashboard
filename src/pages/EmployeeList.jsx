import { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search, Printer } from 'lucide-react';

const EmployeeList = () => {
    const { employees, deleteEmployee, updateEmployee } = useEmployees();
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    // Filter Logic setup
    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender = genderFilter === 'All' || emp.gender === genderFilter;
        const matchesStatus = statusFilter === 'All' ||
            (statusFilter === 'Active' ? emp.active : !emp.active);

        return matchesSearch && matchesGender && matchesStatus;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id);
        }
    };

    const handleToggleStatus = (employee) => {
        updateEmployee(employee.id, { ...employee, active: !employee.active });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="employee-list">
            <div className="page-header">
                <div>
                    <h1>Employees</h1>
                    <p>Manage your team members</p>
                </div>
                <div className="actions">
                    <button onClick={handlePrint} className="btn btn-outline">
                        <Printer size={18} />
                        Print List
                    </button>
                    <Link to="/employees/add" className="btn btn-primary">
                        <Plus size={18} />
                        Add Employee
                    </Link>
                </div>
            </div>

            <div className="filters-card card mb-6">
                <div className="search-box">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="input pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select
                        className="select"
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                    >
                        <option value="All">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <select
                        className="select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="table-container shadow-sm">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee Info</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>State</th>
                            <th>Status (Toggle)</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>
                                        <div className="emp-info">
                                            <img src={emp.image || 'https://via.placeholder.com/40'} alt="" className="avatar-sm" />
                                            <div>
                                                <div className="emp-name">{emp.fullName}</div>
                                                <div className="emp-id">ID: {emp.id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.dob}</td>
                                    <td>{emp.state}</td>
                                    <td>
                                        <div
                                            className={`status-toggle ${emp.active ? 'active' : ''}`}
                                            onClick={() => handleToggleStatus(emp)}
                                            title="Click to toggle status"
                                        >
                                            <div className="toggle-circle"></div>
                                            <span className="toggle-text">{emp.active ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/employees/edit/${emp.id}`} className="icon-btn text-primary" title="Edit">
                                                <Edit size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(emp.id)} className="icon-btn text-danger" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-8">
                                    No employees found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
        }
        
        .actions {
          display: flex;
          gap: 1rem;
        }

        .filters-card {
          display: flex;
          gap: 1rem;
          align-items: center;
          padding: 1rem;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 2;
          min-width: 200px;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }

        .pl-10 { padding-left: 2.5rem; }

        .filter-group {
          display: flex;
          gap: 1rem;
          flex: 1;
        }

        .emp-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatar-sm {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-color);
        }

        .emp-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .emp-id {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .icon-btn {
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          background-color: var(--surface-hover);
        }
        
        /* Interactive Toggle Styles */
        .status-toggle {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem 0.25rem 0.25rem;
            background-color: #f1f5f9; /* Slate 100 */
            border-radius: 999px;
            cursor: pointer;
            transition: var(--transition);
            user-select: none;
            border: 1px solid transparent;
        }
        
        .status-toggle.active {
            background-color: #dcfce7; /* Green 100 */
            border-color: #bbf7d0;
        }
        
        .toggle-circle {
            width: 16px;
            height: 16px;
            background-color: #94a3b8;
            border-radius: 50%;
            transition: var(--transition);
        }
        
        .status-toggle.active .toggle-circle {
            background-color: #16a34a; /* Green 600 */
        }
        
        .toggle-text {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--text-secondary);
        }
        
        .status-toggle.active .toggle-text {
            color: #15803d; /* Green 700 */
        }

        .text-primary { color: var(--primary-color); }
        .text-danger { color: var(--danger-color); }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
        .mb-6 { margin-bottom: 1.5rem; }

        @media print {
          .sidebar, .actions, .filters-card {
            display: none;
          }
          .main-content {
            margin-left: 0;
            width: 100%;
          }
          .page-container {
            padding: 0;
          }
           /* Hide Actions column in print */
          .table th:nth-child(6),
          .table td:nth-child(6) {
            display: none;
          }
        }
      `}</style>
        </div>
    );
};

export default EmployeeList;
