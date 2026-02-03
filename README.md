# Employee Management Dashboard

A comprehensive React-based application designed to manage employee records efficiently. This project demonstrates a modern, premium UI implementation using Vanilla CSS, ensuring a clean and responsive user experience without reliance on external styling frameworks.

> **🔗 Live Demo:** [Click Here to View Application] (https://employee-management-dashboard-lac-xi.vercel.app/login) 

## 📂 Project Structure

```
src/
├── assets/             # Static assets (images, icons)
├── components/         # Reusable UI components
│   └── layout/         # Sidebar, Layout wrappers
├── context/            # Global state management
│   ├── AuthContext.jsx     # Authentication logic
│   └── EmployeeContext.jsx # Employee CRUD logic
├── pages/              # Application pages
│   ├── Login.jsx           # Authentication entry point
│   ├── Dashboard.jsx       # Overview statistics
│   ├── EmployeeList.jsx    # Data table with search/filter
│   └── EmployeeForm.jsx    # Reusable Add/Edit form
├── utils/              # Helper functions (Base64 conversion)
├── App.jsx             # Main routing configuration
├── index.css           # Global design system (CSS Variables)
└── main.jsx            # Application entry point
```

## 🚀 Key Features

*   **Authentication & Security**: Secure login with strict validation logic (email format and password strength enforcement).
*   **Employee Management**: Full CRUD capabilities (Create, Read, Update, Delete) for employee records.
*   **Smart Dashboard**: Real-time overview of total, active, and inactive staff.
*   **Search & Filtering**: Combined filtering system allowing users to search by name while simultaneously filtering by gender and status.
*   **Interactive UI**: Toggle statuses directly from the list view, preview images before upload, and responsive layout adaptations.
*   **Data Persistence**: Utilizes `localStorage` to simulate a backend database, retaining data across sessions.

## 🛠️ Technology Stack

*   **Frontend Library**: React 19 (Vite)
*   **Routing**: React Router DOM
*   **Styling**: Vanilla CSS (Custom Design System with CSS Variables)
*   **State Management**: React Context API
*   **Icons**: Lucide React

## ⚙️ Setup & Execution

Follow these steps to run the application locally:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Access Application**:
    Open the local server URL provided in the terminal (typically `http://localhost:5173`).



## 💡 Design Decisions

*   **Vanilla CSS Architecture**: To meet the requirement of no external CSS frameworks, a central `index.css` file was established with specific CSS variables for colors, typography, and spacing. This ensures a consistent "premium" aesthetic and makes maintenance easier.
*   **Component Reusability**: The `EmployeeForm` is designed to be modular, handling both "Add" and "Edit" modes dynamically based on the route parameters.
*   **Client-Side "Backend"**: `localStorage` was chosen to persist data, providing a seamless user experience that mimics a real-world application's data retention.
*   **Validation UX**: Form validation is handled immediately, providing visual feedback (red borders, distinct error messages) to guide the user effectively.
