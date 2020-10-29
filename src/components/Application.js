import React, {useState} from "react";
import Button from './Button';
import SideBar from './SideBar';

import "components/Application.scss";
// import DayList from './DayList';
// import InterviewerList from './InterviewerList';
import Appointment from './Appointment/index';


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "MacKenzie Joyal",
      interviewer: {
        id: 1,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];


export default function Application(props) {
  const items = appointments.map((appointment) => {
    return (
    <Appointment 
      key={appointment.id}
      {...appointment}
    />); 
  })
  return (
    <main className="layout">
      <SideBar/>
      <section className="schedule">
        {items}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
