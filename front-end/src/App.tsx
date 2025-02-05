import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import FairsCard from './components/FairsCard';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import LogoutModal from './components/LogoutModal';
import StoreScreen from './components/StoreScreen';

import type { Fair } from './types';
import useUserData from './hooks/useUser';
import { UserStored } from './api-client/types';

const MOCK_FAIRS: Fair[] = [
  {
    id: '1',
    name: 'João da Horta',
    fairName: 'Feira do Centro',
    location: 'Centro',
    distance: 2.5,
    available: true,
    rating: 4.8,
    tags: ['Orgânicos', 'Verduras', 'Legumes'],
    averagePrice: 15.0,
    image: 'https://t3.ftcdn.net/jpg/04/63/80/54/360_F_463805496_sV0RjLycYlyIVEOfrKqbyZdFOOrgsib2.jpg'
  },
  {
    id: '2',
    name: 'Maria das Frutas',
    fairName: 'Feira do Bairro',
    location: 'Jardim América',
    distance: 1.8,
    available: true,
    rating: 4.5,
    tags: ['Frutas', 'Orgânicos'],
    averagePrice: 12.5,
    image: 'https://wallpapers.com/images/hd/fruit-background-6gwbkokjaxb2v8vp.jpg'
  },
  {
    id: '3',
    name: 'Chocolates Gourmet',
    fairName: 'Feira Central',
    location: 'Centro',
    distance: 3.0,
    available: true,
    rating: 4.9,
    tags: ['Doces', 'Chocolate Artesanal'],
    averagePrice: 30.0,
    image: 'https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2016/06/chocolate-na-mesa.jpg'
  },
  {
    id: '4',
    name: 'Apiário Natural',
    fairName: 'Feira do Centro',
    location: 'Centro',
    distance: 2.8,
    available: true,
    rating: 5.0,
    tags: ['Orgânicos', 'Mel', 'Produtos Naturais'],
    averagePrice: 20.0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl7sATwiTU1Mn6QOsgEQGy0jJpqwqJlB2jUA&s'
  }
];

interface FilterState {
  priceRange: { min: number | null; max: number | null };
  distance: number;
  categories: string[];
  rating: number | null;
}

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showFair, setShowFair] = useState(false);
  const [selectedFair, setSelectedFair] = useState<Fair | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: null, max: null },
    distance: 50,
    categories: [],
    rating: null
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleVisitFair = (fair: Fair) => {
    setSelectedFair(fair);
    setShowFair(true);
  };

  const filteredFairs = useMemo(() => {
    return MOCK_FAIRS.filter(fair => {
      // Filtro por faixa de preço
      if (filters.priceRange.min !== null && fair.averagePrice < filters.priceRange.min) {
        return false;
      }
      if (filters.priceRange.max !== null && fair.averagePrice > filters.priceRange.max) {
        return false;
      }

      // Filtro por distância
      if (fair.distance > filters.distance) {
        return false;
      }

      // Filtro por categorias
      if (filters.categories.length > 0 && !filters.categories.some(tag => fair.tags.includes(tag))) {
        return false;
      }

      // Filtro por rating
      if (filters.rating !== null && fair.rating < filters.rating) {
        return false;
      }

      // Filtro pela pesquisa (tags)
      if (searchQuery.trim() !== '') {
        const lowerQuery = searchQuery.toLowerCase();
        if (!fair.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.averagePrice - b.averagePrice;
        case 'price-desc':
          return b.averagePrice - a.averagePrice;
        case 'distance':
          return a.distance - b.distance;
        default:
          return 0;
      }
    });
  }, [filters, sortBy, searchQuery]);
  const user = useUserData()

  if (showFair && selectedFair) {
    return (
      <StoreScreen
        onBack={() => setShowFair(false)}
        storeData={{
          name: selectedFair.name,
          rating: selectedFair.rating,
          totalReviews: 125,
          address: `${selectedFair.fairName} - ${selectedFair.location}`,
          schedule: "Aberto: Terça a Domingo, 06:00 - 14:00",
          tags: selectedFair.tags,
          phone: "61 994567890",
          email: `${selectedFair.name.toLowerCase().replace(/\s/g, '')}@gmail.com`,
          priceRange: "Preço médio",
          image: selectedFair.image
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}  
        openLoginOrLogoutModal={() => {
          if(!user ) {
            console.log("-->", !user)
            setIsLoginModalOpen(true)
          }
          else {
            setIsLogoutModalOpen(!!user)
          } 
        }}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Barra lateral de filtros */}
          <div className="hidden lg:block">
            <Filters
              filters={filters}
              onChange={setFilters}
            />
          </div>

          {/* Lista de bancas */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFairs.map((fair) => (
                <FairsCard
                  key={fair.id}
                  fair={fair}
                  onVisitFair={handleVisitFair}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        user={user}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}

export default App;