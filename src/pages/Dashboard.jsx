import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { deleteTour, getToursByUser } from "../redux/features/TourSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));

  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  const excert = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };
  if(loading){
    return <Spinner/>
 }
 //handle delete
 const handleDelete =(id) => {
  if(window.confirm("Are you sure to delete this tour ?")){
    dispatch(deleteTour({id, toast}))
  }
 }
  return (
    <>
    <Header/>
      <div className="dashboard-container" >
        {
          userTours.length ===0 && (
            <h3>No tour of available for :  {user.result.name} <a href="/addTour"> click here for add tour</a> </h3>
            
          )
        }
       {
         userTours.length > 0 && (
           <>
            <h4 className="text-center dashboard-header">Dashboard: <span>{user?.result?.name} </span></h4>
        <hr
          style={{
            maxWidth: "570px",
          }}
        /></>
         )
       }
        {userTours &&
          userTours.map((item) => (
            <MDBCardGroup     key={item._id}>
              <MDBCard
             
            
                className="mt-2"
              >
                <MDBRow className="g-5">
                  <MDBCol md="4" style={{textAlign:'center'}}>
                    <MDBCardImage src={item.imageFile} alt={item.title} fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="text-dark">
                        {item.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        <small className="text-muted">
                          {excert(item.description)}
                        </small>
                      </MDBCardText>
                      <div
                        style={{
                          marginLeft: "5px",
                          float: "right",
                          marginTop: "-60px",
                        }}
                      >
                        <MDBBtn className="mt-1" tag="a" color="none">
                          <MDBIcon
                            fas
                            icon="trash"
                            style={{ color: "red" }}
                            size="lg"
                            onClick={() => handleDelete(item._id)}
                          />
                        </MDBBtn>
                        <Link to={`/editTour/${item._id}`}>
                          <MDBIcon
                            fas
                            icon="edit"
                            style={{ color: "blue", marginLeft:'10px' }}
                            size="lg"
                          />
                        </Link>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCardGroup>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
