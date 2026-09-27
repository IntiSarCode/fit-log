import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-[#181a20] text-gray-400 border-t border-gray-800 py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            width={20}
            height={20}
            alt="FITLOG LOGO"
          />
          <span className="text-white font-black text-lg tracking-wider">
            FITLOG
          </span>
        </div>

        <p className="text-xs sm:text-sm text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
    );
};

export default Footer;