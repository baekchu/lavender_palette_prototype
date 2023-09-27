import { HiOutlineHome } from "react-icons/hi";
import { MdManageSearch } from "react-icons/md";
import { MdOutlineSmsFailed } from "react-icons/md";
import { PiHandbagBold } from "react-icons/pi";

export const NavLinks = [
    { href: '/', key: 'Home', text: 'Home' , icon: <HiOutlineHome /> },
    { href: '/quest', key: '탐색', text: '탐색', icon: <MdManageSearch />},
    { href: '/request', key: '의뢰', text: '의뢰', icon: <MdOutlineSmsFailed />},
    { href: '/shop', key: '디자인샵', text: '디자인샵', icon: <PiHandbagBold /> },
];
//홈화면 카테고리
export const exploreWorlds = [
  {
    id: 'world-1',
    imgUrl: '/planet-01.png',
    title: 'Cartoon',
  },
  {
    id: 'world-2',
    imgUrl: '/planet-02.png',
    title: 'illustration',
  },
  {
    id: 'world-3',
    imgUrl: '/planet-03.png',
    title: 'UX/UI',
  },
  {
    id: 'world-4',
    imgUrl: '/planet-04.png',
    title: 'fashion design',
  },
  {
    id: 'world-5',
    imgUrl: '/planet-05.png',
    title: '더보기',
  },
];

//인기작품, 인기작가
export const insights = [
  {
    imgUrl: '/planet-06.png',
   
  },
  {
    imgUrl: '/planet-07.png',
    
  },
  {
    imgUrl: '/planet-08.png',
    
  },
  {
    imgUrl: '/planet-08.png',
    
  },
];

  
  export const footerLinks = [
    {
      title: 'For developers',
      links: [
        'Go Pro!',
        'Explore development work',
        'Development blog',
        'Code podcast',
        'Open-source projects',
        'Refer a Friend',
        'Code of conduct',
      ],
    },
    {
      title: 'Hire developers',
      links: [
        'Post a job opening',
        'Post a freelance project',
        'Search for developers',
      ],
    },
    {
      title: 'Brands',
      links: [
        'Advertise with us',
      ],
    },
    {
      title: 'Company',
      links: [
        'About',
        'Careers',
        'Support',
        'Media kit',
        'Testimonials',
        'API',
        'Terms of service',
        'Privacy policy',
        'Cookie policy',
      ],
    },
    {
      title: 'Directories',
      links: [
        'Development jobs',
        'Developers for hire',
        'Freelance developers for hire',
        'Tags',
        'Places',
      ],
    },
    {
      title: 'Development assets',
      links: [
        'Code Marketplace',
        'GitHub Marketplace',
        'NPM Registry',
        'Packagephobia',
      ],
    },
    {
      title: 'Development Resources',
      links: [
        'Freelancing',
        'Development Hiring',
        'Development Portfolio',
        'Development Education',
        'Creative Process',
        'Development Industry Trends',
      ],
    },
  ];


  