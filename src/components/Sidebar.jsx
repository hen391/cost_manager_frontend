import React from 'react';
import { Button, Box } from '@mui/material';

const Sidebar = ({ onSelectComponent }) => {
    return (
        <Box 
            sx={{ 
                width: '200px', 
                height: '100vh', 
                background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden'
            }}
        >
            <Button 
                variant="contained" 
                onClick={() => onSelectComponent('AddCostForm')} 
                sx={{ 
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: '#ff9a9e',
                    '&:hover': {
                        backgroundColor: '#ff7a7e',
                    }
                }}
            >
                Add Cost
            </Button>
            <Button 
                variant="contained" 
                onClick={() => onSelectComponent('CategoryPieChart')} 
                sx={{ 
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: '#fad0c4',
                    '&:hover': {
                        backgroundColor: '#f8b0a4',
                    }
                }}
            >
                Category Chart
            </Button>
            <Button 
                variant="contained" 
                onClick={() => onSelectComponent('MonthlyReport')} 
                sx={{ 
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: '#a1c4fd',
                    '&:hover': {
                        backgroundColor: '#89b3f5',
                    }
                }}
            >
                Monthly Report
            </Button>
            <Button 
                variant="contained" 
                onClick={() => onSelectComponent('EditExpenseForm')} 
                sx={{ 
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: '#fbc2eb',
                    '&:hover': {
                        backgroundColor: '#f8a1d1',
                    }
                }}
            >
                Edit Expense
            </Button>
        </Box>
    );
};

export default Sidebar;
