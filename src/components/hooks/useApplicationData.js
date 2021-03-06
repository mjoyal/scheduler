import {useState, useEffect} from "react";
import axios from 'axios';
import {updateSpots} from 'helpers/selectors';

const useApplicationData = function () {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const [loading, setLoading] = useState(true);
  // update state helpers
  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));
  const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}));
  
  useEffect(() => {
    // original load, only runs once 
    const promise1 = axios.get(`/api/days`);
    const promise2 = axios.get(`/api/appointments`);
    const promise3 = axios.get(`/api/interviewers`);
    const promises = [promise1, promise2, promise3];
    Promise.all(promises)
      .then((response) => {
        setDays(response[0].data)
        setAppointments(response[1].data);
        setInterviewers(response[2].data);
        setLoading(false);
      })  
  }, []);
  
  useEffect (() => {

   const newDays = updateSpots(state);
   // update spots count 
    setDays(newDays);
  }, [state.appointments]);

 
  return {
    state, 
    loading,
    setDay,
    bookInterview: (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      // schedule appointment and update appointment state
       return axios.put(`/api/appointments/${id}`, appointment)
        .then((response) => {
          setAppointments(appointments)
        })
    }, 
    deleteInterview : (id) => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        // delete appointment and update appointment state
        return axios.delete(`/api/appointments/${id}`, appointment)
        .then(() => {
          setAppointments(appointments)
        })
      }
    
  }
}

export default useApplicationData;