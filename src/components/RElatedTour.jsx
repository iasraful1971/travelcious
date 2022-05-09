
import React from "react";
import SingleRelated from "./SingleRelated";

const RElatedTour = ({ relatedTours, tourId }) => {
    console.log(relatedTours)


  return (
    <>
      {
        relatedTours.map((tours) => <SingleRelated tours={tours} tourId={tourId} />)
      }
    </>
  );
};

export default RElatedTour;


