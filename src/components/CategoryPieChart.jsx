import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import IDBWrapper from '../idb';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: []
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            const idb = new IDBWrapper('CostManagerDB', 1);
            const costs = await idb.getCostsByMonthYear(new Date().getMonth() + 1, new Date().getFullYear());
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
    }, []);

    console.log('Chart data before rendering:', chartData);

    return (
        <div>
            <h2>Expenses by Category</h2>
            <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                <Pie data={chartData} options={{
                    plugins: {
                        legend: {
                            display: chartData.labels.length > 0
                        }
                    },
                    maintainAspectRatio: false
                }} />
            </div>
        </div>
    );
};

export default CategoryPieChart; 