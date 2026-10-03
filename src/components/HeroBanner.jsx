import React from 'react';
import { Sparkles, Palette, Ruler, ShieldCheck, Zap } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl glass-card border border-white/10 p-8 sm:p-12 mb-10 bg-gradient-to-br from-[#121528]/90 via-[#181c36]/70 to-[#0b0c16]/90">
      {/* Background Neon Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Vitrine Oficial 3Dimensional</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
          Explore Nossos Produtos & <span className="text-gradient-neon">Peças 3D Exclusivas</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Confira abaixo o catálogo atualizado em tempo real. Peças pré-modeladas, action figures, kits funcionais e componentes técnicos produzidos com máxima precisão em impressão 3D.
        </p>

        {/* Feature Badges */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <Palette className="w-4 h-4 text-fuchsia-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-100 block">Cores Customizáveis</span>
              <span className="text-[11px] text-slate-400">Escolha a cor ideal</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <Ruler className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-100 block">Dimensões Reais</span>
              <span className="text-[11px] text-slate-400">Especificações em CM</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-100 block">Sob Encomenda</span>
              <span className="text-[11px] text-slate-400">Produção sob medida</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
