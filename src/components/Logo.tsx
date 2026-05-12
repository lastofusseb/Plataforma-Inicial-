import React from 'react';

export const InstitutionalLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
        {/* Shield Border - Golden Yellow */}
        <path 
          d="M40,60 Q200,20 360,60 Q380,240 200,370 Q20,240 40,60" 
          fill="#ffd700" 
        />
        {/* Internal Shield - Sky Blue */}
        <path 
          d="M60,80 Q200,45 340,80 Q355,220 200,345 Q45,220 60,80" 
          fill="#a0e0ff" 
        />
        
        {/* Text "I.E." */}
        <text 
          x="200" 
          y="120" 
          textAnchor="middle" 
          fill="#e53935" 
          fontWeight="900" 
          fontSize="44" 
          fontFamily="'Arial Black', Arial, sans-serif"
          stroke="white"
          strokeWidth="2"
        >
          I.E.
        </text>
        {/* Text "0009" */}
        <text 
          x="200" 
          y="190" 
          textAnchor="middle" 
          fill="#e53935" 
          fontWeight="900" 
          fontSize="72" 
          fontFamily="'Arial Black', Arial, sans-serif"
          stroke="white"
          strokeWidth="3"
        >
          0009
        </text>
        
        {/* Cartoon Boy */}
        <g transform="translate(200, 260)">
          {/* Head */}
          <circle cx="0" cy="-45" r="35" fill="#ffe0bd" stroke="#d7b899" strokeWidth="1" />
          {/* Smiling Face */}
          <path d="M-15,-40 Q0,-30 15,-40" fill="none" stroke="#5d4037" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-12" cy="-52" r="3" fill="#5d4037" />
          <circle cx="12" cy="-52" r="3" fill="#5d4037" />
          {/* Hair (Orange) */}
          <path d="M-36,-45 Q-35,-85 0,-85 Q35,-85 36,-45 Q20,-55 10,-50 Q0,-60 -10,-50 Q-20,-55 -36,-45" fill="#ff7043" />
          
          {/* Shirt (Green) */}
          <rect x="-30" y="-10" width="60" height="45" rx="10" fill="#4caf50" stroke="#388e3c" strokeWidth="1" />
          {/* Pants (Blue) */}
          <path d="M-28,35 L28,35 L28,60 L5,60 L5,45 L-5,45 L-5,60 L-28,60 Z" fill="#1976d2" stroke="#1565c0" strokeWidth="1" />
          
          {/* Arms Up */}
          <path d="M-30,5 L-60,-25" fill="none" stroke="#ffe0bd" strokeWidth="12" strokeLinecap="round" />
          <path d="M30,5 L60,-25" fill="none" stroke="#ffe0bd" strokeWidth="12" strokeLinecap="round" />
        </g>

        {/* Building Blocks */}
        <g transform="translate(100, 240)">
          <rect x="0" y="40" width="25" height="25" fill="#f44336" stroke="#c62828" strokeWidth="1" />
          <rect x="25" y="40" width="25" height="25" fill="#2196f3" stroke="#1565c0" strokeWidth="1" />
          <rect x="12" y="15" width="25" height="25" fill="#ffeb3b" stroke="#fbc02d" strokeWidth="1" />
        </g>
        
        {/* Bottom Text "NARANJAL" */}
        <text 
          x="200" 
          y="340" 
          textAnchor="middle" 
          fill="#e53935" 
          fontWeight="900" 
          fontSize="36" 
          fontFamily="'Arial Black', Arial, sans-serif"
          stroke="white"
          strokeWidth="2"
        >
          NARANJAL
        </text>
      </svg>
    </div>
  );
};
