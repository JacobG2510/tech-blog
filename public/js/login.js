const loginForm = document.querySelector('#login-form');

// Event listener for the login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const errorMessage = await response.json();
      alert(errorMessage.message);
    }
  }
});