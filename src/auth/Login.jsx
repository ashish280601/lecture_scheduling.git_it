const loginUser = async (username, password) => {
  const hostUrl = "https://lecture-scheduling-api-git-it.onrender.com"
  try {
    const response = await fetch('your_login_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Assuming your API returns userType in the response data
    const { userType } = data;

    // Return userType
    return userType;
  } catch (error) {
    throw new Error('Invalid username or password');
  }
};
