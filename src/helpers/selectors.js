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

const appoint = {student: "Archie Cohen", interviewer: 3}



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

export {getInterview, getAppointmentsForDay};