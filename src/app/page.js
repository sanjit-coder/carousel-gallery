"use client";

// Import necessary dependencies and components
import { useState, useEffect } from "react";
import CarouselComponent from "./components/CarouselComponent";
import RowGrid from "./components/RowGrid";
import fetchApi from "@/utils/api";

// Function to fetch row data from the API
const getRowData = async () => {
  try {
    const rowData = await fetchApi("/v23/assignment/row-data");
    return rowData;
  } catch (error) {
    // Handle errors here
    console.error("Error in getRowData:", error.message);
    throw error;
  }
};

// Home component definition
export default function Home() {
  // State to manage row data
  const [rowData, setRowData] = useState(null);

  // useEffect to fetch and set row data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRowData();
        setRowData(data);
      } catch (error) {
        // Handle errors here
        console.error("Error in fetchData:", error.message);
      }
    };
    fetchData();
  }, []);

  // Render the Home component
  return (
    <>
      {/* Render CarouselComponent */}
      <CarouselComponent />

      {/* Render multiple RowGrid components with different titles and the same rowData */}
      <RowGrid title="Top 20 in Haryana" rowData={rowData} />
      <RowGrid title="Vip Shows" rowData={rowData} />
      <RowGrid title="Web Series" rowData={rowData} />
      <RowGrid title="Comedy Series" rowData={rowData} />
      <RowGrid title="New Shows" rowData={rowData} />

      {/* Repeat RowGrid components with different titles and the same rowData */}
      <RowGrid title="Top 20 in Haryana" rowData={rowData} />
      <RowGrid title="Vip Shows" rowData={rowData} />
      <RowGrid title="Web Series" rowData={rowData} />
      <RowGrid title="Comedy Series" rowData={rowData} />
      <RowGrid title="New Shows" rowData={rowData} />
    </>
  );
}
