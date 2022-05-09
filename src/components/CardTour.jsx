import {
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBIcon,
  MDBTooltip
} from "mdb-react-ui-kit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likeTour } from "../redux/features/TourSlice";

const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;
  const dispatch = useDispatch();

  const excerpt = (str) => {
    if (str.length > 100) {
      str = str.substring(0, 100) + " ...";
    }
    return str;
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
         
          <MDBIcon fas icon="heart" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} others loves`}
            >
              {likes.length} Loves
            </MDBTooltip>
          ) : (
            `${likes.length} love${likes.length > 1 ? "s" : ""} `
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="heart" />
          {likes.length}
          {likes.length === 1 ? " love" : " loves"}
        </>
      );
    }
    return (
      <div div className="d-flex align-items-center justify-content-center g-2">
        <MDBIcon far icon="heart" />
        <div> love</div>
      </div>
    );
  };

  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };
  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{name}</div>
        <div className="text-start tag-card">
          {tags.map((tag, index) => (
            <Link key={index} to={`/tours/tag/${tag}`}>{tag}</Link>
          ))}
        </div>

        <MDBCardBody className="position-relative-area">
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/tour/${_id}`}> read more</Link>
          </MDBCardText>
        </MDBCardBody>
        <div className="position-absolute-area" onClick={!user?.result ? null : handleLike}>

          {!user?.result ? (
           <MDBTooltip title="please login first" tag="a">
             <Likes/>
           </MDBTooltip>
          ) :(
            <Likes/>
          )}
   
        </div>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
