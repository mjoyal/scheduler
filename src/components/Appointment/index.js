import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Confirm from './Confirm';


// interview={{ student: "Lydia Miller-Jones", interviewer }}


const Appointment = function(props) {
  let appointmentValue = [<Header time={props.time} />];
  props.interview ? 
  appointmentValue.push(
  <Show 
  student= {props.interview.student}
  interviewer = {props.interview.interviewer}
  />) : 
  appointmentValue.push(<Empty />);
     
  return (
    <article className="appointment">
      {appointmentValue}
    </article>
  );
};

export default Appointment; 