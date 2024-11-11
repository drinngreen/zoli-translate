import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

interface TranslateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function TranslateButton({ onClick, disabled }: TranslateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowRightLeft className="w-5 h-5" />
      Translate
    </button>
  );
}