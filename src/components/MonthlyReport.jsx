import React, { useState, useEffect } from 'react';
import IDBWrapper from '../idb';
import { Box, Typography, Select, MenuItem, Card, CardContent, Button, TextField } from '@mui/material';
import Fuse from 'fuse.js';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

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

    useEffect(() => {
        const fuse = new Fuse(reportData, {
            keys: ['category', 'description', 'date'],
            threshold: 0.3
        });
        const filteredData = searchTerm ? fuse.search(searchTerm).map(result => result.item) : reportData;
        setFilteredData(filteredData);
    }, [reportData, searchTerm]);

    const totalExpenses = reportData.length;
    const averageExpense = totalExpenses > 0 ? (totalSum / totalExpenses).toFixed(2) : 0;

    const exportToCSV = () => {
        const csvRows = [
            ['Category', 'Sum', 'Description', 'Date'],
            ...reportData.map(cost => [cost.category, cost.sum, cost.description, new Date(cost.date).toLocaleDateString()]),
            [],
            ['Summary'],
            ['Total Expenses', totalExpenses],
            ['Total Sum', totalSum.toFixed(2)],
            ['Average Expense', averageExpense],
            ...Object.entries(categoryCounts).map(([category, count]) => [`${category} items`, count])
        ];

        const csvContent = csvRows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Monthly_Report_${selectedMonth}_${selectedYear}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Monthly Report
            </Typography>
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
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredData.length > 0 ? (
                <Box>
                    {filteredData.map((cost, index) => (
                        <Box key={index} sx={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: categoryColors[cost.category] || '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="body1">Category: {cost.category}</Typography>
                            <Typography variant="body1">Sum: {cost.sum}</Typography>
                            <Typography variant="body1">Description: {cost.description}</Typography>
                            <Typography variant="body1">Date: {new Date(cost.date).toLocaleDateString()}</Typography>
                        </Box>
                    ))}
                    <Card sx={{ marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Typography variant="h6" align="center">Summary</Typography>
                            <Typography variant="body1">Total Expenses: {totalExpenses}</Typography>
                            <Typography variant="body1">Total Sum: {totalSum.toFixed(2)}</Typography>
                            <Typography variant="body1">Average Expense: {averageExpense}</Typography>
                            {Object.entries(categoryCounts).map(([category, count]) => (
                                <Typography key={category} variant="body2">{category}: {count} items</Typography>
                            ))}
                        </CardContent>
                    </Card>
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button variant="contained" onClick={exportToCSV}>
                            Export to CSV
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Typography variant="body1">No expenses found for the selected month and year.</Typography>
            )}
        </Box>
    );
};

export default MonthlyReport;
