import React from "react";
import Button from './Button';
import SideBar from './SideBar';

import "components/Application.scss";

export default function Application(props) {
  return (
    <main className="layout">
      <SideBar/>
      <section className="schedule">
        
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
