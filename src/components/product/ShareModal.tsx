import React, { useState } from 'react';
import { Copy, Check, X, Share2 } from 'lucide-react';
import { Language } from '../../types/cms';
import { uiStrings } from '../../lib/i18n';

export const ShareModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  lang: Language;
}> = ({ isOpen, onClose, title, url, lang }) => {
  const [copied, setCopied] = useState(false);
  const common = uiStrings[lang].common;

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard permission issues
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#C9A24A]/40 max-w-md w-full p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-[#C9A24A]">
            <Share2 className="w-4 h-4" />
            <h3 className="text-sm uppercase tracking-[0.18em] font-medium">
              {common.sharePiece}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#A3A3A3] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="font-editorial text-lg text-[#F7F7F5]">{title}</p>

        <div className="flex items-center gap-2 bg-[#090909] border border-white/15 p-2.5">
          <input
            type="text"
            readOnly
            value={url}
            dir="ltr"
            className="bg-transparent text-xs text-[#A3A3A3] flex-1 outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A24A] text-[#090909] text-xs font-medium uppercase tracking-wider"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? common.copied : common.copyLink}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
