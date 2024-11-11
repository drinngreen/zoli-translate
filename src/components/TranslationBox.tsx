import React from 'react';
import { Copy, Check } from 'lucide-react';

interface TranslationBoxProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isOutput?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  loading?: boolean;
}

export function TranslationBox({
  label,
  value,
  onChange,
  placeholder,
  isOutput,
  onCopy,
  copied,
  loading
}: TranslationBoxProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
        {isOutput && value && (
          <button
            onClick={onCopy}
            className="text-gray-400 hover:text-teal-400 transition-colors"
            title="Copy translation"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {isOutput ? (
        <div className="w-full h-32 p-3 bg-gray-900 rounded-lg overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
            </div>
          ) : (
            <p className="text-gray-200">{value}</p>
          )}
        </div>
      ) : (
        <textarea
          className="w-full h-32 p-3 bg-gray-900 text-gray-200 border-none rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  );
}