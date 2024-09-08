export async function getAllResults() {
    const token = localStorage.getItem('tokenUser');
    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/api/getAllResults`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.ok){
          const formattedResults = await response.json();
          return Promise.resolve(formattedResults);
        }
        return Promise.reject(response.statusText)
      } catch (error) {
        return Promise.reject({ error });
      }
    }  
}

export async function interpretatePrescription(results){
  const token = localStorage.getItem('tokenUser')
  if(token){
    try {
      const response = await fetch('http://localhost:8080/api/interpretatePrescription', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(results)
      })
      
      if(response.ok){
        const msg = await response.json();
        return Promise.resolve(msg);
      }

      return Promise.reject(response.statusText)
    } catch (error) {
      return Promise.reject({ error });
    }
  }
}

export async function getAllResultsNotValuated() {
  const token = localStorage.getItem('tokenUser');
  if (token) {
    try {
      const response = await fetch(`http://localhost:8080/api/getAllResultsNotValidate`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.ok){
        const formattedResults = await response.json();
        return Promise.resolve(formattedResults);
      }
      return Promise.reject(response.statusText)
    } catch (error) {
      return Promise.reject({ error });
    }
  }  
}

export async function validateResultsPrescription(finalResults){
  const token = localStorage.getItem('tokenUser')
  if(token){
    try {
      const response = await fetch('http://localhost:8080/api/validateResultPrescription',{
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(finalResults),
      })

      if(response.ok){
        const msg = await response.json();
        return Promise.resolve(msg)
      }
      return Promise.reject(response.statusText)
    } catch (error) {
      return Promise.reject({ error });
    }
  }
}