import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SingleTag from "../components/SingleTag";
import { getToursByTag } from "../redux/features/TourSlice";

const TagTours = () => {
 const {tag} = useParams();

 const dispatch = useDispatch();
 const {tagTours , loading} = useSelector((state) => ({...state.tour}));


 useEffect(() => {
  if(tag){
    dispatch(getToursByTag(tag))
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [tag]);



  return (
    <>
      <Header />
      <div
        style={{
          margin: "auto",
          padding: "100px",
          alignContent: "center",
          maxWidth: "1000px",
        }}
      >
        <h4 className="text-center dashboard-header">
          Tours with tag <span>{tag} </span>
        </h4>
        <hr
          style={{
            maxWidth: "570px",
          }}
        />
    
         
        {
        tagTours.map(item => (
          <SingleTag item={item} />
    
          ))}
 
      </div>
    </>
  );
};

export default TagTours;
