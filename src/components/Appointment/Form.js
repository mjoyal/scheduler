import React, {useState} from "react";
import InterviewerList from '../InterviewerList'
import Button from '../Button'

const Form = function (props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")
  const [interviewError, setInterviewError] = useState("");
  
  const reset = () => {
    setName('');
    setInterviewer(null);
  };
 
  const cancel = () => {
    reset();
    props.onCancel();
  };


  const validate = () => {
    if(name === "" /*&& !interviewer*/) {
      setError("Student name cannot be blank");
      // setInterviewError('Interviewer must be selected');
      return; 
    } 
    // else if (name === "") {
    //   setError("Student name cannot be blank");
    //   setInterviewError("");
    //   return; 
    // } else if(!interviewer){
    //   setInterviewError('Interviewer must be selected');
    //   setError("");
    //   return; 
    // }
    setError("");
    setInterviewError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
        autoComplete="off"
        onSubmit= {(event => event.preventDefault)}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange= {(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid= "student-name-input"
          />
          <section className="appointment__validation">{error}</section>
          <section className="appointment__validation">{interviewError}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer} 
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;