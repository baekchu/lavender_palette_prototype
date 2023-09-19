'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-semibold text-[#B25FF3]">
        {title}
      </div>
      <div className=" font-semibold text-[#daacfd] mt-2 ">
        {subtitle}
      </div>
    </div>
   );
}
 
export default Heading;