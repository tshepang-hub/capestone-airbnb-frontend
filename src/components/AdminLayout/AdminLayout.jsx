import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/homeNav/Navbar";
import Footer from '../Footer/Footer';
import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import img3 from '../../components/assets/anxiety.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLayout() {
  const navigate = useNavigate()
  const cookies = new Cookies();
  const loggedInUser = cookies.get('loggedInUser')?.user;
  
  useEffect(() => {
    // Check if 'loggedInUser' is an object
    setTimeout(()=>{
        if (typeof(loggedInUser) !== 'object' && loggedInUser !== null) {
            toast.error(`Please log in to be able to become a host`);
            navigate('/login');
        }
    },800)
    
}, []);


if(typeof loggedInUser !== 'object' && loggedInUser !== null){
  return (
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        flexDirection: 'column', 
        color: '#FF5A5F', 
        textAlign: 'center'
      }}>
        <img style={{ 
        height:"100px"
      }} src= {img3}alt="" />
        <p>Please log in to be able to become a host</p>
      </div>
    );
}else{
  return (
    <><ToastContainer position="top-center" autoClose={500} />
    <div>
       <Navbar/>
    <div className="reserve-info">
                <Stack direction='row' spacing={4} align='center' wrap='wrap'>
                    <Button size="sm" colorScheme='teal' variant='outline' className='searchPageBtn'>
                        <Link to='reservations' >
                        View Reservations
                        </Link>
                    </Button>
                    <Button size="sm" colorScheme='teal' variant='outline' className='searchPageBtn'>
                        <Link to='/admin' >
                        View Listings
                        </Link>
                    </Button>
                    <Button size="sm" colorScheme='teal' variant='outline' className='searchPageBtn'>
                        <Link to='create-listing' >
                        Create Listing
                        </Link>
                    </Button>
                </Stack>
      </div>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </div>
    </>
  );}
};
export default AdminLayout