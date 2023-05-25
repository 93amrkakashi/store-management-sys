import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
