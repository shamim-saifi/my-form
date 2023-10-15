import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext({})

export const server='api'

const AppWapper = () => {

  const [isAuthUser,setisAuthUser]=useState(false)
  const [singleFormId,setSingleFormId]=useState(false)
  const [user,setUser]=useState({})
  const [formData, setFormData] = useState([])
  const [singleFormData, setSingleFormData] = useState('')
  const [loading, setLoading] = useState(false)


  return (
    <Context.Provider value={{
      isAuthUser,setisAuthUser,
      user,setUser,
      formData, setFormData,
      singleFormId,setSingleFormId,
      singleFormData, setSingleFormData,
      loading, setLoading
    

    }}>
      <App />

    </Context.Provider>

  )
}
root.render(
  <React.StrictMode>
    <AppWapper />
  </React.StrictMode>
);


