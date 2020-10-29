import React, {useState, useEffect} from "react";
import axios from 'axios';
import Button from './Button';
import SideBar from './SideBar';

import "components/Application.scss";
import DayList from './DayList';
import Appointment from './Appointment/index';




export default function Application(props) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then((response) => {
        setDays(response.data)
      })
  }, []);

  // const items = appointments.map((appointment) => {
  //   return (
  //   <Appointment 
  //     key={appointment.id}
  //     {...appointment}
  //   />); 
  //  })
  return (
    <main className="layout">
      <SideBar/>
      <DayList days={days}/>
      <section className="schedule">
        {/* {items}
        <Appointment key="last" time="5pm"/> */}
      </section>
    </main>
  );
}
