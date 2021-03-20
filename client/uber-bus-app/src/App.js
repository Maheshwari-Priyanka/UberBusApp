import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignInSignUp/SignIn';
import SignUp from './components/SignInSignUp/SignUp';
import Header from './components/Header';
import BusBooking from './components/AppPages/BusBooking';
import Welcome from './components/Welcome';
import Error from './components/Error';
import ViewBookings from './components/AppPages/ViewBookings';
import SignOut from './components/SignInSignUp/SignOut';

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
          <Route path="/signout" render={props => <SignOut {...props} />} />
          <Route path="/" render={props => <Error {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
