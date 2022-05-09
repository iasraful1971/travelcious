import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardTour from "../components/CardTour";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { getTours, setCurrentPage } from "../redux/features/TourSlice";
const Home = () => {
  const { tours, loading, currentPage, numberOfPage } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTours(currentPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Header />
      <div
        style={{
          margin: "auto",
          padding: "15px",
          alignContent: "center",
          maxWidth: "1000px",
        }}
      >
        <MDBRow style={{ margin: "80px 0" }}>
          {tours.length === 0 && (
            <MDBTypography className="text-center mb-0" tag="h2">
              No Tours Found
            </MDBTypography>
          )}

          <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-3 g-3">
                {tours &&
                  tours.map((item) => <CardTour key={item?._id} {...item} />)}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPage={numberOfPage}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      </div>
    </>
  );
};

export default Home;
