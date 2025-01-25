import React, { useState } from 'react';
import AddCostForm from './components/AddCostForm';
import CategoryPieChart from './components/CategoryPieChart';
import Sidebar from './components/Sidebar';
import MonthlyReport from './components/MonthlyReport';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
    const [selectedComponent, setSelectedComponent] = useState('AddCostForm');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'AddCostForm':
                return <AddCostForm />;
            case 'CategoryPieChart':
                return <CategoryPieChart />;
            case 'MonthlyReport':
                return <MonthlyReport />;
            default:
                return <AddCostForm />;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            {isSidebarOpen && <Sidebar onSelectComponent={setSelectedComponent} />}
            <div style={{ flex: 1, position: 'relative' }}>
                <IconButton onClick={toggleSidebar} style={{ position: 'absolute', top: 10, left: 10 }}>
                    <MenuIcon />
                </IconButton>
                {renderComponent()}
            </div>
        </div>
    );
}

export default App;
