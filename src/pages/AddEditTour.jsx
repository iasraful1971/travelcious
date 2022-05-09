import ChipInput from "material-ui-chip-input";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { createTour, updateTour } from "../redux/features/TourSlice";
const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErr, setTagErr] = useState(null);

  const { error,  userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const { title, description, tags } = tourData;
  useEffect(() => {
    error && toast.err(error);
  }, [error]);
  const handleAddTag = (tag) => {
    setTagErr(null)
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((title, tags, description)) {
      if (!tags.length) {
        setTagErr("please provide tag");
      }
    
        const updatedTourData = { ...tourData, name: user?.result?.name };
        if (!id) {
          dispatch(createTour({ updatedTourData, navigate, toast }));
        } else {
          dispatch(updateTour({ id, updatedTourData, navigate, toast }));
        }

        handleClear();
      
    }
  };
  return (
    <>
      <Header />
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
          marginTop: "80px",
        }}
        className="container"
      >
        <MDBCard alignment="center">
          <MDBCardBody>
            <h5 style={{ fontWeight: "bold", fontSize: "22px" }}>
              {id ? "Update tour" : "Add Tour"}
            </h5>
            <MDBValidation
              onSubmit={handleSubmit}
              className="row g-3 noValidate"
            >
              <div className="col-md-12">
                <MDBInput
                  placeholder="title"
                  type="text"
                  value={title}
                  name="title"
                  onChange={onInputChange}
                  className="form-control"
                  required
                  invalid="true"
                  validation="please provide title"
                />
              </div>
              <div className="col-md-12">
                <MDBTextArea
                  placeholder="Enter Description"
                  type="text"
                  value={description}
                  name="description"
                  onChange={onInputChange}
                  className="form-control"
                  required
                  invalid="true"
                  textarea="true"
                  rows={6}
                  validation="please provide description"
                />
              </div>
              <div className="col-mb-12">
                <ChipInput
                  name="tags"
                  value={tags}
                  variant="outlined"
                  placeholder="add tag"
                  fullWidth
                  onAdd={(tag) => handleAddTag(tag)}
                  onDelete={(tag) => handleDeleteTag(tag)}
                />
                {tagErr && (
                  <p style={{ color: "red", textAlign: "left" }}>{tagErr}</p>
                )}
              </div>
              <div className="d-flex justify-content-start">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setTourData({ ...tourData, imageFile: base64 })
                  }
                />
              </div>
              <div className="col-12 justify-content-between d-flex">
                <MDBBtn
                  style={{ width: "48%" }}
                  color="danger"
                  onClick={handleClear}
                >
                  Clear
                </MDBBtn>
                <MDBBtn style={{ width: "48%" }}>
                  {user ? "Submit" : "Submit"}
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};

export default AddEditTour;
