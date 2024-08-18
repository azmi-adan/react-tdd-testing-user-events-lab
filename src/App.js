import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: []
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        interests: checked
          ? [...prevState.interests, value]
          : prevState.interests.filter((interest) => interest !== value)
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm Azmi</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <section>
        <h2>Newsletter Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <fieldset>
            <legend>Interests:</legend>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Tech"
                checked={formData.interests.includes('Tech')}
                onChange={handleChange}
              />
              Tech
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Design"
                checked={formData.interests.includes('Design')}
                onChange={handleChange}
              />
              Design
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Marketing"
                checked={formData.interests.includes('Marketing')}
                onChange={handleChange}
              />
              Marketing
            </label>
          </fieldset>
          <br />
          <button type="submit">Submit</button>
        </form>

        {submitted && (
          <p>
            Thank you for signing up, {formData.name}! {formData.interests.length > 0 && `Your interests are: ${formData.interests.join(', ')}.`}
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
