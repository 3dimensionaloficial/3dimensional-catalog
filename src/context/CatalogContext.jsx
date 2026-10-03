import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';

const CatalogContext = createContext();

const INITIAL_FALLBACK_PRODUCTS = [
  { 
    id: 'p1', 
    name: 'Dragon Cyberpunk Articulado', 
    category: 'Action Figures', 
    price: 140.00, 
    stock: 6, 
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 18, widthCm: 12, lengthCm: 25 },
    kitItems: []
  },
  { 
    id: 'p2', 
    name: 'Kit Suporte Headphone + Organizador de Cabos', 
    category: 'Acessórios Tech', 
    price: 95.00, 
    stock: 12, 
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
    isVariableColor: false,
    isKit: true,
    dimensions: { heightCm: 0, widthCm: 0, lengthCm: 0 },
    kitItems: [
      { name: 'Suporte Principal Headphone', heightCm: 22, widthCm: 14, lengthCm: 12 },
      { name: 'Clips Organizadores de Cabo (3x)', heightCm: 4, widthCm: 2, lengthCm: 2 }
    ]
  },
  { 
    id: 'p3', 
    name: 'Engrenagem Industrial PETG-CF', 
    category: 'Peças Técnicas', 
    price: 65.00, 
    stock: 20, 
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80',
    isVariableColor: false,
    isKit: false,
    dimensions: { heightCm: 5, widthCm: 10, lengthCm: 10 },
    kitItems: []
  },
  { 
    id: 'p4', 
    name: 'Miniatura Busto Escultórico', 
    category: 'Arte & Decoração', 
    price: 110.00, 
    stock: 4, 
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=500&q=80',
    isVariableColor: false,
    isKit: false,
    dimensions: { heightCm: 15, widthCm: 9, lengthCm: 9 },
    kitItems: []
  },
  { 
    id: 'p5', 
    name: 'Vasos Geométricos Modernos', 
    category: 'Decoração', 
    price: 95.00, 
    stock: 8, 
    image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 20, widthCm: 11, lengthCm: 11 },
    kitItems: []
  }
];

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('3d_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Filter out test-only items that aren't approved
        return parsed.filter(p => !p.isTest || p.testStatus === 'Aprovado' || p.testStatus === 'Aprovado (Vendido)');
      } catch (e) {
        return INITIAL_FALLBACK_PRODUCTS;
      }
    }
    return INITIAL_FALLBACK_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('3d_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return ['Action Figures', 'Acessórios Tech', 'Peças Técnicas', 'Arte & Decoração', 'Protótipos', 'Decoração'];
  });

  const [isCloudLive, setIsCloudLive] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Helper to sanitize & filter products from ERP cloud payload
  const processRawProducts = (rawProducts) => {
    if (!Array.isArray(rawProducts)) return [];
    
    // Filter only published / catalog items
    const catalogItems = rawProducts.filter(p => !p.isTest || p.testStatus === 'Aprovado' || p.testStatus === 'Aprovado (Vendido)');

    // Sanitize to only public information (STRICT PRIVACY)
    return catalogItems.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category || 'Geral',
      price: Number(p.price) || 0,
      stock: Number(p.stock) || 0,
      image: p.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&q=80',
      isVariableColor: !!p.isVariableColor,
      isKit: !!p.isKit,
      dimensions: p.dimensions || { heightCm: 0, widthCm: 0, lengthCm: 0 },
      kitItems: p.kitItems || []
    }));
  };

  // Sync state from Supabase Cloud
  const loadFromSupabase = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('erp_state')
        .select('data')
        .eq('key', 'global_state')
        .single();

      if (data && data.data) {
        setIsCloudLive(true);
        setLastSyncTime(new Date());

        if (data.data.products) {
          const sanitized = processRawProducts(data.data.products);
          setProducts(sanitized);
          localStorage.setItem('3d_products', JSON.stringify(data.data.products));
        }

        if (data.data.categories) {
          setCategories(data.data.categories);
          localStorage.setItem('3d_categories', JSON.stringify(data.data.categories));
        }
      }
    } catch (err) {
      console.warn('Catalog live cloud sync notice:', err.message);
    }
  };

  // Subscribe to Realtime Supabase changes for auto updates!
  useEffect(() => {
    loadFromSupabase();

    if (supabase) {
      const channel = supabase
        .channel('catalog_realtime_sync')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'erp_state' },
          (payload) => {
            if (payload.new && payload.new.data) {
              setLastSyncTime(new Date());
              setIsCloudLive(true);

              if (payload.new.data.products) {
                const sanitized = processRawProducts(payload.new.data.products);
                setProducts(sanitized);
                localStorage.setItem('3d_products', JSON.stringify(payload.new.data.products));
              }

              if (payload.new.data.categories) {
                setCategories(payload.new.data.categories);
                localStorage.setItem('3d_categories', JSON.stringify(payload.new.data.categories));
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  return (
    <CatalogContext.Provider value={{
      products,
      categories,
      isCloudLive,
      lastSyncTime,
      refreshCatalog: loadFromSupabase
    }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
