import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData1 = [
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
  },
  {
    title: 'Sign Out',
    path: '/signout',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  }
];