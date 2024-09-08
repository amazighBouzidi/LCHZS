export async function registerPrescription(prescription, doctor, selectedPatientID){
    const token = localStorage.getItem('tokenUser')

    if (token) { 
      try {
        const response = await fetch(`http://localhost:8080/api/addPrescription`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prescription, doctor, selectedPatientID })
        });
  
        const { msg } = await response.json();
        if(response.ok){
          return Promise.resolve(msg);
        }
        return Promise.reject({ error });
      } catch (error) {
        return Promise.reject({ error });
      }  
    } else {
      return Promise.reject({ error });
    }
}

export async function getAllPrescriptions() {
    const token = localStorage.getItem('tokenUser');
    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/api/getAllPrescriptions`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.ok){
          const formattedPrescriptions = await response.json();
          return Promise.resolve(formattedPrescriptions);
        }
        return Promise.reject(response.statusText)
      } catch (error) {
        return Promise.reject({ error });
      }
    }  
}

export async function getPrescription(idPrescription) {
    const token = localStorage.getItem('tokenUser');
    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/api/getPrescription/${idPrescription}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.ok){
          const prescriptionDetails = await response.json();
          return Promise.resolve(prescriptionDetails);
        }
        return Promise.reject(response.statusText)
      } catch (error) {
        return Promise.reject({ error });
      }
    }  
}