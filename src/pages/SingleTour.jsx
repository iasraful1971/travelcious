import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBContainer,
  MDBIcon
} from "mdb-react-ui-kit";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import RElatedTour from "../components/RElatedTour";
import { getRelatedTours, getTour } from "../redux/features/TourSlice";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour , relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();

  const tags = tour?.tags;
  useEffect(() => {
    tags && dispatch(getRelatedTours(tags))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])
  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);





  return (
    <>
    <Header/>
      <MDBContainer>
        <MDBCard  style={{margin:'100px 0'}}>
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <h3>{tour.title}</h3>
            <span className="d-flex justify-content-between">
              <p className="text-start tourName">Created by : {tour.name}</p>
              <p className="text-muted">{moment(tour.createAt).fromNow()}</p>
            </span>
            <div style={{ float: "left" }}>
              <div className="text-start tag-card">
                <h6>Tags</h6>
                {tour &&
                  tour.tags &&
                  tour.tags.map((item) => <span>{item}</span>)}
              </div>
            </div>
      
            <MDBCardText className="text-start mt-2 ">
              <MDBIcon
          
                far
                icon="calender-alt"
                size="large"
              />
            </MDBCardText>

            <MDBCardText className="lead mb-0 text-start main-description">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <RElatedTour relatedTours={relatedTours} tourId={id} />
        </MDBCard>
      
      </MDBContainer>
    </>
  );
};

export default SingleTour;
