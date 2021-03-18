import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './components/LoginSignUp/SignIn';
import SignUp from './components/LoginSignUp/SignUp';
import Header from './components/Header';
import BusBooking from './components/AppPages/BusBooking';
import Welcome from './components/Welcome';
import ViewBookings from './components/AppPages/ViewBookings';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact render={props => <Welcome {...props} />} />
          <Route path="/signin" render={props => <SignIn {...props} />} />
          <Route path="/signup" render={props => <SignUp {...props} />} />
          <Route path="/booking" render={props => <BusBooking {...props} />} />
          <Route path="/viewbookings" render={props => <ViewBookings {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
