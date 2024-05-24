// Import necessary dependencies and styles
import RowCard from "../RowCard";
import { useState, useEffect } from "react";
import "./style.scss";

// Functional component definition
export default function RowGrid({ title, rowData }) {
  // State to manage the current image ratio (default: horizontal)
  const [currentRatio, setCurrentRatio] = useState("horizontal");

  // Function to update the ratio based on the screen width
  const updateRatioBasedOnScreenWidth = () => {
    // Check if window is defined (to avoid errors during server-side rendering)
    if (typeof window !== undefined) {
      const screenWidth = window.innerWidth;

      // Set the ratio based on the screen width
      if (screenWidth <= 768) {
        setCurrentRatio("vertical");
      } else {
        setCurrentRatio("horizontal");
      }
    }
  };

  // useEffect to add and clean up the event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", updateRatioBasedOnScreenWidth);
    return () => {
      window.removeEventListener("resize", updateRatioBasedOnScreenWidth);
    };
  }, []);

  // useEffect to set the initial ratio based on screen width
  useEffect(() => {
    updateRatioBasedOnScreenWidth();
  }, []);

  // Render the RowGrid component
  return (
    <>
      {/* Conditional rendering based on rowData existence */}
      {rowData ? (
        <div className="rowParentContainer">
          <div className="rowParentContainer_heading">{title}</div>
          <div className="slider-container">
            {/* Map through rowData and render RowCard components */}
            {rowData &&
              rowData?.data?.rowData?.map((item) => {
                // Construct the image URL based on the currentRatio
                let imgUrl =
                  currentRatio === "horizontal"
                    ? `${rowData?.data?.rootUrlHorizontal}/${item?.horizontal}`
                    : `${rowData?.data?.rootUrlVertical}/${item?.vertical}`;

                // Render RowCard component with appropriate props
                return (
                  <RowCard
                    cardRatio={currentRatio}
                    uniquekey={item._id}
                    url={imgUrl}
                    altText={`Image ${item._id}`}
                  />
                );
              })}
          </div>
        </div>
      ) : null}
    </>
  );
}
