import {useState, useEffect} from "react";
import axios from 'axios';

const useApplicationData = function () {
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
  const baseUrl = 'http://localhost:8001/api';

  useEffect(() => {
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

  const updateSpots = (/*appointmentId, add*/) => {
    axios.get(`${baseUrl}/days`)
      .then((response) => {
        setDays(response.data);
      })
  };


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
      };
       return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
        .then((response) => {
          setAppointments(appointments);
          updateSpots();
        })
    }, 
    deleteInterview : (id) => {
        console.log('interview deleted', id);
        const appointment = {
          ...state.appointments[id],
          interview: {...null}
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
       
        return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
        .then((response) => {
          setAppointments(appointments);
          updateSpots();
        })
      }
    
  }
}

export default useApplicationData;