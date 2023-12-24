import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignUp from '../../pages/Authentication/SignUp';


describe('End TO END Testing from Sign Up to create ChatBot', () => {

    test('displays an error message when fields are empty', () => {
        render(
          <BrowserRouter>
            <SignUp />
          </BrowserRouter>
        );
    
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);
    
        expect(screen.getByText(/fields must not be empty/i)).toBeInTheDocument();
      });
    
      test('Displays error message when the passwords does not match', () => {
        render(
          <BrowserRouter>
            <SignUp />
          </BrowserRouter>
        );
        fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'valid@valid.com' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
        fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'different' } });
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);
    
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });

    test('token added on successful login', async () => {
        render(
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        );

        //This test is crteating a user in the backend, if you run the test twice it will fail. Change the email and it will no longer fail
        fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'valid@valid.com' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
        fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password' } });

        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const authToken = localStorage.getItem('authToken');
            expect(authToken).toBeTruthy();
        });
    });
});