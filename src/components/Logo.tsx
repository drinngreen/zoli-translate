import React from 'react';
import { Globe2 } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Globe2 className="w-8 h-8 text-teal-400" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
        Zoli Translate
      </span>
    </div>
  );
}