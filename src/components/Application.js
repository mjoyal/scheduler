import React, {useState, useEffect}  from "react";
import axios from 'axios';
import Button from './Button';
import SideBar from './SideBar';
import useApplicationData from './hooks/useApplicationData';
import "components/Application.scss";

import Appointment from './Appointment/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";



export default function Application() {
  const {
    state, 
    loading,
    setDay,
    bookInterview, 
    deleteInterview, 
         } = useApplicationData();
  
  if(loading) {
    return null; 
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
  
  const interview = getInterview(state, appointment.interview);
  
    return (
    <Appointment 
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers= {dailyInterviewers}
      bookInterview = {bookInterview}
      deleteInterview = {deleteInterview}
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
        {schedule}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
