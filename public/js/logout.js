const logoutButton = document.querySelector('#logout-button');

// Event listener for the logout button click
logoutButton.addEventListener('click', async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    const errorMessage = await response.json();
    alert(errorMessage.message);
  }
});