import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Sign in',
    path: '/signin',
    icon: <AiIcons.AiOutlineLogin />,
    cName: 'nav-text'
  },
  {
    title: 'Sign Up',
    path: '/signup',
    icon: <AiIcons.AiOutlineUserAdd />,
    cName: 'nav-text'
  },
  {
    title: 'New Booking',
    path: '/booking',
    icon: <FaIcons.FaBus />,
    cName: 'nav-text'
  },
  {
    title: 'View Bookings',
    path: '/viewbookings',
    icon: <AiIcons.AiFillDatabase />,
    cName: 'nav-text'
  }
];