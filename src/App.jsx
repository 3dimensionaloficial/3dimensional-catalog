import React, { useState, useMemo } from 'react';
import { CatalogProvider, useCatalog } from './context/CatalogContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CatalogFilters } from './components/CatalogFilters';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PackageX, Sparkles, MessageCircle } from 'lucide-react';

const CatalogContent = () => {
  const { products, categories } = useCatalog();

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyVariableColor, setOnlyVariableColor] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Modal State
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setMinPrice('');
    setMaxPrice('');
    setOnlyVariableColor(false);
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Search term filter
        const matchesSearch = 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.category.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;

        // Price range filter
        const priceNum = Number(p.price) || 0;
        const matchesMinPrice = minPrice === '' || priceNum >= Number(minPrice);
        const matchesMaxPrice = maxPrice === '' || priceNum <= Number(maxPrice);

        // Variable colors toggle
        const matchesVariableColor = !onlyVariableColor || !!p.isVariableColor;

        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesVariableColor;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // 'featured' keeps original order
      });
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice, onlyVariableColor, sortBy]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Header */}
          <HeroBanner />

          {/* Filters Bar */}
          <CatalogFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onlyVariableColor={onlyVariableColor}
            setOnlyVariableColor={setOnlyVariableColor}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onResetFilters={handleResetFilters}
            totalResults={filteredProducts.length}
          />

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={setSelectedProductDetails}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="glass-card rounded-3xl border border-white/10 p-12 text-center space-y-4 max-w-lg mx-auto my-12">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                <PackageX className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold font-heading text-white">
                Nenhum produto encontrado
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                Não encontramos nenhum item no catálogo com os filtros selecionados. Tente ajustar o intervalo de preço ou limpar a busca.
              </p>

              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-slate-900 font-bold text-xs hover:brightness-110 cursor-pointer shadow-md"
              >
                Limpar Filtros & Ver Todos
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 glass-card bg-[#0b0c16]/90 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">3Dimensional</span>
            <span>— Vitrine de Produtos & Catálogo Online</span>
          </div>

          <p>© {new Date().getFullYear()} 3Dimensional. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProductDetails && (
        <ProductDetailModal
          product={selectedProductDetails}
          onClose={() => setSelectedProductDetails(null)}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <CatalogProvider>
      <CatalogContent />
    </CatalogProvider>
  );
}

export default App;
