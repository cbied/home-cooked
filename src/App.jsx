import Navbar from './components/navbar/navbar.component';
import { Loader } from 'rsuite'; 
import { useSelector } from 'react-redux';
import './App.css';




function App() {
  const selectUserSlice = useSelector(state => state.user);

  return (
      <div className="h-screen">
      {
        !selectUserSlice.isLoading ?

        <Navbar />

        :
        <div className='h-screen flex justify-center items-center'>
          <Loader size="lg" />
        </div>
      }
      </div>
  );
}

export default App;
