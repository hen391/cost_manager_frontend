import React, { useState } from 'react';
import Add_cost_form from './components/add_cost_form';
import Category_pie_chart from './components/category_pie_chart';
import Sidebar from './components/sidebar';
import Monthly_report from './components/monthly_report';
import Edit_expense_form from './components/edit_expense_form';
// src/app.jsx
/**
 * Main application component.
 */
import { IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
    const [selectedComponent, setSelectedComponent] = useState('AddCostForm');
    /**
     * Handles sidebar navigation by setting the selected component.
     * @param {string} component - The name of the component to display.
     */
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'AddCostForm':
                return <Add_cost_form />;
            case 'CategoryPieChart':
                return <Category_pie_chart />;
            case 'MonthlyReport':
                return <Monthly_report />;
            case 'EditExpenseForm':
                return <Edit_expense_form />;
            default:
                return <Add_cost_form />;
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
