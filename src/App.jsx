import CustomerHome from './customerPages/CustomerHome'
import CustomerSignUp from './customerPages/CustomerSignUp'
import CustomerLogIn from './customerPages/CustomerLogIn'
import SalonHome from './salonPages/SalonHome'
import SalonSignUp from './salonPages/SalonSignUp'
import SalonLogIn from './salonPages/SalonLogIn'
import SalonAuthWrapper from './AuthWrappers/SalonAuthWrapper'
import NewAppointments from './salonPages/NewAppointments'
import BookedAppointments from './salonPages/BookedAppointments'
import SalonDashboardPage from './salonPages/SalonDashboard'
import AppointApprovalPage from './salonPages/AppointapprovalPage'
import ViewBookedAppointment from './salonPages/ViewBookedAppointment'
import LandingPage from './landingComponent/LandingPage'
import CustomerSalonDeatil from './customerPages/CustomerSalonDeatil'
import { Route, Routes } from 'react-router-dom'
import CustomerDashboard from './customerPages/customerDashBoard'
import CustomerProfile from './customerPages/CustomerProfile'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/customer' element={<CustomerHome/>} />
       <Route path='/customer/:name' element={<CustomerSalonDeatil/>} />
      <Route path='/customer/:name' element={<CustomerSalonDeatil/>} />
      <Route path='/customer/signup' element={<CustomerSignUp/>} />
      <Route path='/customer/login' element={<CustomerLogIn/>} />
      <Route path='/customer/dashboard' element={<CustomerDashboard/>}/>
      <Route path='/customer/profile' element={<CustomerProfile/>}/>
      <Route path='/salon' element={<SalonHome/>} />
      <Route path='/salon' element={
        <SalonAuthWrapper>
          <SalonHome/>
        </SalonAuthWrapper>
        }/>
      <Route path='/salon/dashboard' element={<SalonDashboardPage/>} />
      <Route path='/salon/new-appointments' element={<NewAppointments/>} />
      <Route path='/salon/new-appointments/appointment-approval' element={<AppointApprovalPage/>} />
      <Route path='/salon/booked-appointments' element={<BookedAppointments/>} />
      <Route path='/salon/booked-appointments/view-appointment' element={<ViewBookedAppointment/>} />
      <Route path='/salon/signup' element={<SalonSignUp/>} />
      <Route path='/salon/login' element={<SalonLogIn/>} />  
    </Routes>  
    </>
  )
}

export default App
