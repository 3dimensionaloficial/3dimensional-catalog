import React from 'react';
import { Search, Filter, Palette, DollarSign, X, ArrowUpDown, SlidersHorizontal } from 'lucide-react';

export const CatalogFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onlyVariableColor,
  setOnlyVariableColor,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults
}) => {
  const isFilterActive = searchTerm || selectedCategory !== 'Todas' || minPrice !== '' || maxPrice !== '' || onlyVariableColor || sortBy !== 'featured';

  return (
    <div className="glass-card rounded-2xl border border-white/10 p-5 mb-8 space-y-4">
      
      {/* Top Row: Search Input & Sort By */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar produto por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 glass-input rounded-xl text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort By Dropdown & Clear Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 glass-input rounded-xl text-xs font-semibold appearance-none cursor-pointer"
            >
              <option value="featured" className="bg-[#0d0e1b]">Relevância / Destaques</option>
              <option value="price-asc" className="bg-[#0d0e1b]">Preço: Menor para Maior</option>
              <option value="price-desc" className="bg-[#0d0e1b]">Preço: Maior para Menor</option>
              <option value="name-asc" className="bg-[#0d0e1b]">Nome: A - Z</option>
            </select>
          </div>

          {isFilterActive && (
            <button
              onClick={onResetFilters}
              className="px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Limpar todos os filtros"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Limpar Filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-t border-b border-white/5">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span>Categorias:</span>
        </span>

        {['Todas', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,242,254,0.25)]'
                : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Advanced Filter Controls: Price Range & Variable Colors Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs pt-1">
        
        {/* Price Range Filter */}
        <div className="sm:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="font-bold text-slate-300 flex items-center gap-1 shrink-0">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Faixa de Preço (R$):</span>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-28">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[11px]">R$</span>
              <input
                type="number"
                min="0"
                placeholder="Mín"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 glass-input rounded-lg text-xs"
              />
            </div>

            <span className="text-slate-500 font-bold">até</span>

            <div className="relative flex-1 sm:w-28">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[11px]">R$</span>
              <input
                type="number"
                min="0"
                placeholder="Máx"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 glass-input rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Customizable Colors Toggle */}
        <div className="sm:col-span-4 flex items-center sm:justify-end">
          <label className="flex items-center gap-2 p-2 rounded-xl bg-purple-950/30 border border-purple-500/30 cursor-pointer hover:bg-purple-950/50 transition-colors w-full sm:w-auto">
            <input
              type="checkbox"
              checked={onlyVariableColor}
              onChange={(e) => setOnlyVariableColor(e.target.checked)}
              className="w-4 h-4 accent-fuchsia-500 cursor-pointer"
            />
            <span className="text-xs text-purple-200 font-bold flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Apenas Cores Customizáveis</span>
            </span>
          </label>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-medium">
        <span>Exibindo <strong className="text-cyan-300 font-mono">{totalResults}</strong> produto(s) no catálogo</span>
        {isFilterActive && <span className="text-fuchsia-400 font-semibold">Filtros aplicados</span>}
      </div>

    </div>
  );
};
