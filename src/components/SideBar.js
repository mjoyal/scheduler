import React from "react";
import DayList from './DayList';


function SideBar (props) {
  return (
    <section className="sidebar"> 
        <img className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          day={props.day}
          days={props.days}
          setDay = {props.setDay}
        /> 
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
      </section>
  );
}

export default SideBar; 