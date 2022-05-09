import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBRow
} from "mdb-react-ui-kit";
import React from 'react';
import { Link } from 'react-router-dom';
const excert = (str) => {
    if (str.length > 80) {
      str = str.substring(0, 80) + " ...";
    }
    return str;
  };
const SingleRelated = ({tours , tourId}) => {
    return (
        <div>
             {
        tours && tours.length > 0 && (
         <>
          {tours.length > 1 && <h4>Related Tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
          {tours.filter((item) => item._id !== tourId).splice(0 ,3).map((item) => (
              <MDBCol>
              <MDBCard>
                <Link to={`/tour/${item._id}`}>
                  <MDBCardImage
                    src={item?.imageFile}
                    alt={item?.title}
                    position="top"
                    style={{height:"200px", objectFit:'cover'}}
                  />
                </Link>
                <span className="text-start tag-card">
                  {item.tags.map((tag) => (
                    <Link to={`/tours/tag/${tag}`}>{tag}</Link>
                  ))}
                </span>
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText className="text-start">
                    {excert(item.description)}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>
              
          ))}
          </MDBRow>
         </>
       )
     }
    
        </div>
    );
};

export default SingleRelated;