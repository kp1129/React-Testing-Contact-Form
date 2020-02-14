import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import ContactForm from './ContactForm';

test("the form renders without crashing", () => {
    render(<ContactForm />)
});

test("first name, last name, email, message inputs are rendered", () => {
    const {getByLabelText} = render(<ContactForm />);
    getByLabelText(/First Name/i);
    getByLabelText(/Last Name/i);
    getByLabelText(/email/i);
    getByLabelText(/message/i);
});

test("first name, last name, email, message inputs render in a pre element on submit", async () => {
    const { getByLabelText, getByText, getByTestId, findByTestId} = render(<ContactForm />);
    // querying for all the input nodes
    const fNameInput = getByLabelText(/First Name/i);
    const lNameInput = getByLabelText(/Last Name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);
  
    // use the change event to add text to each input
    fireEvent.change(fNameInput, { target: { value: 'Test First Name' } });
    fireEvent.change(lNameInput, { target: { value: 'Test Last Name' } });
    fireEvent.change(emailInput, { target: { value: 'Test Email' } });
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });
  
    expect(fNameInput.value).toBe('Test First Name');
    expect(lNameInput.value).toBe('Test Last Name');
    expect(emailInput.value).toBe('Test Email');
    expect(messageInput.value).toBe('Test Message');

  
    // click on the button!
    fireEvent.click(getByText("Submit"));
  
    let submittedFormText;
    // assert that the form inputs are somewhere in the doc
    await waitForElement(() => {
        submittedFormText = getByText("Test Last Name");
        
    });

    expect(submittedFormText).toBeInTheDocument();
    
});
