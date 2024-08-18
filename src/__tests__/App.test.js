import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name:/i);
  const emailInput = screen.getByLabelText(/email:/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const techCheckbox = screen.getByLabelText(/tech/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const marketingCheckbox = screen.getByLabelText(/marketing/i);

  expect(techCheckbox).toBeInTheDocument();
  expect(designCheckbox).toBeInTheDocument();
  expect(marketingCheckbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const techCheckbox = screen.getByLabelText(/tech/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const marketingCheckbox = screen.getByLabelText(/marketing/i);

  expect(techCheckbox).not.toBeChecked();
  expect(designCheckbox).not.toBeChecked();
  expect(marketingCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/name:/i), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByLabelText(/email:/i), {
    target: { value: 'john.doe@example.com' },
  });

  expect(screen.getByLabelText(/name:/i).value).toBe('John Doe');
  expect(screen.getByLabelText(/email:/i).value).toBe('john.doe@example.com');
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const techCheckbox = screen.getByLabelText(/tech/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const marketingCheckbox = screen.getByLabelText(/marketing/i);

  fireEvent.click(techCheckbox);
  fireEvent.click(designCheckbox);

  expect(techCheckbox).toBeChecked();
  expect(designCheckbox).toBeChecked();
  expect(marketingCheckbox).not.toBeChecked();

  fireEvent.click(techCheckbox); // Uncheck Tech
  expect(techCheckbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/name:/i), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByLabelText(/email:/i), {
    target: { value: 'john.doe@example.com' },
  });
  fireEvent.click(screen.getByLabelText(/tech/i));

  fireEvent.click(screen.getByText(/submit/i));

  expect(screen.getByText(/thank you for signing up, john doe!/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests are: tech./i)).toBeInTheDocument();
});
