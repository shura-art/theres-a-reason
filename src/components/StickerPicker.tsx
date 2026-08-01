import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dropletStickers, chatStickers } from '../data/stickers';
import type { Sticker } from '../types';

export function StickerPicker({
  onSelect,
  onClose,
}: {
  onSelect: (sticker: Sticker) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<'droplet' | 'chat'>('droplet');
  const stickers = tab === 'droplet' ? dropletStickers : chatStickers;

  return (
    <AnimatePresence>
      <motion.div
        className="sticker-picker"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="sticker-tabs">
          <button
            className={tab === 'droplet' ? 'active' : ''}
            onClick={() => setTab('droplet')}
          >
            Droplets
          </button>
          <button
            className={tab === 'chat' ? 'active' : ''}
            onClick={() => setTab('chat')}
          >
            Quick Reactions
          </button>
        </div>
        <div className="sticker-grid">
          {stickers.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                onSelect(s);
                onClose();
              }}
              aria-label={`Send ${s.name} sticker`}
            >
              {s.emoji}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
