import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow
} from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";

const excert = (str) => {
  if (str.length > 80) {
    str = str.substring(0, 80) + " ...";
  }
  return str;
};

const SingleTag = ({ item }) => {
    const navigate= useNavigate();
  return (
    <>
      {item.map((data) => (
        <MDBCardGroup key={data.title} item={item}>
          <MDBCard
            style={{
              maxWidth: "600px",
            }}
            className="mt-2"
          >
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage
                  className="rounded"
                  src={data.imageFile}
                  alt={data?.title}
                  fluid
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {data.title}
                  </MDBCardTitle>
                  <MDBCardText className="text-start">
                    {excert(data.description)}
                  </MDBCardText>
                  <div style={{float:'left', marginTop:"-10px"}}>
                    <MDBBtn size="sm" rounded color="info" 
                    onClick={() => navigate(`/tour/${data._id}`)}>
                        Read more
                    </MDBBtn>

                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </>
  );
};

export default SingleTag;
