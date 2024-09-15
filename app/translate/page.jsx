"use client";

import { useEffect, useState } from 'react';
import lang from '../../languages';

function Translator() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en-GB');
  const [toLanguage, setToLanguage] = useState('hi-IN');
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLanguages(lang);
  }, [lang]);

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  };

  const utterText = (text, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  };

  const handleExchange = () => {
    let tempValue = fromText;
    setFromText(toText);
    setToText(tempValue);

    let tempLang = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLang);
  };

  const handleTranslate = () => {
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        setLoading(false);
      });
  };

  const handleIconClick = (target, id) => {
    if (!fromText || !toText) return;

    if (target.classList.contains('fa-copy')) {
      if (id === 'from') {
        copyContent(fromText);
      } else {
        copyContent(toText);
      }
    } else {
      if (id === 'from') {
        utterText(fromText, fromLanguage);
      } else {
        utterText(toText, toLanguage);
      }
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col space-y-4">
          <textarea
            name="from"
            className="w-full h-32 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter Text"
            id="from"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
          ></textarea>

          <textarea
            name="to"
            className="w-full h-32 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            id="to"
            value={toText}
            readOnly
          ></textarea>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button
              className="text-gray-600"
              onClick={(e) => handleIconClick(e.target, 'from')}
            >
              <i className="fa-solid fa-volume-high"></i>
            </button>
            <button
              className="text-gray-600"
              onClick={(e) => handleIconClick(e.target, 'from')}
            >
              <i className="fa-solid fa-copy"></i>
            </button>
            <select
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
              className="p-2 border rounded-md text-black"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="text-blue-600 hover:text-blue-800 transition"
            onClick={handleExchange}
          >
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </button>

          <div className="flex items-center space-x-2">
            <select
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              className="p-2 border rounded-md text-black"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <button
              className="text-gray-600"
              onClick={(e) => handleIconClick(e.target, 'to')}
            >
              <i className="fa-solid fa-copy"></i>
            </button>
            <button
              className="text-gray-600"
              onClick={(e) => handleIconClick(e.target, 'to')}
            >
              <i className="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>

        <button
          onClick={handleTranslate}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? 'Translating...' : 'Translate Text'}
        </button>

        <p className='text-black'>This is a Free API sometimes it give accurate response sometime its not</p>
      </div>
    </>
  );
}

export default Translator;
