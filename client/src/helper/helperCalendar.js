export async function getAllAppointement() {
    const token = localStorage.getItem('tokenUser');
    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/api/getAllAppointment`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.ok){
          const filterAppointments = await response.json();
          return Promise.resolve(filterAppointments);
        }
        return Promise.reject(response.statusText)
      } catch (error) {
        return Promise.reject({ error });
      }
    }  
}

export async function addAppointments(appointments){
  const token = localStorage.getItem('tokenUser');
  console.log(appointments)
  if (token) {
    try {
      const response = await fetch(`http://localhost:8080/api/addAppointment`,{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newAppointment :appointments})
      });
      if(response.ok){
        const { msg } = await response.json();
        return Promise.resolve(msg);
      }
      return Promise.reject(response.statusText)
    } catch (error) {
      return Promise.reject({ error });
    }
  }
}