import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

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

import { loadToys } from "../store/actions/toy.actions.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Dashboard() {
  const labels = [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
  ];
  useEffect(() => {
    loadToys();
  }, []);

  const toys = useSelector((storeState) => storeState.toyModule.toys);

  const pricePerLabel = labels.map((label) => {
    const totalPrice = toys.reduce((acc, toy) => {
      if (toy.labels.includes(label)) {
        return acc + toy.price;
      }
      return acc;
    }, 0);

    const totalOccurrence = toys.reduce((acc, toy) => {
      if (toy.labels.includes(label)) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return totalOccurrence > 0 ? totalPrice / totalOccurrence : 0;
  });

  const onStockPerLabel = labels.map((label) => {
    return toys.reduce((acc, toy) => {
      if (toy.inStock && toy.labels.includes(label)) {
        return acc + 1
      }
      return acc
    }, 0);
  });

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        //   as const,
      },
      title: {
        display: true,
        text: "Our Dashboard",
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        //   as const,
      },
      title: {
        display: false,
        text: "Our Dashboard",
      },
    },
  };
  const data1 = {
    labels,
    datasets: [
      {
        label: "Price per Label",
        data: pricePerLabel,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data2 = {
    labels,
    datasets: [
      {
        label: "On Stock per Label",
        data: onStockPerLabel,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };


  return (
    <div>
      <Bar options={options1} data={data1} />;
      <Bar options={options2} data={data2} />;
    </div>
  );
}
