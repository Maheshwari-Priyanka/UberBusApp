import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { SidebarData1 } from './SidebarData1';
import './Header.css';
import { IconContext } from 'react-icons';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false
    }

    this.handleSideBar = this.handleSideBar.bind(this);
  }

  handleSideBar() {
    this.setState({
      sidebar: !this.state.sidebar
    })
  }

  render() {
    const loginNav = (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar fixed-top'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={this.handleSideBar} />
            </Link>
            <span style={{ marginLeft: "72%", fontSize: "35px", color: "#fff" }}>
              <b>Uber Bus App</b>
            </span>
          </div>
          <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={this.handleSideBar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );

    const loggedinNav = (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar fixed-top'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={this.handleSideBar} />
            </Link>
            <span style={{ marginLeft: "72%", fontSize: "35px", color: "#fff" }}>
              <b>Uber Bus App</b>
            </span>
          </div>
          <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={this.handleSideBar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              <li className="nav-text">
                <span style={{fontSize: "20px", color: "white", border: "1px solid white", borderRadius: "5px", padding: "2px", marginLeft: "-5%"}}>Welcome {localStorage.firstname}</span>
              </li>
              {SidebarData1.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    )
    return (
      <>
        {localStorage.userID ? loggedinNav : loginNav }
      </>
    );
  }
}

export default Home;