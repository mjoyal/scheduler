function getAppointmentsForDay(state, day) {
  const appointments = [];
  const filteredDay = state.days.filter(d => d.name === day);
   if(!day.length || !filteredDay.length || !state.appointments[1]) {
     return appointments; 
   }
  const appointmentSlots = filteredDay[0].appointments;
  for (const appointment of appointmentSlots) {
    appointments.push(state.appointments[appointment]);
  }
  return appointments; 
}

function getInterviewersForDay(state, day) {
  const interviewers = [];
  const filteredDay = state.days.filter(d => d.name === day);
   if(!day.length || !filteredDay.length || !state.interviewers[1]) {
     return interviewers; 
   }
  const interviewersAvailable = filteredDay[0].interviewers;
  for (const interviewer of interviewersAvailable) {
    interviewers.push(state.interviewers[interviewer]);
  }
  return interviewers; 
}



function getInterview (state, appointment) {
  if(appointment === null) {
    return null; 
  }
  const interview = {
    'student': appointment.student, 
  };
  
 interview['interviewer'] = state.interviewers[appointment.interviewer];
  return interview;
};

export {getInterview, getAppointmentsForDay, getInterviewersForDay};