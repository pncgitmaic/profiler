import React from 'react';

// FIX: Update the Hexagon component's props to accept a `style` object to allow passing inline styles.
const Hexagon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    width="100"
    height="115"
    viewBox="0 0 100 115"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 0L95.5 28.75V86.25L50 115L4.5 86.25V28.75L50 0Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export const BackgroundPattern: React.FC = () => {
  return (
    <>
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 text-blue-100/50 transform-gpu opacity-50 z-0">
        <div className="relative w-[400px] h-[400px]">
          <Hexagon className="absolute top-10 left-20 animate-float" />
          <Hexagon className="absolute top-20 right-10 animate-float animation-delay-2000" style={{ animationDelay: '2s' }} />
          <Hexagon className="absolute bottom-10 left-10 animate-float animation-delay-4000" style={{ animationDelay: '4s' }} />
        </div>
      </div>
       <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 text-blue-100/50 transform-gpu opacity-50 z-0">
        <div className="relative w-[300px] h-[300px]">
          <Hexagon className="absolute top-10 right-20 animate-float" style={{ animationDelay: '1s' }} />
          <Hexagon className="absolute bottom-10 left-10 animate-float" style={{ animationDelay: '3s' }}/>
        </div>
      </div>
    </>
  );
};
