import React, {useState, useEffect} from "react";
import axios from 'axios';
import Button from './Button';
import SideBar from './SideBar';

import "components/Application.scss";

import Appointment from './Appointment/index';
import { getAppointmentsForDay, getInterview} from "helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })
  const [loading, setLoading] = useState(true);

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));
  const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}));

  useEffect(() => {
    const baseUrl = 'http://localhost:8001/api';
    const promise1 = axios.get(`${baseUrl}/days`);
    const promise2 = axios.get(`${baseUrl}/appointments`);
    const promise3 = axios.get(`${baseUrl}/interviewers`);
    const promises = [promise1, promise2, promise3];
    Promise.all(promises)
      .then((response) => {
        setDays(response[0].data)
        setAppointments(response[1].data);
        setInterviewers(response[2].data);
        setLoading(false);
      })  
  }, []);
  
  if(loading) {
    return null; 
  }
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment, index) => {
   const interview = getInterview(state, appointment.interview);
    return (
    <Appointment 
      key={index}
      {...appointment}
      interview={interview}
    />); 
; 
   })

  return (
    <main className="layout">
      <SideBar 
        day={state.day}
        days={state.days}
        setDay={setDay} 
      />
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
