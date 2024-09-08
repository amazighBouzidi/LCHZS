/** register user with google function */
export async function registerUserWithGoogle(googleId, profileObj){
    try {
        const response = await fetch(`http://localhost:8080/api/auth/userGoogle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ googleId, profileObj })
        });

        const { msg, userType, token } = await response.json();
        localStorage.setItem('tokenUser', token)
        return Promise.resolve({msg, userType});
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** register user with form function */
export async function registerUserWithForm(values, file){
    const profileUser = JSON.stringify(values)
    try {
        const response = await fetch(`http://localhost:8080/api/auth/userForm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({parsedProfileUser : profileUser, file})
        });

        const { msg, token } = await response.json();
        localStorage.setItem('tokenUser', token)
        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({ error });
    }  
}

export async function authentificationUserWithForm(values){
    try {
        const response = await fetch(`http://localhost:8080/api/auth/login`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer`,
                'Content-type': 'application/json', 
            },
            body: JSON.stringify(values)
        })
        if(!response.ok){
            throw new Error('Email ou mot de passse Incorrecte');  
        }
        const { token, user } = await response.json()
        localStorage.setItem('tokenUser', token)
        
        return Promise.resolve(user)

    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getProfileUser() {
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
          return Promise.resolve(user)
        } else {
          console.error('Failed to fetch props:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching props:', error);
      }
    }
};

export async function updateProfileUser(values){
    const token = localStorage.getItem('tokenUser');
    const profileUser = JSON.stringify(values)
   // console.log("Profile User Helper: ", profileUser)
    if (token) {
        try {
          // Assuming you have a backend endpoint to fetch the props based on userID
          const response = await fetch(`http://localhost:8080/api/updateProfile`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({parsedProfileUser : profileUser})
          });

    
          if (response.ok) {
            const { msg }= await response.json()
            return Promise.resolve(msg)

          } else {
            return Promise.reject(response.statusText)
          }
        } catch (error) {
          return Promise.reject(error)
        }
    }
}

export async function getAllUsers() {
  const token = localStorage.getItem('tokenUser');
  if (token) {
    try {
      const response = await fetch(`http://localhost:8080/api/getAllEmployers`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.ok){
        const users = await response.json();
        return Promise.resolve(users);
      }
      return Promise.reject(response.statusText)
    } catch (error) {
      return Promise.reject({ error });
    }
  }  
}

export async function deleteUser(employerId) {
  const token = localStorage.getItem('tokenUser');
  if (token) {
    try {
      const response = await fetch(`http://localhost:8080/api/deleteUser/${employerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export async function registerEmployer(values){
  const token = localStorage.getItem('tokenUser');
  const employer = JSON.stringify(values)
  if (token) { 
    try {
      const response = await fetch(`http://localhost:8080/api/addEmployer`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({newEmployer: employer})
      });

      const { msg, addEmployer } = await response.json();
      if(response.ok){
        return Promise.resolve({ msg, addEmployer });
      }
      return Promise.reject({ error });
    } catch (error) {
      return Promise.reject({ error });
    }  
  } else {
    return Promise.reject({ error });
  }
}

export async function getAllPatients() {
  const token = localStorage.getItem('tokenUser');
  if (token) {
    try {
      const response = await fetch(`http://localhost:8080/api/getAllPatients`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.ok){
        const users = await response.json();
        return Promise.resolve(users);
      }
      return Promise.reject(response.statusText)
    } catch (error) {
      return Promise.reject({ error });
    }
  }  
}

export async function fullMedicalFolderPatient(selectedMedicalFolder){
  const patientID= selectedMedicalFolder.selectedMedicalFolder
  const token = localStorage.getItem('tokenUser');
  if (token) {
    try {
      const response = await fetch(`http://localhost:8080/api/getFullMedicalFolder/${patientID}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
      });
      if(response.ok){
        const fullMedicalFolder = await response.json();
        return Promise.resolve(fullMedicalFolder);
      }
      return Promise.reject(response.statusText)
    } catch (error) {
      return Promise.reject({ error });
    }
  } 
}

export async function countData(){
  const token = localStorage.getItem('tokenUser');
  if (token) {
    try {
      const response = await fetch(`http://localhost:8080/api/getCountData`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.ok){
        const { analyseCount, patientCount, employerCount, notValidatedResultPrescription } = await response.json();
        return Promise.resolve({ analyseCount, patientCount, employerCount, notValidatedResultPrescription });
      }
      return Promise.reject(response.statusText)
    } catch (error) {
      return Promise.reject({ error });
    }
  } 
}