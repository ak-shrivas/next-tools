export function WaterGlassIcon({ fill = 0.7, size = 32 }) {
    const height = 40;
    const waterHeight = Math.round(fill * height);
  
    return (
      <svg
        width={size}
        height={height}
        viewBox="0 0 32 40"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded"
      >
        {/* Glass outline */}
        <rect x="6" y="2" width="20" height="36" rx="4" ry="4" fill="none" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Water fill */}
        <rect
          x="6"
          y={38 - waterHeight}
          width="20"
          height={waterHeight}
          fill="#3b82f6"
          opacity="0.6"
        />
      </svg>
    );
  }
  