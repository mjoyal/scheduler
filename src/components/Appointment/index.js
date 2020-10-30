import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Confirm from './Confirm';
import useVisualMode from '../hooks/useVisualMode';
import Form from './Form'

const Appointment = function(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // let appointmentValue = [<Header time={props.time} />];
  // props.interview ? 
  // appointmentValue.push(
  // <Show 
  // student= {props.interview.student}
  // interviewer = {props.interview.interviewer}
  // />) : 
  // appointmentValue.push(<Empty />);
     
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          // name={props.interview.student}
          interviewers={[]}
          onCancel={() => back()}
         />
      )}
    </article>
  );
};

export default Appointment; 