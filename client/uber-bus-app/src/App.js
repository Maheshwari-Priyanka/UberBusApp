import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/Home/LandingPage'
import SignIn from './components/LoginSignUp/SignIn';
import SignUp from './components/LoginSignUp/SignUp';
import Header from './components/Header';
import BusBooking from './components/AppPages/BusBooking'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact render={props => <LandingPage {...props} />} />
          <Route path="/signin" render={props => <SignIn {...props} />} />
          <Route path="/signup" render={props => <SignUp {...props} />} />
          <Route path="/booking" render={props => <BusBooking {...props} />} />
          {/* <Route path="/routes" exact render={props => <RouteSelection {...props} />} />
          <Route path="/profile" exact render={props => <Profile {...props} />} />
          <Route path="/getTicket" exact render={props => <TicketPage {...props} />} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
