# 🚀 Freelancer CRM Dashboard

A modern, minimal CRM dashboard built with **React (Vite)** and **Redux Toolkit** that demonstrates complete Redux data flow with clean UI and soft colors.

## ✨ Features

- ✅ Full Redux Toolkit integration with slices and selectors
- ✅ Client management (add clients)
- ✅ Project management (add, toggle payment, remove)
- ✅ Real-time revenue calculations (total, paid, pending)
- ✅ Derived state using memoized selectors
- ✅ Clean, modern UI with cards and soft colors
- ✅ Responsive design

## 🔄 Redux Data Flow

The application demonstrates complete Redux data flow:

```
UI Event → dispatch(action) → reducer updates state → selectors recompute → UI re-renders
```

### State Structure

**clientSlice:**
- Manages client data (id, name, email)
- Actions: `addClient`

**projectSlice:**
- Manages project data (id, clientId, title, amount, paid)
- Actions: `addProject`, `togglePayment`, `removeProject`, `clearProjects`

**Selectors (Memoized):**
- `selectTotalRevenue` - Sum of all project amounts
- `selectPaidRevenue` - Sum of paid project amounts
- `selectPendingRevenue` - Sum of unpaid project amounts
- `selectTotalProjects` - Count of all projects

## 📁 Folder Structure

```
src/
  app/
    store.js                    # Redux store configuration
  features/
    clients/
      clientSlice.js            # Client state management
    projects/
      projectSlice.js           # Project state management
      projectSelectors.js       # Memoized selectors
  components/
    Header.jsx                  # Header with project count
    Dashboard.jsx               # Summary cards
    ClientList.jsx              # Display all clients
    ProjectList.jsx             # Display/manage projects
    AddClientForm.jsx           # Add new client
    AddProjectForm.jsx          # Add new project
  App.jsx                       # Main app component
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

## 🎨 UI Components

### Dashboard
Displays 4 summary cards showing:
- Total Revenue (all projects)
- Paid Revenue (paid projects only)
- Pending Revenue (unpaid projects)
- Total Projects count

### Client Management
- Add clients with name and email
- View all clients in a clean list

### Project Management
- Add projects linked to clients
- View project details with client name
- Toggle payment status (Paid/Pending)
- Remove projects
- Status badges (green = Paid, orange = Pending)

## 🧠 Redux Implementation Details

### Adding a Client
```javascript
// UI Event
<button onClick={() => dispatch(addClient({ name, email }))} />

// Reducer (clientSlice.js)
addClient: (state, action) => {
  state.clients.push({ id: Date.now(), ...action.payload });
}

// UI Re-renders automatically
```

### Toggling Payment
```javascript
// UI Event
<button onClick={() => dispatch(togglePayment(projectId))} />

// Reducer (projectSlice.js)
togglePayment: (state, action) => {
  const project = state.projects.find(p => p.id === action.payload);
  project.paid = !project.paid;
}

// Selectors recompute (selectPaidRevenue, selectPendingRevenue)
// UI re-renders with new values
```

## 🎨 Design Features

- Soft background color (#f5f6fa)
- White cards with subtle shadows
- Gradient header (purple theme)
- Rounded corners and smooth transitions
- Hover effects on cards
- Color-coded status badges
- Responsive grid layout

## 🛠️ Built With

- **React 18** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React-Redux** - React bindings for Redux
- **CSS3** - Styling

## 📝 Notes

- All data is stored in Redux (no backend)
- Unique IDs generated using `Date.now()`
- Initial dummy data included for demonstration
- Memoized selectors prevent unnecessary recalculations
- Clean separation of concerns (slices, selectors, components)

## 🎯 Learning Outcomes

This project demonstrates:
1. Redux Toolkit slice creation and configuration
2. Action dispatching from UI components
3. Reducer logic for state updates
4. Memoized selectors for derived state
5. Component subscription to Redux state
6. Complete unidirectional data flow
7. Modern React patterns (hooks, functional components)

---

**Enjoy building with Redux! 🎉**
