import React from 'react';
import { Box, Sparkles, MessageCircle, RefreshCw, Zap } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export const Navbar = () => {
  const { isCloudLive, lastSyncTime, refreshCatalog } = useCatalog();

  const handleWhatsAppGeneral = () => {
    const text = encodeURIComponent('Olá! Acessei o catálogo da 3Dimensional e gostaria de tirar uma dúvida sobre encomendar peças em 3D.');
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-white/10 backdrop-blur-xl bg-[#0b0c16]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-fuchsia-500 p-0.5 shadow-[0_0_20px_rgba(0,242,254,0.4)]">
            <div className="w-full h-full bg-[#0d0e1b] rounded-[14px] flex items-center justify-center">
              <Box className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black font-heading tracking-tight text-white">
                3DIMENSIONAL
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-500/30 text-cyan-300 uppercase tracking-widest">
                Catálogo
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium block">
              Impressão 3D de Alta Precisão & Protótipos
            </span>
          </div>
        </div>

        {/* Live Sync Badge & WhatsApp Contact */}
        <div className="flex items-center gap-3">
          
          {/* Cloud Sync Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className={`w-2 h-2 rounded-full ${isCloudLive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300 text-[11px] font-medium">
              {isCloudLive ? 'Ao Vivo (Sincronizado)' : 'Offline / Local'}
            </span>
            <button
              onClick={refreshCatalog}
              className="p-1 hover:text-cyan-400 text-slate-400 transition-colors cursor-pointer ml-1"
              title="Atualizar Catálogo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Contact WhatsApp Button */}
          <button
            onClick={handleWhatsAppGeneral}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-900" />
            <span className="hidden sm:inline">Falar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>

        </div>
      </div>
    </header>
  );
};
