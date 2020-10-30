import React, {useState, useEffect} from "react";
import axios from 'axios';
import Button from './Button';
import SideBar from './SideBar';

import "components/Application.scss";

import Appointment from './Appointment/index';
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  })

  let dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({...state, day});
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));

  useEffect(() => {
    const baseUrl = 'http://localhost:8001/api';
    const promise1 = axios.get(`${baseUrl}/days`);
    const promise2 = axios.get(`${baseUrl}/appointments`);
    const promises = [promise1, promise2];
    Promise.all(promises)
      .then((response) => {
        setState({...state, days: response[0].data})
        setAppointments(response[1].data);
      })  
  }, []);
 
 
  const items = dailyAppointments.map((appointment, index) => {
    return (
    <Appointment 
      key={index}
      {...appointment}
    />); 
   })


  return (
    <main className="layout">
      <SideBar 
        day={state.day}
        days={state.days}
        setDay={setDay} 
      />
      <section className="schedule">
        {items}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
