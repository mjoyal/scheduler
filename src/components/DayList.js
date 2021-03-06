import React from "react";
import DayListItem from './DayListItem';

function DayList (props) {
const items = props.days.map((day) => {
  return (
  <DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  
  />)
}); 

  return (
    <ul>
      {items}
    </ul>
  )
}

export default DayList; 