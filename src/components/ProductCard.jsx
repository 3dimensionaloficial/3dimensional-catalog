import React from 'react';
import { Palette, Ruler, Boxes, Eye, MessageCircle, ArrowUpRight } from 'lucide-react';

export const ProductCard = ({ product, onOpenDetails }) => {
  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const dimensionsText = product.isKit 
      ? `Kit com ${product.kitItems?.length || 0} peças`
      : `${product.dimensions?.heightCm || 0}cm (alt) × ${product.dimensions?.widthCm || 0}cm (larg) × ${product.dimensions?.lengthCm || 0}cm (comp)`;

    const text = encodeURIComponent(
      `Olá 3Dimensional! Tenho interesse em encomendar o produto:\n\n` +
      `📦 *${product.name}*\n` +
      `🏷️ Categoria: ${product.category}\n` +
      `💰 Preço: R$ ${product.price.toFixed(2)}\n` +
      `📏 Dimensões: ${dimensionsText}\n` +
      (product.isVariableColor ? `🎨 *Gostaria de verificar as opções de cores disponíveis!*\n\n` : `\n`) +
      `Poderiam me passar mais detalhes sobre prazo de produção?`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={() => onOpenDetails(product)}
      className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col glass-card-hover group cursor-pointer"
    >
      {/* Product Image Banner */}
      <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e1b] via-transparent to-transparent" />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-[#0d0e1b]/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-cyan-300">
            {product.category}
          </span>

          {product.isVariableColor && (
            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600/90 to-fuchsia-600/90 backdrop-blur-md border border-fuchsia-400 text-[11px] font-bold text-white flex items-center gap-1 shadow-md animate-pulse">
              <Palette className="w-3 h-3 text-cyan-300" />
              <span>Cores Customizáveis</span>
            </span>
          )}

          {product.isKit && (
            <span className="px-2.5 py-1 rounded-full bg-fuchsia-500/80 backdrop-blur-md border border-fuchsia-400 text-[11px] font-bold text-white flex items-center gap-1 shadow-md">
              <Boxes className="w-3 h-3" />
              <span>KIT ({product.kitItems?.length || 0} peças)</span>
            </span>
          )}
        </div>

        {/* Quick View Floating Eye */}
        <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-slate-200 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 font-heading group-hover:text-cyan-300 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Color Variability Indicator */}
          {product.isVariableColor && (
            <p className="text-[11px] text-purple-300/90 mt-1.5 flex items-center gap-1.5 font-medium">
              <Palette className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
              <span>Pode ser produzido em mais de uma cor / filamento à sua escolha.</span>
            </p>
          )}
        </div>

        {/* Technical Dimensions Spec */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-2">
          <Ruler className="w-4 h-4 text-cyan-400 shrink-0" />
          {product.isKit ? (
            <span>
              Kit composto por <strong className="text-white font-bold">{product.kitItems?.length || 0} objetos</strong>
            </span>
          ) : (
            <span className="truncate">
              Dimensões: <strong className="text-white">{product.dimensions?.heightCm || 0} cm</strong> (alt) × <strong className="text-white">{product.dimensions?.widthCm || 0} cm</strong> (larg) × <strong className="text-white">{product.dimensions?.lengthCm || 0} cm</strong> (comp)
            </span>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Valor de Venda</span>
              <span className="text-xl font-extrabold font-heading text-emerald-400">
                R$ {product.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => onOpenDetails(product)}
              className="text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 hover:underline"
            >
              <span>Ver Fotos & Detalhes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(52,211,153,0.25)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-900" />
            <span>Encomendar via WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
