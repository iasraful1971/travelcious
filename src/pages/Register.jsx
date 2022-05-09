import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBIcon,
    MDBInput,
    MDBSpinner,
    MDBValidation
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";
const initialState = {
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    confirmPassword: ""
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const {loading , error} =useSelector((state) =>({...state.auth}) )
  const {firstName, lastName, email, password , confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error)
  },[error])
  const handleSubmit = (e) => {
      e.preventDefault();
      if(password !== confirmPassword){
          return toast.error("password does not matched")
      }
      if(firstName && lastName && email && password && confirmPassword){
          dispatch(register({formValue , navigate, toast }))
      }

  };
  const onInputChange = (e) => {
      let{name, value} = e.target;
      setFormValue({...formValue, [name]:value})
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5 style={{fontWeight:'bold', padding:'10px 0'}}>Register</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">

           
              <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="please provide First Name"
             
              />
            </div>

            <div className="col-md-6">
              <MDBInput
                 label="Last Name"
                 type="text"
                 value={lastName}
                 name="lastName"
                 onChange={onInputChange}
                 required
                 invalid
                 validation="please provide Last Name"
             
              />
            </div>
            
        
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="please provide email"
             
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="please provide password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                validation="please provide  confirm password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                  {loading && (
                      <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="me-2"
                      />
                  )}
                Create Account
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already registered? Log in </p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
