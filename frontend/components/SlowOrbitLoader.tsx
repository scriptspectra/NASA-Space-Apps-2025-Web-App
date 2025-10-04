import React from 'react';
import { Orbit } from 'lucide-react';

const SlowOrbitLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Orbit 
        size={64} 
        color="#3b82f6"
        className="animate-spin"
        style={{ animationDuration: '8s' }}
      />
    </div>
  );
};

export default SlowOrbitLoader;