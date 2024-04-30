const fetchData = async () => {
  try {
    const response = await fetch('/.netlify/functions/getFirebaseData');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
