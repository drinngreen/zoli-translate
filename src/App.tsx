import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { TranslationBox } from './components/TranslationBox';
import { TranslateButton } from './components/TranslateButton';

function App() {
  const [englishText, setEnglishText] = useState('');
  const [italianText, setItalianText] = useState('');
  const [englishTranslation, setEnglishTranslation] = useState('');
  const [italianTranslation, setItalianTranslation] = useState('');
  const [loading, setLoading] = useState({ toItalian: false, toEnglish: false });
  const [copied, setCopied] = useState({ italian: false, english: false });

  const translate = async (text: string, from: string, to: string, direction: 'toItalian' | 'toEnglish') => {
    if (!text.trim()) return;
    
    setLoading(prev => ({ ...prev, [direction]: true }));
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
      const data = await res.json();
      if (direction === 'toItalian') {
        setItalianTranslation(data.responseData.translatedText);
      } else {
        setEnglishTranslation(data.responseData.translatedText);
      }
    } catch (error) {
      console.error('Translation error:', error);
      const errorMessage = 'Error during translation. Please try again.';
      if (direction === 'toItalian') {
        setItalianTranslation(errorMessage);
      } else {
        setEnglishTranslation(errorMessage);
      }
    } finally {
      setLoading(prev => ({ ...prev, [direction]: false }));
    }
  };

  const handleCopy = async (text: string, type: 'italian' | 'english') => {
    await navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-12">
          <Logo />
        </div>

        <div className="space-y-12">
          {/* English to Italian */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-gray-200">English to Italian</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <TranslationBox
                label="English Text"
                value={englishText}
                onChange={setEnglishText}
                placeholder="Enter English text..."
              />
              <TranslationBox
                label="Italian Translation"
                value={italianTranslation}
                isOutput
                onCopy={() => handleCopy(italianTranslation, 'italian')}
                copied={copied.italian}
                loading={loading.toItalian}
              />
            </div>
            <div className="flex justify-center">
              <TranslateButton
                onClick={() => translate(englishText, 'en', 'it', 'toItalian')}
                disabled={!englishText.trim() || loading.toItalian}
              />
            </div>
          </div>

          {/* Italian to English */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-gray-200">Italian to English</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <TranslationBox
                label="Italian Text"
                value={italianText}
                onChange={setItalianText}
                placeholder="Inserisci il testo italiano..."
              />
              <TranslationBox
                label="English Translation"
                value={englishTranslation}
                isOutput
                onCopy={() => handleCopy(englishTranslation, 'english')}
                copied={copied.english}
                loading={loading.toEnglish}
              />
            </div>
            <div className="flex justify-center">
              <TranslateButton
                onClick={() => translate(italianText, 'it', 'en', 'toEnglish')}
                disabled={!italianText.trim() || loading.toEnglish}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;