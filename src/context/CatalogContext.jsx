import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';

const CatalogContext = createContext();

const INITIAL_FALLBACK_PRODUCTS = [
  {
    id: 'prod_arvore_genealogica',
    name: 'Árvore Genealógica',
    category: 'Arte & Decoração',
    price: 60.00,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 20, widthCm: 18, lengthCm: 3 },
    kitItems: []
  },
  {
    id: 'prod_porta_retrato_janelinha',
    name: 'Porta Retrato Janelinha foto 20x15cm',
    category: 'Arte & Decoração',
    price: 60.00,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 20, widthCm: 15, lengthCm: 4 },
    kitItems: []
  },
  {
    id: 'prod_chaveiro_porta_celular',
    name: 'Chaveiro Porta Celular',
    category: 'Acessórios Tech',
    price: 6.00,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 6, widthCm: 2.5, lengthCm: 1 },
    kitItems: []
  },
  {
    id: 'prod_chaveiro_faculdade',
    name: 'Chaveiro Porta Celular Turma Faculdade',
    category: 'Acessórios Tech',
    price: 7.50,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 6, widthCm: 2.5, lengthCm: 1 },
    kitItems: []
  },
  {
    id: 'prod_suporte_celular_chaveiro',
    name: 'Suporte de Celular Chaveiro',
    category: 'Acessórios Tech',
    price: 2.50,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 6, widthCm: 2.5, lengthCm: 1 },
    kitItems: []
  },
  {
    id: 'prod_kit_3_sensoriais',
    name: 'Kit 3 Brinquedos sensoriais',
    category: 'Brinquedo Sensorial',
    price: 35.00,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80',
    isVariableColor: true,
    isKit: true,
    dimensions: { heightCm: 5, widthCm: 15, lengthCm: 5 },
    kitItems: [
      { name: 'Brinquedo Fidget Spinner Articulado', heightCm: 5, widthCm: 5, lengthCm: 1 },
      { name: 'Engrenagem Giroscópio Sensorial', heightCm: 5, widthCm: 5, lengthCm: 2 },
      { name: 'Cubo Infinito Dobrável', heightCm: 4, widthCm: 4, lengthCm: 4 }
    ]
  },
  {
    id: 'prod_brinquedo_cubo',
    name: 'Brinquedo sensorial cubo',
    category: 'Brinquedo Sensorial',
    price: 15.00,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 4, widthCm: 4, lengthCm: 4 },
    kitItems: []
  },
  {
    id: 'prod_vaso_espiral',
    name: 'Vaso Espiral Moderno',
    category: 'Arte & Decoração',
    price: 60.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 20, widthCm: 10, lengthCm: 10 },
    kitItems: []
  },
  {
    id: 'prod_vaso_cordel',
    name: 'Vaso Cordel',
    category: 'Arte & Decoração',
    price: 40.00,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 16, widthCm: 9, lengthCm: 9 },
    kitItems: []
  },
  {
    id: 'prod_vaso_tulipa',
    name: 'Vaso Tulipa',
    category: 'Arte & Decoração',
    price: 40.00,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 15, widthCm: 10, lengthCm: 10 },
    kitItems: []
  },
  {
    id: 'prod_anjo_iluminado',
    name: 'Anjo Iluminado',
    category: 'Arte & Decoração',
    price: 25.00,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 12, widthCm: 7, lengthCm: 6 },
    kitItems: []
  },
  {
    id: 'prod_ore_confie',
    name: 'Ore e Confie',
    category: 'Arte & Decoração',
    price: 45.00,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 14, widthCm: 18, lengthCm: 2 },
    kitItems: []
  },
  {
    id: 'prod_letreiro_home',
    name: 'Letreiro HOME',
    category: 'Arte & Decoração',
    price: 45.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 10, widthCm: 25, lengthCm: 3 },
    kitItems: []
  },
  {
    id: 'prod_porta_ampola',
    name: 'Porta Ampola',
    category: 'Utilitários',
    price: 12.00,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 4, widthCm: 8, lengthCm: 5 },
    kitItems: []
  },
  {
    id: 'prod_personalizado',
    name: 'Personalizado',
    category: 'Arte & Decoração',
    price: 50.00,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
    isVariableColor: true,
    isKit: false,
    dimensions: { heightCm: 15, widthCm: 15, lengthCm: 4 },
    kitItems: []
  }
];

// Helper to sanitize & filter products from ERP cloud payload
export const processRawProducts = (rawProducts) => {
  if (!Array.isArray(rawProducts)) return [];
  
  // STRICT REQUIREMENT: Only products from the 1st sub-tab of ERP ("Catálogo de Produtos"), NEVER from test tab!
  // In ERP: 1st sub-tab is `!p.isTest`. 2nd sub-tab is `!!p.isTest`.
  const catalogItems = rawProducts.filter(p => p && !p.isTest && p.name?.trim().toLowerCase() !== 'teste');

  // Sanitize to only public information (STRICT PRIVACY)
  return catalogItems.map(p => ({
    id: p.id || ('p_' + Math.random().toString(36).substring(2, 6)),
    name: p.name || 'Produto 3D',
    category: p.category || 'Geral',
    price: Number(p.price) || 0,
    stock: Number(p.stock) || 0,
    image: p.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&q=80',
    isVariableColor: !!p.isVariableColor,
    isKit: !!p.isKit,
    dimensions: {
      heightCm: Number(p.dimensions?.heightCm) || 0,
      widthCm: Number(p.dimensions?.widthCm) || 0,
      lengthCm: Number(p.dimensions?.lengthCm) || 0,
    },
    kitItems: Array.isArray(p.kitItems) ? p.kitItems : []
  }));
};

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('3d_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const processed = processRawProducts(parsed);
        if (processed.length > 0) return processed;
      } catch (e) {}
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

  // Sync state from Supabase Cloud
  const loadFromSupabase = async () => {
    if (!supabase) {
      setIsCloudLive(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('erp_state')
        .select('data')
        .eq('key', 'global_state')
        .maybeSingle();

      if (error) {
        console.warn('Catalog live cloud sync notice:', error.message);
        setIsCloudLive(false);
        return;
      }

      setIsCloudLive(true);
      setLastSyncTime(new Date());

      if (data && data.data) {
        if (data.data.products && Array.isArray(data.data.products)) {
          const sanitized = processRawProducts(data.data.products);
          if (sanitized.length > 0) {
            setProducts(sanitized);
            localStorage.setItem('3d_products', JSON.stringify(data.data.products));
          } else {
            setProducts(INITIAL_FALLBACK_PRODUCTS);
          }
        }

        if (data.data.categories && Array.isArray(data.data.categories) && data.data.categories.length > 0) {
          setCategories(data.data.categories);
          localStorage.setItem('3d_categories', JSON.stringify(data.data.categories));
        }
      }
    } catch (err) {
      console.warn('Catalog live cloud sync notice:', err.message);
      setIsCloudLive(false);
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

              if (payload.new.data.products && Array.isArray(payload.new.data.products)) {
                const sanitized = processRawProducts(payload.new.data.products);
                if (sanitized.length > 0) {
                  setProducts(sanitized);
                  localStorage.setItem('3d_products', JSON.stringify(payload.new.data.products));
                }
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
