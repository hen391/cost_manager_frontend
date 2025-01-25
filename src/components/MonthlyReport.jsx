import React, { useState, useEffect } from 'react';
import IDBWrapper from '../idb';
import { Box, Typography, Select, MenuItem } from '@mui/material';

const categoryColors = {
    Food: '#FFEBEE',
    Transportation: '#E3F2FD',
    Entertainment: '#FFF3E0',
    Health: '#E8F5E9',
    Education: '#F3E5F5',
    Utilities: '#E0F7FA'
};

const MonthlyReport = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [reportData, setReportData] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [categoryCounts, setCategoryCounts] = useState({});

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    useEffect(() => {
        const fetchReportData = async () => {
            const idb = new IDBWrapper('CostManagerDB', 1);
            const costs = await idb.getCostsByMonthYear(selectedMonth, selectedYear);
            setReportData(costs);
            const total = costs.reduce((sum, cost) => sum + parseFloat(cost.sum || 0), 0);
            setTotalSum(total);

            const counts = costs.reduce((acc, cost) => {
                acc[cost.category] = (acc[cost.category] || 0) + 1;
                return acc;
            }, {});
            setCategoryCounts(counts);
        };

        fetchReportData();
    }, [selectedMonth, selectedYear]);

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <Select value={selectedMonth} onChange={handleMonthChange}>
                    {[...Array(12).keys()].map((month) => (
                        <MenuItem key={month + 1} value={month + 1}>{month + 1}</MenuItem>
                    ))}
                </Select>
                <Select value={selectedYear} onChange={handleYearChange}>
                    {[...Array(10).keys()].map((yearOffset) => {
                        const year = new Date().getFullYear() - yearOffset;
                        return <MenuItem key={year} value={year}>{year}</MenuItem>;
                    })}
                </Select>
            </Box>
            {reportData.length > 0 ? (
                <Box>
                    {reportData.map((cost, index) => (
                        <Box key={index} sx={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: categoryColors[cost.category] || '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="body1">Category: {cost.category}</Typography>
                            <Typography variant="body1">Sum: {cost.sum}</Typography>
                            <Typography variant="body1">Description: {cost.description}</Typography>
                            <Typography variant="body1">Date: {new Date(cost.date).toLocaleDateString()}</Typography>
                        </Box>
                    ))}
                    <Box sx={{ marginTop: '20px', padding: '10px', borderTop: '2px solid #ccc', background: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Typography variant="h6">Total Sum: {totalSum}</Typography>
                        {Object.entries(categoryCounts).map(([category, count]) => (
                            <Typography key={category} variant="body2">{category}: {count} items</Typography>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Typography variant="body1">No expenses found for the selected month and year.</Typography>
            )}
        </Box>
    );
};

export default MonthlyReport;
