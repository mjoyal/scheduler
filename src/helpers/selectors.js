 export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const filteredDay = state.days.filter(d => d.name === day);
   if(!day.length || !filteredDay.length) {
     return appointments; 
   }
  const appointmentSlots = filteredDay[0].appointments;
  for (const appointment of appointmentSlots) {
    appointments.push(state.appointments[appointment]);
  }
  return appointments; 
}

