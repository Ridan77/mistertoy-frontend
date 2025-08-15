import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Loader } from "../cmps/Loader.jsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toyService } from "../services/toy.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function Dashboard() {

  // const [data,setData]=useState({labels:[],pricePerLabel:[],onStockPerLabel:[]})
  const [data,setData]=useState(null)

  useEffect(() => {
    toyService.getDashboardData().then((data) => setData(data));
    
  }, []);



  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Our Dashboard",
      },
    },
  };
  if (!data) return <div><Loader /></div>
  console.log(data);
  
  const data1 = {
    labels:data.labels,
    datasets: [
      {
        label: "Price per Label",
        data: data.pricePerLabel,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data2 = {
    labels:data.labels,
    datasets: [
      {
        label: "On Stock per Label",
        data: data.onStockPerLabel,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={data1} />;
      <Bar options={options} data={data2} />;
    </div>
  );
}
