import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import useVisualMode from '../hooks/useVisualMode';
import Form from './Form'

const Appointment = function(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

 function deleteInterview () {
    transition(DELETING);
    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }
  function confirm () {
    transition(CONFIRM)
  }
  function edit () {
    transition(EDIT);
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(() => {
      transition(ERROR_SAVE, true);
    }); 
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {confirm}
          onEdit = {edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave= {save}
          onCancel={back}
         />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave= {save}
          onCancel={back}
         />
      )}
      {mode === SAVING && (
        <Status 
          message={'Saving'}
        /> 
      )} 
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you would like to delete?"
          onConfirm = {deleteInterview}
          onCancel= {back}
        />
      )}
      {mode === DELETING && (
         <Status 
         message={'Deleting'}
       /> 
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={back}
        /> 
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={back}
        /> 
      )}
    </article>
  );
};

export default Appointment; 