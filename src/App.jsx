import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "../src/components/Home/Home"
import SearchPage from "../src/components/SearchPage/SearchPage"
import Error from './components/ErrorPage/Error';

import ReservationsTable from './components/ReservationList/RersavationsTable';
import CreateListing from './components/createListing/CreateListing';
import ListingDetail from './components/listingDetails/ListingDetail';
import Login from './components/Login/Login'
import Register from './components/Login/Register';
import { SearchProvider } from './SearchContext';
import Search from './components/Search/Search';
import Checkout from './components/Checkout/Checkout';
import HotelList from './components/HotelList/HotelList';
import AdminLayout from './components/AdminLayout/AdminLayout';

{/* <ListingDetail/> single listing details */}
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    errorElement:<Error/>,
  },{
    path:"listings",
    element:<SearchPage/>
  },
  {
    path:"single/:id",
    element:<ListingDetail/>
  },
  {
    path:'login',
    element:<Login/>
  }
  ,{
    path:'register',
    element:<Register/>
  },{
    path:'checkout',
    element:<Checkout/>
  },{
    path:'admin',
    element:<AdminLayout/>,
    children:[
      {
        index:true,
        element:<HotelList/>
      },
      {
        path:'create-listing',
        element:<CreateListing/>
      },{
        path:'reservations',
        element:<ReservationsTable/>
      }
    ]
  }
])
function App() {
  return  <SearchProvider>
    <RouterProvider router={router}>
   
     <SearchPage/>
    <Search/>
  </RouterProvider>
  </SearchProvider>
}

export default App
