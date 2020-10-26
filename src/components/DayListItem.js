import React from "react";
import classNames from 'classnames';
 
function DayListItem (props) {
  let itemClass = classNames('day-list__item', 
  {'day-list__item--full': !props.spots},
  {'day-list__item--selected': props.selected});

  return (
    <li 
    className={itemClass} 
    onClick={() => props.setDay(props.name)}
    >
    <h2 className="text--regular">{props.name}</h2>
    <h3 className="text--light">{props.spots} spots remaining</h3>
  </li>
  );
};

export default DayListItem; 