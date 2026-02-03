import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <div className="page-container animate-fade-in">
                    <Outlet />
                </div>
            </main>

            <style>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          margin-left: 260px; /* Width of sidebar */
          flex: 1;
          background-color: var(--background-color);
          min-height: 100vh;
          width: calc(100% - 260px);
        }

        .page-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
        </div>
    );
};

export default Layout;
