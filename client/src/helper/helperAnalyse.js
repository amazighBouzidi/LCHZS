export async function getAllAnalyses() {
    const token = localStorage.getItem('tokenUser');
    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/api/getAllAnalyses`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.ok){
          const analyses = await response.json();
          return Promise.resolve(analyses);
        }
        return Promise.reject(response.statusText)
      } catch (error) {
        return Promise.reject({ error });
      }
    }  
}

export async function registerAnalyse(values){
  const token = localStorage.getItem('tokenUser');
  const analyse = JSON.stringify(values)
  if (token) { 
    try {
      const response = await fetch(`http://localhost:8080/api/addAnalyse`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({newAnalyse: analyse})
      });

      const { msg, addedAnalyse } = await response.json();
      if(response.ok){
        return Promise.resolve({ msg, addedAnalyse});
      }
      return Promise.reject({ error });
    } catch (error) {
      return Promise.reject({ error });
    }  
  } else {
    return Promise.reject({ error });
  }
}

export async function deleteAnalyse(analyseId){
  const token = localStorage.getItem('tokenUser');
  console.log(`deleting ${analyseId}`)
  if(!token){
    return Promise.reject({ error });
  }
  try {
    const response = await fetch(`http://localhost:8080/api/deleteAnalyse/${analyseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // Add body if necessary
    });
    const { msg, deletedAnalyse } = await response.json();
    if (response.ok) {
      console.log('Analyse deleted successfully:', deletedAnalyse);
      return Promise.resolve({ msg, deletedAnalyse});
    } else {
      console.error('Error deleting analyse:', { error });
      return Promise.reject({ error });
    }
  } catch (error) {
    console.error('Error deleting analyse:', error);
    return Promise.reject({ error });
  }
}

export async function updateAnalyse(analyseId, values){
  const token = localStorage.getItem('tokenUser');
  const analyse = JSON.stringify(values)
  if (token) { 
    try {
      const response = await fetch(`http://localhost:8080/api/updateAnalyse/${analyseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({updateAnalyse: analyse})
      });

      const { msg, newUpdatedAnalyse } = await response.json();
      if(response.ok){
        return Promise.resolve({ msg, newUpdatedAnalyse});
      }
      return Promise.reject({ error });
    } catch (error) {
      return Promise.reject({ error });
    }  
  } else {
    return Promise.reject({ error });
  }
}