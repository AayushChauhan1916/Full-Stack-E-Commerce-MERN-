import './App.css'
import Navbar  from './components/navbar/navbar'
import Admin from './pages/Admin/admin'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
     <Navbar></Navbar>
     <Admin></Admin>
     <ToastContainer
            position="top-center"
            autoClose={2200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
      />
    </>
  )
}

export default App
