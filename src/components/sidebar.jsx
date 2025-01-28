// src/sidebar.jsx
/**
 * Sidebar Component
 * Provides navigation options to switch between different features of the application.
 */
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PieChartIcon from '@mui/icons-material/PieChart';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';

/**
 * Sidebar Component
 * @param {Object} props - Props passed to the component.
 * @param {Function} props.onSelectComponent - Callback to set the selected component.
 * @returns {JSX.Element} The Sidebar navigation component.
 */
const Sidebar = ({ onSelectComponent }) => {
    return (
        <Box 
            sx={{ 
                width: '280px',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 20px',
                gap: '24px'
            }}
        >
            <Typography 
                variant="h5" 
                sx={{ 
                    color: '#2c3e50',
                    fontWeight: 600,
                    textAlign: 'center',
                    marginBottom: '20px'
                }}
            >
                Cost Manager
            </Typography>

            <Button 
                variant="text" 
                onClick={() => onSelectComponent('AddCostForm')} 
                startIcon={<AddIcon />}
                sx={{ 
                    padding: '12px 20px',
                    justifyContent: 'flex-start',
                    color: '#2c3e50',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                Add Cost
            </Button>

            <Button 
                variant="text" 
                onClick={() => onSelectComponent('CategoryPieChart')} 
                startIcon={<PieChartIcon />}
                sx={{ 
                    padding: '12px 20px',
                    justifyContent: 'flex-start',
                    color: '#2c3e50',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                Category Chart
            </Button>

            <Button 
                variant="text" 
                onClick={() => onSelectComponent('MonthlyReport')} 
                startIcon={<DescriptionIcon />}
                sx={{ 
                    padding: '12px 20px',
                    justifyContent: 'flex-start',
                    color: '#2c3e50',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                Monthly Report
            </Button>

            <Button 
                variant="text" 
                onClick={() => onSelectComponent('EditExpenseForm')} 
                startIcon={<EditIcon />}
                sx={{ 
                    padding: '12px 20px',
                    justifyContent: 'flex-start',
                    color: '#2c3e50',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                Edit Expense
            </Button>
        </Box>
    );
};

export default Sidebar;
