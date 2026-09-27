
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

const Navbar = () => {
  const { planCount, savedCount } = usePlan();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li className="hover:text-green-600 btn-ghost"><Link href="/#workouts">Workouts</Link></li>
            <li className="hover:text-green-600 btn-ghost"><Link href="/my-plan">My Plan</Link></li>
          </ul>
        </div>
        <Image src="/assets/logo.png" width={20} height={20} alt="FITLOG LOGO" />
        <a className="btn btn-ghost text-xl">FITLOG</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="hover:text-green-600 btn-ghost"><Link href="/#workouts">Workouts</Link></li>
          <li className="hover:text-green-600 btn-ghost"><Link href="/my-plan">My Plan</Link></li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <div className="flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-full text-sm font-medium">
          <Link href="/my-plan">Plan</Link>
          <span className="badge badge-success text-xs font-bold px-2 py-1 rounded-full">{planCount}</span>
        </div>

        <div className="flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-full text-sm font-medium">
          <Link href="/my-plan">Saved</Link>
          <span className="badge badge-neutral text-xs font-bold px-2 py-1 rounded-full">{savedCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

