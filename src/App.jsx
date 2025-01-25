import React, { useState } from 'react';
import AddCostForm from './components/AddCostForm';
import CategoryPieChart from './components/CategoryPieChart';
import Sidebar from './components/Sidebar';
import MonthlyReport from './components/MonthlyReport';
import EditExpenseForm from './components/EditExpenseForm';
import { IconButton, Box } from '@mui/material';
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
            case 'EditExpenseForm':
                return <EditExpenseForm />;
            default:
                return <AddCostForm />;
        }
    };

    return (
        <Box sx={{ display: 'flex', height: 'auto', minHeight: '100vh' }}>
            {isSidebarOpen && (
                <Box sx={{ position: 'relative', height: '100%' }}>
                    <Sidebar onSelectComponent={setSelectedComponent} />
                    <IconButton 
                        onClick={toggleSidebar} 
                        sx={{ 
                            position: 'absolute', 
                            top: 10, 
                            right: -20, 
                            zIndex: 1,
                            backgroundColor: 'white',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            )}
            <Box sx={{ flex: 1, position: 'relative', height: '100%' }}>
                {!isSidebarOpen && (
                    <IconButton 
                        onClick={toggleSidebar} 
                        sx={{ 
                            position: 'absolute', 
                            top: 10, 
                            left: 10, 
                            zIndex: 1,
                            backgroundColor: 'white',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {renderComponent()}
            </Box>
        </Box>
    );
}

export default App;
