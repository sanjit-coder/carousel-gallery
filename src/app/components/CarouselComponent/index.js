// Import necessary dependencies and styles
"use client";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import fetchApi from "@/utils/api"; // Import the fetchApi utility function
import "./style.scss"; // Import the styles for the component

// Component function definition
export default function CarouselComponent() {
  // State hooks to manage carousel data and current screen ratio
  const [carouselData, setCarouselData] = useState(null);
  const [currentRatio, setCurrentRatio] = useState("ratio1"); // Default ratio

  // Function to fetch carousel data from the API
  const getCarouselData = async () => {
    try {
      const carouselData = await fetchApi("/v23/assignment/carousel-data");
      setCarouselData(carouselData);
    } catch (error) {
      // Handle errors here
      console.error("Error in carouselData:", error.message);
      throw error;
    }
  };

  // Function to update the current screen ratio based on the window width
  const updateRatioBasedOnScreenWidth = () => {
    if (typeof window !== undefined) {
      const screenWidth = window.innerWidth;

      // Set the current ratio based on screen width breakpoints
      if (screenWidth <= 768) {
        setCurrentRatio("ratio1");
      } else if (screenWidth <= 991) {
        setCurrentRatio("ratio2");
      } else {
        setCurrentRatio("ratio3");
      }
    }
  };

  // useEffect hook to fetch carousel data on component mount and handle window resize
  useEffect(() => {
    getCarouselData();

    // Add event listener for window resize
    window.addEventListener("resize", updateRatioBasedOnScreenWidth);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateRatioBasedOnScreenWidth);
    };
  }, []);

  // useEffect hook to update ratio when the component mounts
  useEffect(() => {
    updateRatioBasedOnScreenWidth();
  }, []);

  // Return the Carousel component with dynamic data based on screen ratio
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        centerSlidePercentage={currentRatio === "ratio1" ? 100 : 95} // Adjust center slide percentage based on current ratio
        showArrows={false}
        showThumbs={false}
        centerMode={true}
        showStatus={false}
        transitionTime={900}
        interval={3000}
      >
        {/* Map through carousel data and display images based on current ratio */}
        {carouselData &&
          carouselData?.data?.carousel?.map((item) => {
            return (
              <div className="spacing" key={item?._id}>
                <img
                  src={`${carouselData?.data?.rootUrl}/${item[currentRatio]}`}
                  className="carouselImage"
                />
              </div>
            );
          })}
      </Carousel>
    </>
  );
}
