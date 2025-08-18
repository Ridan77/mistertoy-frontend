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
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      getData()
      async function getData() {
        const data = await toyService.getDashboardData();
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
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
  if (!data)
    return (
      <div>
        <Loader />
      </div>
    );

  const data1 = {
    labels: data.labels,
    datasets: [
      {
        label: "Price per Label",
        data: data.pricePerLabel,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data2 = {
    labels: data.labels,
    datasets: [
      {
        label: "On Stock per Label",
        data: data.onStockPerLabel,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        width:150,
      },
    ],
  };
  return (
    <div>
      <Bar  sx={{ m: 0, width: 150 }} options={options} data={data1} />;
      <Bar  sx={{
        width: "500px",
        margin: "0 auto", // center it
      }} options={options} data={data2} />;
    </div>
  );
}
