import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitsData } from '../../../visitorsSlice';
import { HeadingTitle, Loading } from '../../../../../components/atoms';
import { Line } from 'react-chartjs-2';  // Ganti Bar dengan Line
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement, // Import LineElement
  PointElement, // Untuk menampilkan titik pada line chart
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrasi LineElement dan PointElement
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const VisitorChart = () => {
  const dispatch = useDispatch();
  const { visitsData, isLoading, isError } = useSelector(state => state.visitors);

  // Menghitung tanggal awal dan akhir dari bulan saat ini
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(endOfMonth);

  useEffect(() => {
    dispatch(getVisitsData({ start: startDate, end: endDate }));
  }, [dispatch, startDate, endDate]);

  if (isLoading) return <Loading text={true} />;
  if (isError) return <div>Error: {isError}</div>;

  const data = {
    labels: visitsData.map(data => data.date),
    datasets: [{
      label: "Number of Visitors",
      data: visitsData.map(data => data.count),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 4,
      fill: false, // Menonaktifkan pengisian area di bawah garis
      tension: 0.1 // Mengatur kehalusan garis
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Memastikan bahwa hanya angka bulat yang ditampilkan
          stepSize: 1,
          callback: function(value) {
            if (value % 1 === 0) {
              return value;
            }
          }
        }
      }
    }
  };

  return (
    <div className="my-4 py-4">
      <HeadingTitle variant={"text-base text-slate-500"} text={"Visitor"} />
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <Line data={data} options={options} /> {/* Mengganti Bar dengan Line */}
    </div>
  );
};

export default VisitorChart;