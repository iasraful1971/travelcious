import React from 'react';
import not from "../images/notFound.png";
const NotFound = () => {
    return (
        <div style={{display:'flex', margin:"0 auto", justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
            <img src={not} alt="" />
        </div>
    );
};

export default NotFound;