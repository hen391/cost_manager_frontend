import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PieChartIcon from '@mui/icons-material/PieChart';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';

const Sidebar = ({ onSelectComponent }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box 
            sx={{ 
                width: isOpen ? '280px' : '0',
                height: '100%',
                overflow: 'hidden',
                transition: 'width 0.3s ease',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                padding: isOpen ? '32px 20px' : '0',
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
