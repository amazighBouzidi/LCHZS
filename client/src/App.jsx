import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { gapi } from "gapi-script";
import React, {useEffect} from 'react'


function App() {
  const initializeGapi = () => {
    gapi.client.init({
      clientId: "8844894605-fbe9njje17si5sjdg4prf8t3ajtkhc2v.apps.googleusercontent.com",
      scope: ['profile', 'email', 'phone', 'address'],
    });
  };
  
  useEffect(() =>{
    // load and init google api scripts
    gapi.load("client:auth2", initializeGapi);
  }, [])

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
