'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { event } from 'nextjs-google-analytics';

interface NavItem {
  name: string;
  link: string;
}

function Navbar(){
  const router = useRouter();

  const options: NavItem[] = [
    {
      name: 'VIDBITS',
      link: '/',
    },
    {
      name: 'MARKETPLACE',
      link: '/marketplace',
    },
    {
      name: 'ABOUT',
      link: '/about',
    },
    {
      name: 'THE TEAM',
      link: '/team',
    },
    {
      name: 'CREATING BRAND COOL',
      link: '/brand',
    },
    {
      name: 'PRICING',
      link: '/pricing',
    },
    {
      name: 'CHLOE X HENRY',
      link: '/chloe-henry',
    },
    {
      name: 'Connect Wallet',
      link: '/connect-wallet',
    },
  ];

  return (
    <div
      style={{
        boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.25)',
      }}
      className='h-[80px] z-[10] bg-purple-950 px-[2rem] flex items-center justify-between fixed top-[0] left-[0] w-[100vw]'
    >
      <Link href='/' passHref>
        <div
          onClick={() => {
            event('logo', {
              category: 'Logo',
              label: 'Logo',
            });
            router.push('/');
          }}
        >
          <img src='/Images/SkyBrandingLogo.svg' className='w-[80px] cursor-pointer ml-[2rem]' />
        </div>
      </Link>
      <div className='flex gap-[0.5rem] mr-[2rem]'>
        {options.map((option, index) => (
          <div key={index} className='ml-[2rem] cursor-pointer text-white font-Avenir text-md hover:text-[#E377FF] transition-all duration-300'>
            <Link href={option.link} passHref>
              <div
                onClick={() => {
                  event(`Navbar-${option.name.replaceAll(' ', '-').toLowerCase()}`, {
                    category: `Navbar - ${option.name}`,
                    label: `Navbar - ${option.name}`,
                  });
                }}
              >
                {option.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="ml-4">
        <img
          src="/Images/Avatar.png"
          alt="A"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
