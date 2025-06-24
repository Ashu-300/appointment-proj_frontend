import React from 'react';
import {
  FaLinkedinIn, FaInstagram, FaYoutube, FaFacebookF, FaXTwitter,
} from 'react-icons/fa6';

const Footer = () => {
    const openSalonSignUpPage = () => {
    window.open('/salon/signup', '_blank', 'noopener,noreferrer');
  };
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-white">SalonSnap</h1>
        </div>

        {/* Column 1 */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-3">For Salons</h3>
          <ul className="space-y-2 text-gray-400">
            <li><button onClick={openSalonSignUpPage} >partner with us</button></li>
            <li><button>FAQ</button></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        {/* Socials and Stores */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center space-x-4 text-xl mb-4">
           <button><FaLinkedinIn /></button>
           <button> <FaInstagram /></button>
            <button><FaYoutube /></button>
           <button> <FaFacebookF /></button>
            <button><FaXTwitter /></button>
          </div>
          <div className="space-y-2">
           <button>
             <img
              src={import.meta.env.VITE_PHOTO_URL}
              alt="Play Store"
              className="h-10"
            />
           </button>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} SalonSanp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
