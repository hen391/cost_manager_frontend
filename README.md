# Cost Manager Frontend

The Cost Manager Frontend is a React-based web application that helps users track and manage their expenses. It allows users to add costs, generate monthly reports, view category-wise expense distribution via pie charts, and edit existing expenses. The application uses IndexedDB for local data storage and is styled using Material-UI (MUI).

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage Instructions](#usage-instructions)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

---

## Features
- Add new expenses with a sum, category, description, and date.
- View expenses by month and year.
- Generate a pie chart to visualize category-wise expense distribution.
- Edit existing expenses.
- Export monthly reports to CSV.

---

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Material-UI (MUI)**: Component library for styling the application.
- **IndexedDB**: Local database for storing expense data.
- **Chart.js**: Library for creating pie charts.

---

## Setup and Installation

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Git](https://git-scm.com/)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/cost_manager_frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cost_manager_frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

---

## Usage Instructions

### Add a New Expense
1. Select the **Add Cost** option from the sidebar.
2. Fill in the details (sum, category, description, date).
3. Click **Add Expense** to save it.

### Generate Monthly Reports
1. Select the **Monthly Report** option from the sidebar.
2. Use the search bar to filter expenses or click **Export to CSV** to download the report.

### Edit an Expense
1. Select the **Edit Expense** option from the sidebar.
2. Choose an expense from the dropdown, modify the details, and click **Save Changes**.

---

## Project Structure
```
cost_manager_frontend/
├── dist/                        # Build output directory (auto-generated after running `npm run build`)
│   ├── index.html               # Main HTML file for the React app
│   └── bundle.js              
├── src/
│   ├── components/
│   │   ├── add_cost_form.jsx         # Component for adding new cost entries
│   │   ├── category_pie_chart.jsx    # Component for displaying category-wise pie chart
│   │   ├── edit_expense_form.jsx     # Component for editing existing expenses
│   │   ├── monthly_report.jsx        # Component for generating and exporting monthly reports
│   │   ├── sidebar.jsx               # Sidebar navigation component
│   ├── app.jsx                       # Main application component
│   ├── idb.js                        # IndexedDB wrapper for database operations
│   ├── index.js                      # Entry point for the React application
├── package.json                     # Project configuration and dependencies
├── package-lock.json                # Dependency tree lock file
├── README.md                        # Documentation for the project
├── .gitignore                       # Files and directories to ignore in Git
├── node_modules/                    # Installed dependencies (auto-generated)
```

---

## Deployment

### Steps to Deploy on Render.com
1. Build the project:
   ```bash
   npm run build
   ```

2. The build folder (`dist`) will be created. Deploy this folder on Render or another hosting service.

3. Add the live deployment URL to the project documentation.

---

