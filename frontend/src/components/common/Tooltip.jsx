"use client";
import { useState } from 'react';
import clsx from 'clsx';

export default function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);
  
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={clsx(
          "absolute z-50 w-max max-w-xs px-3 py-2 text-xs text-nyaya-text bg-nyaya-surface border border-nyaya-border rounded shadow-lg",
          positions[position]
        )}>
          {content}
        </div>
      )}
    </div>
  );
}
