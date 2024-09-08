export async function getAllDoctors() {
    const token = localStorage.getItem('tokenUser');
    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/api/getAllDoctors`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.ok){
          const doctors = await response.json();
          return Promise.resolve(doctors);
        }
        return Promise.reject(response.statusText)
      } catch (error) {
        return Promise.reject({ error });
      }
    }  
}