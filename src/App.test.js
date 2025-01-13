import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';



// Mock the import of questionData
jest.mock('./questions.json', () => [
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'What is the capital of France?', answer: 'Paris' }
]);

describe('App Component', () => {
  test('renders a question and allows the user to submit an answer', async () => {
    render(<App />);

    // Check if the question appears in the document
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();

    // Simulate user typing an answer
    fireEvent.change(screen.getByPlaceholderText(/Type your answer.../), {
      target: { value: '4' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText('Submit'));

    // Check if the correct answer message appears
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  test('shows an incorrect answer message', () => {
    render(<App />);

    // Check if the question appears in the document
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();

    // Simulate user typing an incorrect answer
    fireEvent.change(screen.getByPlaceholderText(/Type your answer.../), {
      target: { value: '5' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText('Submit'));

    // Check if the incorrect answer message appears
    expect(screen.getByText('Wrong, try again!')).toBeInTheDocument();
  });
});
