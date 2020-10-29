import React from "react";
import "components/InterviewerListItem.scss";
import classNames from 'classnames';


function InterviewerListItem (props) {
  const itemClass = classNames('interviewers__item', 
  {'interviewers__item--selected': props.selected
  }); 
  const imageClass = classNames('interviewers__item-image', 
  {'interviewers__item-image--selected': props.selected})

  return (
    <li className={itemClass} onClick={props.setInterviewer}>
      <img
        className={imageClass}
        src={props.avatar}
        alt={props.name}
      />
      { props.selected && <p>{props.name}</p>}
    </li>
  );
}


export default InterviewerListItem;