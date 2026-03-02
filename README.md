# 🚀 Freelancer CRM Dashboard

A modern, minimal CRM dashboard built with **React (Vite)**, **Redux Toolkit**, and **React Router** that demonstrates complete state management with clean UI and soft colors.

## 📌 Experiment 5 Updates
- **Implemented Redux Toolkit**: Configured store, slices (`clientSlice`, `projectSlice`), and actions for state management.
- **Added new page**: `Reports.jsx` connected via React Router.
- **Added useMemo**: Used in `Reports.jsx` to optimize derived calculations for client revenue breakdown.
- **Implemented Context**: Created `AppContext` for global dark mode theme management.
- **Added screenshots**: Included in `/screenshots` folder.
- **Folder Structure**: Reorganized into `pages/`, `context/`, and `redux/` directories.

## ✨ Features

- ✅ Full Redux Toolkit integration with slices and selectors
- ✅ React Router for multi-page navigation (Dashboard, Projects, Clients, Reports)
- ✅ Global Context API for Dark Mode theme
- ✅ Derived state optimization using `useMemo`
- ✅ Client management (add clients)
- ✅ Project management (add, toggle payment, remove)
- ✅ Real-time revenue calculations (total, paid, pending)
- ✅ Clean, modern UI with Framer Motion animations
- ✅ Responsive design

## 📁 Folder Structure

```
src/
  components/
    Header.jsx                  # Navigation and theme toggle
    Dashboard.jsx               # Summary cards
    ClientList.jsx              # Display all clients
    ProjectList.jsx             # Display/manage projects
    AddClientForm.jsx           # Add new client
    AddProjectForm.jsx          # Add new project
  context/
    AppContext.jsx              # Global theme context
  pages/
    Home.jsx                    # Dashboard page
    Projects.jsx                # Projects management page
    Clients.jsx                 # Clients management page
    Reports.jsx                 # Financial reports page (Exp 5)
  redux/
    store.js                    # Redux store configuration
    slices/
      clientSlice.js            # Client state management
      projectSlice.js           # Project state management
      projectSelectors.js       # Memoized selectors
  App.jsx                       # Main app component with routing
  main.jsx                      # App entry point
  index.css                     # Global styles
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open Browser

Navigate to `http://localhost:5173`

