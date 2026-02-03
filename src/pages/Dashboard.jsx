import { useEmployees } from '../context/EmployeeContext';
import { Users, UserCheck, UserX } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card stat-card">
        <div className={`stat-icon bg-${color}`}>
            <Icon size={24} color={`var(--${color}-color)`} />
        </div>
        <div className="stat-info">
            <p className="stat-title">{title}</p>
            <h3 className="stat-value">{value}</h3>
        </div>
        <style>{`
      .stat-card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }
      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bg-primary { background-color: #eef2ff; }
      .bg-success { background-color: #dcfce7; }
      .bg-secondary { background-color: #f1f5f9; }
      
      .stat-title {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin-bottom: 0.25rem;
      }
      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
      }
    `}</style>
    </div>
);

const Dashboard = () => {
    const { employees } = useEmployees();

    const total = employees.length;
    const active = employees.filter(e => e.active).length;
    const inactive = total - active;

    return (
        <div className="dashboard">
            <div className="header mb-6">
                <h1>Dashboard Overview</h1>
                <p>Welcome to the employee management system.</p>
            </div>

            <div className="stats-grid">
                <StatCard
                    title="Total Employees"
                    value={total}
                    icon={Users}
                    color="primary"
                />
                <StatCard
                    title="Active Employees"
                    value={active}
                    icon={UserCheck}
                    color="success"
                />
                <StatCard
                    title="Inactive Employees"
                    value={inactive}
                    icon={UserX}
                    color="secondary"
                />
            </div>

            <style>{`
        .mb-6 { margin-bottom: 2rem; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
