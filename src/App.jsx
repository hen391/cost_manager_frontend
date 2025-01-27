import React, { useState } from 'react';
import AddCostForm from './components/AddCostForm';
import CategoryPieChart from './components/CategoryPieChart';
import Sidebar from './components/Sidebar';
import MonthlyReport from './components/MonthlyReport';
import EditExpenseForm from './components/EditExpenseForm';
import { IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Main application component
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

// Renders the sidebar alongside the main content area.
// The main content area changes dynamically based on the selected component.
    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            overflow: 'hidden'
        }}>
            {isSidebarOpen && (
                <Box sx={{ position: 'relative' }}>
                    <Sidebar onSelectComponent={setSelectedComponent} />
                    <IconButton 
                        onClick={toggleSidebar} 
                        sx={{ 
                            position: 'absolute', 
                            top: '20px', 
                            right: '20px',
                            zIndex: 1,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: '#f8f9fa',
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            )}
            <Box sx={{ 
                flex: 1, 
                position: 'relative',
                padding: '20px',
                overflow: 'auto'
            }}>
                {!isSidebarOpen && (
                    <IconButton 
                        onClick={toggleSidebar} 
                        sx={{ 
                            position: 'fixed', 
                            top: '20px', 
                            left: '20px',
                            zIndex: 1,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: '#f8f9fa',
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Box sx={{ 
                    maxWidth: '1200px', 
                    margin: '0 auto',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    {renderComponent()}
                </Box>
            </Box>
        </Box>
    );
}

export default App;
