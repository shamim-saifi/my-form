import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Form from './Components/Form/Form';
import SignUp from './Components/Signup/SignUp';
import { Toaster } from 'react-hot-toast'
import { Context } from './index'
import { useContext } from 'react';
import Contact from './Components/Contact/Contact';
import UserProfile from './Components/UserProfile/UserProfile';
import About from './Components/About/About';
import UpdateForm from './Components/UserProfile/UpdateForm';
import Loader from './Components/Loader/Loader';


function App() {
  const { isAuthUser, loading } = useContext(Context)

console.log(isAuthUser)
  return (

    <div className="App">
      <BrowserRouter>
        <Header />
        {
          loading ? (<Loader />) : (
            <>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/about' element={<About />} />
                <Route path='/Account' element={isAuthUser ? <Form /> : <Login />} />
                <Route path='/updateform' element={isAuthUser ? <UpdateForm /> : <Login />} />

                {/* <Route path='/form' element={<Form />} /> */}
                <Route path='/userprofile' element={isAuthUser ? <UserProfile /> : <Login />} />

              </Routes>
            </>
          )
        }
        <Toaster />
        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;
