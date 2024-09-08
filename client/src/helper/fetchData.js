import useStore from '../data/store';

const fetchData = async () => {
  const token = localStorage.getItem('tokenUser');

  if (token) {
    try {
      // Assuming you have a backend endpoint to fetch the props based on userID
      const response = await fetch(`http://localhost:8080/api/getUser`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { user }= await response.json();
        // Set the fetched props in Zustand store
        useStore.setState({ user: user});
      } else {
        console.error('Failed to fetch props:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching props:', error);
    }
  }
};

export default fetchData;
