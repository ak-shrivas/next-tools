"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import zxcvbn from "zxcvbn";
import clsx from "clsx";
import { ClipboardCopy, Check } from "lucide-react"

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const EMOJIS = ["😀", "😂", "😍", "🔥", "🌈", "🎉", "🚀", "💡", "💻", "🔐", "🧠", "🍕", "🐱", "🎯"];

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("Click Generate");
  const [length, setLength] = useState(8);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [useEmojis, setUseEmojis] = useState(false);
  const [copied, setCopied] = useState(false);

  const [strength, setStrength] = useState<{
    score: number;
    label: string;
    color: string;
  }>({ score: 0, label: "Too Weak", color: "bg-red-500" });

  // Generate password on any change
  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeNumbers, includeSymbols, useEmojis]);

  const generatePassword = () => {
    let charset = LOWERCASE.split("");

    if (includeUpper) charset = charset.concat(UPPERCASE.split(""));
    if (includeNumbers) charset = charset.concat(NUMBERS.split(""));
    if (includeSymbols) charset = charset.concat(SYMBOLS.split(""));
    if (useEmojis) charset = charset.concat(EMOJIS);

    if (charset.length === 0) {
      setPassword("⚠️ Select at least 1 option");
      return;
    }

    let pwd = "";
    for (let i = 0; i < length; i++) {
      const char = charset[Math.floor(Math.random() * charset.length)];
      pwd += char;
    }

    setPassword(pwd);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  
    // Unselect text
    setTimeout(() => {
      window.getSelection()?.removeAllRanges(); // Clear selection
      setCopied(false); // Reset "Copied" status
    }, 2000);
  };
  
  

  // Analyze strength
  useEffect(() => {
    const noOptionsSelected = !includeUpper && !includeNumbers && !includeSymbols && !useEmojis;
    const tooShort = length <= 6;
  
    if (noOptionsSelected || tooShort) {
      setStrength({ score: 0, label: "Too Weak", color: "bg-red-500" });
      return;
    }
  
    const result = zxcvbn(password);
    const strengthLevels = [
      { label: "Too Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Strong", color: "bg-green-400" },
      { label: "Very Strong", color: "bg-green-600" },
    ];
  
    setStrength({
      score: result.score,
      ...strengthLevels[result.score],
    });
  }, [password, includeUpper, includeNumbers, includeSymbols, useEmojis, length]);
  

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        🔐 Secure Password Generator
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Generate strong, customizable passwords instantly.
      </p>

      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        {/* Output */}

        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
                Your Generated Password
            </label>

            <div className="relative group">
                <input
                    type="text"
                    value={password}
                    readOnly
                    onFocus={(e) => e.target.select()} // Select-all when clicked
                    onClick={handleCopy}                    
                    className="w-full font-mono font-semibold tracking-wide text-gray-800 px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 select-all cursor-text transition-all"
                />

                {/* Copy Button with Tooltip */}
                <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all group"
                    aria-label="Copy Password"
                >
                    {/* Tooltip */}
                    <span className="absolute -top-10 right-0 scale-0 group-hover:scale-100 transition-all text-xs bg-black text-white px-2 py-1 rounded-md shadow-md">
                    {copied ? "Copied!" : "Copy"}
                    </span>

                    {/* Icon */}
                    {copied ? <Check size={18} /> : <ClipboardCopy size={18} />}
                </button>
                   
            </div>


            {copied && (
                <p className="text-sm text-green-600 mt-1 animate-pulse">Copied to clipboard!</p>
            )}
        </div>


        {/* Strength Meter */}
        <div className="mb-4">
            <label className="text-sm text-gray-600 font-medium mb-1 block">
                Password Strength:{" "}
                <span className="text-md font-bold text-black mt-1">{strength.label}</span>
            </label>

            <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                className={clsx("h-full transition-all duration-500", strength.color)}
                style={{
                    width: `${(strength.score + 1) * 20}%`,
                }}
                ></div>
            </div>
        </div>


        {/* Options */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} />
            <span>Include Uppercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
            <span>Include Symbols</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={useEmojis} onChange={(e) => setUseEmojis(e.target.checked)} />
            <span>Use Emojis</span>
          </label>
        </div>

        {/* Length Control */}
        <div className="mt-6">
          <label className="block font-medium mb-1">Password Length: {length}</label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Manual Regenerate */}
        <div className="mt-6 text-center">
          <Button variant="primary" size="lg" onClick={generatePassword}>
            ⚡ Re-generate Password
          </Button>
        </div>
      </div>

      {/* SEO Text Block */}
      <div className="text-sm text-gray-500 mt-8 leading-relaxed">
        <h2 className="text-md font-semibold mb-2">Why Use a Password Generator?</h2>
        <p>
          Secure your online accounts with strong, randomly generated passwords. Avoid using the same password for multiple websites. Our generator uses industry-grade randomness to ensure better security and control.
        </p>
      </div>
    </div>
  );
}
