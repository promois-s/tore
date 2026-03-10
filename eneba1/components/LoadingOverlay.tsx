
import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
      {message && (
        <p className="mt-4 text-indigo-600 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingOverlay;
