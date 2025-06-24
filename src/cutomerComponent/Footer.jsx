import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10 text-gray-600 text-sm">
      &copy; {new Date().getFullYear()} Salon Booking App. All rights reserved.
    </footer>
  );
};

export default Footer;
