import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const lineData = {
  labels: ['Jan \'03', 'Feb \'03', 'Mar \'03', 'Apr \'03', 'May \'03', 'Jun \'03', 'Jul \'03', 'Aug \'03', 'Sep \'03', 'Oct \'03'],
  datasets: [
    {
      label: 'Team A',
      data: [20, 30, 40, 50, 60, 70, 60, 50, 40, 30],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Team B',
      data: [30, 20, 50, 40, 60, 30, 40, 50, 60, 70],
      fill: false,
      borderColor: 'rgb(255, 205, 86)',
      tension: 0.1
    },
    {
      label: 'Team C',
      data: [50, 40, 30, 60, 70, 50, 60, 70, 80, 90],
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1
    },
  ],
};

const LineChart = () => {
  return <Line data={lineData} />;
};

export default LineChart;
