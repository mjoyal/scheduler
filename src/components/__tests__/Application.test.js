import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText} from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

describe('Application', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return waitForElement(() => getByText('Monday'))
            .then(()=> {
              const tuesdayButton = getByText('Tuesday');
              fireEvent.click(tuesdayButton);
              expect(getByText('Leopold Silvers')).toBeInTheDocument();
            });
  });
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, 'Add')); 

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: 'mackenzie joyal'}
    })

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, 'mackenzie joyal'))
      
    expect(getByText(appointment, 'mackenzie joyal')).toBeInTheDocument();
    const day = getAllByTestId(container, 'day').find(day => 
              queryByText(day, "Monday")
              );
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();

  })


  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[1];
 
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(getByText(appointment, /Are you sure you would like to delete/i)).toBeInTheDocument();

    fireEvent.click(getByText(appointment, /confirm/i));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, /add/i));
    expect(getByAltText(appointment, /add/i)).toBeInTheDocument();
    const day = getAllByTestId(container, 'day').find(day => 
      queryByText(day, "Monday")
      );
      expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

  })

  // it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  //   const { container } = render(<Application />);
  //   await waitForElement(() => getByText(container, '12pm'));
  //   const appointment = getAllByTestId(container, 'appointment')[1];
  //   fireEvent.click(getByAltText(appointment, 'Edit'));
    
  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: {value: 'Joe Biden'}
  //   })
  //   fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
  //   fireEvent.click(getByText(appointment, 'Save'));
  //   expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    
  //   await waitForElement(() => getByText(appointment, 'Joe Biden'))
 
  // })

})