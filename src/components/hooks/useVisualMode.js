import React, {useState} from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 //setting appointment slot view 

 //transition to next view
  function transition (newMode, replace = false) {
    if(replace) {
      history.pop();
    }
    setMode(newMode);
    setHistory([...history, newMode]);
  }
//return to previous view
  function back() {
    if(history.length > 1) {
      setMode(history[history.length - 2])
      history.pop();
    }
  }
 
  return {mode, transition, back};
};