// Import necessary dependencies and styles
import React from "react";
import Image from "next/image";
import "./style.scss";

// Functional component definition
const RowCard = ({ uniquekey, url, altText, cardRatio }) => {
  return (
    // Container div for the RowCard component with optional verticalCard class
    <div
      className={`rowCard ${
        cardRatio === "vertical" ? "rowCard_verticalCard" : ""
      }`}
      key={uniquekey}
    >
      {/* Next.js Image component to handle image loading and optimization */}
      <Image
        src={url}
        alt={altText}
        className="rowCardImage"
        layout="fill" // Utilize the layout="fill" property to fill the container with the image
        objectFit="cover" // Use objectFit="cover" for responsive and cropped images
        style={{ width: "100%", height: "100%" }} // Set additional styling for the Image component
      />
    </div>
  );
};

// Export the RowCard component for use in other parts of the application
export default RowCard;
