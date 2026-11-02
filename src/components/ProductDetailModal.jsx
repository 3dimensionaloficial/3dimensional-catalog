import React from 'react';
import { X, Ruler, Palette, Boxes, MessageCircle, Sparkles, CheckCircle, Package } from 'lucide-react';

export const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;
  const priceNum = Number(product.price) || 0;

  const handleWhatsAppOrder = () => {
    const dimensionsText = product.isKit 
      ? `Kit com ${product.kitItems?.length || 0} peças`
      : `${product.dimensions?.heightCm || 0}cm (alt) × ${product.dimensions?.widthCm || 0}cm (larg) × ${product.dimensions?.lengthCm || 0}cm (comp)`;

    const text = encodeURIComponent(
      `Olá 3Dimensional! Acessei o catálogo online e gostaria de encomendar o seguinte produto:\n\n` +
      `📦 *${product.name || 'Produto 3D'}*\n` +
      `🏷️ Categoria: ${product.category || 'Geral'}\n` +
      `💰 Valor: R$ ${priceNum.toFixed(2)}\n` +
      `📏 Dimensões: ${dimensionsText}\n` +
      (product.isVariableColor ? `🎨 *Gostaria de combinar as cores personalizadas do meu pedido!*\n\n` : `\n`) +
      `Por favor, me informe o prazo de entrega e formas de pagamento!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,242,254,0.15)]">
        
        {/* Header with Title & Close Button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
              {product.category}
            </span>
            {product.isVariableColor && (
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Cores Customizáveis</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Product Display: Image & Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Large Image Preview */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg">
              <img
                src={product.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&q=80'}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e1b]/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Product Info & Specifications */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-white leading-tight">
                {product.name}
              </h2>
              
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-heading text-emerald-400">
                  R$ {priceNum.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  (Preço de Venda / Encomenda)
                </span>
              </div>
            </div>

            {/* Variable Color Info Box */}
            {product.isVariableColor && (
              <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-fuchsia-400" />
                  <span>🎨 Opções de Cores Personalizadas:</span>
                </div>
                <p className="text-[11px] text-purple-300 leading-relaxed">
                  Este produto permite a escolha de diferentes combinações de cores e filamentos (PLA, PETG, Resina). Ao encomendar, você poderá escolher a cor de cada parte da peça!
                </p>
              </div>
            )}

            {/* Dimensions Section */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs text-cyan-300">
                <Ruler className="w-4 h-4 text-cyan-400" />
                <span>Dimensões & Medidas Técnicas:</span>
              </div>

              {!product.isKit ? (
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Altura</span>
                    <strong className="text-white text-sm font-mono">{product.dimensions?.heightCm || 0} cm</strong>
                  </div>

                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Largura</span>
                    <strong className="text-white text-sm font-mono">{product.dimensions?.widthCm || 0} cm</strong>
                  </div>

                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Comprimento</span>
                    <strong className="text-white text-sm font-mono">{product.dimensions?.lengthCm || 0} cm</strong>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-[11px] text-fuchsia-300 font-bold flex items-center gap-1">
                    <Boxes className="w-3.5 h-3.5" />
                    <span>Peças Incluídas neste Kit ({product.kitItems?.length || 0}):</span>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs">
                    {product.kitItems?.map((item, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-slate-200">
                        <span className="font-semibold text-white">{item.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {item.heightCm} × {item.widthCm} × {item.lengthCm} cm
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* WhatsApp Order Action CTA Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="sm:w-36 py-3 rounded-2xl border border-white/10 text-slate-300 font-semibold hover:bg-white/5 cursor-pointer text-xs"
          >
            Fechar
          </button>

          <button
            onClick={handleWhatsAppOrder}
            className="flex-1 py-3.5 rounded-2xl text-xs font-bold text-slate-900 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-110 transition-all shadow-[0_0_25px_rgba(52,211,153,0.35)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-900" />
            <span>Encomendar este Produto via WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
