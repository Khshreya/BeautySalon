import "./css/beautician.css";
import { PersonCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Beautician({ beautician }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="beautician">
      {/* <PersonCircle className="beauticianimg" /> */}
      <img src={beautician.image} alt=" beautician image" 
          
          style={{
            height:"250px",
            width:"300px", 
            objectFit:"cover"  
            // transform: isHovering ? "scale(1.1)": '',
          }}/>
      <div className="beauticianinfo">
        <div className="beauticiancat">
          <div>Dept:- {beautician.department}</div>
          <div className="exp"> Exp: {beautician.experience} years</div>
        </div>
        <span className="beauticiantitle">
          {beautician.firstname} <span></span>
          {beautician.lastname}
          <samp className="education"> {beautician.education}</samp>
        </span>
      </div>
      <p className="beauticiandescription">
      We take immense pride in delivering high-quality beauty services tailored to meet our customers' unique needs. Our team of experienced and skilled beauticians is dedicated to providing exceptional care and attention to every client. Whether it’s hair care, waxing, facials, bridal makeup, pedicures, or more, we offer a complete range of services designed to help you look and feel your absolute best. Step into a world where professionalism meets luxury – because you deserve nothing less!
      </p>
      {user && (
        <Button
          variant="warning"
          type="submit"
          className=""
          onClick={() => {
            navigate(`/bookAppointment/${beautician._id}`);
          }}
        >
          Book Appointment
        </Button>
      )}
    </div>
  );
}

export default Beautician;
