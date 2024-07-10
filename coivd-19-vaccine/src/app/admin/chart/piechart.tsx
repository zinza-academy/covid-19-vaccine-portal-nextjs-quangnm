import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const pieData = {
    labels: ['Đã tiêm 1 mũi', 'Đã tiêm 2 mũi trở lên', 'Chưa tiêm'],
    datasets: [
        {
            label: 'Tỉ lệ %',
            data: [27.7, 34.7, 9.2],
            backgroundColor: ['yellow', '#1AE221', '#E2281A'],
        },
    ],
};

const calculatePercentages = (data: number[]) => {
    const total = data.reduce((acc, value) => acc + value, 0);
    return data.map((value) => ((value / total) * 100).toFixed(1));
};

const PieChart = () => {
    const percentages = calculatePercentages(pieData.datasets[0].data);

    const dataWithPercentages = {
        ...pieData,
        datasets: [
            {
                ...pieData.datasets[0],
                data: percentages,
                hoverOffset: 8,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = pieData.labels[context.dataIndex];
                        const value = pieData.datasets[0].data[context.dataIndex];
                        const percentage = percentages[context.dataIndex];
                        return `${label}: ${value}`;
                    },
                },
            },
            legend: {
                display: true,
                position: 'bottom' as 'bottom',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            datalabels: {
                display: true,
                color: '#fff',
                font: {
                    size: 14,
                },
                formatter: (value: any, context: any) => {
                    return `${value}% (${percentages[context.dataIndex]})%`;
                },
            },
        },
    };

    return <Pie data={dataWithPercentages} options={options} />;
};

export default PieChart;
