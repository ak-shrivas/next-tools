"use client";

import { ClipboardCopy, Check, Share2, Twitter, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

type ShareBoxProps = {
  title: string;
  message?: string;
  link?: string; // optional override
};

export function ShareBox({ title, message, link }: ShareBoxProps) {
  const [copied, setCopied] = useState(false);

  const shareLink = link ?? (typeof window !== "undefined" ? window.location.href : "");
  const encodedLink = encodeURIComponent(shareLink);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 bg-gray-50 border border-gray-200 p-5 rounded-xl text-center">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2 mb-2">
        <Share2 className="w-5 h-5 text-blue-600" />
        Share Your Result
      </h3>

      {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}

      {/* Copy Link */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <input
          type="text"
          readOnly
          value={shareLink}
          className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-mono overflow-hidden truncate cursor-text"
          onClick={(e) => e.currentTarget.select()}
        />
        <button
          onClick={handleCopy}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all",
            copied ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
          )}
          aria-label="Copy share link"
        >
          {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mt-2 text-gray-500">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className="hover:text-blue-500"
        >
          <Twitter size={20} />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="hover:text-blue-700"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedLink}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="hover:text-green-600"
        >
          <Send size={20} />
        </a>
      </div>
    </div>
  );
}
