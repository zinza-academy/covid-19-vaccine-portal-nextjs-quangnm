'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  date: string;
  quantity: number;
}

const LineChart = ({ data }: { data: ChartData[] }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Đã tiêm',
        data: data.map(d => d.quantity),
        borderColor: '#1a237e',
        backgroundColor: '#1a237e',
        pointBackgroundColor: 'red',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    // width: '100%',
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Dữ liệu tiêm theo ngày',
        align: 'start' as const,
        font: {
          weight: 'bold',
        } as const,
        color: '#000',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
