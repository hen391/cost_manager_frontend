import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import IDBWrapper from '../idb';
import { Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: []
        }]
    });

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    useEffect(() => {
        const fetchData = async () => {
            const idb = new IDBWrapper('CostManagerDB', 1);
            const costs = await idb.getCostsByMonthYear(selectedMonth, selectedYear);
            if (costs.length === 0) {
                console.warn('No costs found for the current month and year.');
                setChartData({
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: []
                    }],
                });
                return;
            }
            const categoryTotals = costs.reduce((acc, cost) => {
                acc[cost.category] = (acc[cost.category] || 0) + parseFloat(cost.sum || 0);
                return acc;
            }, {});

            setChartData({
                labels: Object.keys(categoryTotals),
                datasets: [{
                    data: Object.values(categoryTotals),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ],
                }],
            });
        };

        fetchData();
    }, [selectedMonth, selectedYear]);

    console.log('Chart data before rendering:', chartData);

    const selectStyle = {
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
        border: '1px solid #007BFF',
        fontSize: '16px',
        background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
        color: '#007BFF',
        cursor: 'pointer',
        boxShadow: '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
        transition: 'all 0.3s ease',
        appearance: 'none',
        outline: 'none',
    };

    const selectHoverStyle = {
        background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
        color: '#0056b3',
        boxShadow: 'inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff',
    };

    const handleMouseOver = (e) => {
        Object.assign(e.currentTarget.style, selectHoverStyle);
    };

    const handleMouseOut = (e) => {
        Object.assign(e.currentTarget.style, selectStyle);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Category Distribution
            </Typography>
            {chartData.labels.length > 0 ? (
                <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
                    <Pie data={chartData} options={{
                        plugins: {
                            legend: {
                                display: chartData.labels.length > 0,
                                position: 'bottom',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        label += context.raw;
                                        return label;
                                    }
                                }
                            }
                        },
                        maintainAspectRatio: false,
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        }
                    }} />
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    No expenses found for the selected month and year.
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
                <div>
                    <label htmlFor="month">Month:</label>
                    <select id="month" value={selectedMonth} onChange={handleMonthChange} style={selectStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {[...Array(12).keys()].map((month) => (
                            <option key={month + 1} value={month + 1}>{month + 1}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="year">Year:</label>
                    <select id="year" value={selectedYear} onChange={handleYearChange} style={selectStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {[...Array(10).keys()].map((yearOffset) => {
                            const year = new Date().getFullYear() - yearOffset;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CategoryPieChart; 