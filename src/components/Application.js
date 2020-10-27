import React, {useState} from "react";
import Button from './Button';
import SideBar from './SideBar';

import "components/Application.scss";
import DayList from './DayList';

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


export default function Application(props) {
  const [day, setDay] = useState('Monday'); 
  return (
    <main className="layout">
      <SideBar/>
      <section className="schedule">
        <DayList days={days} setDay={setDay}/>
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
