import React, { useState, ChangeEvent } from 'react';
import { Search, /*ShoppingCart*/ User, Menu, MapPin } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  openLoginOrLogoutModal?: () => void;
}

export default function Header({ searchQuery, onSearchChange, openLoginOrLogoutModal }: HeaderProps) {
  //const [cartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
            <h1 className="text-xl font-medium text-gray-900">
              feira<span className="text-emerald-600">selecic</span>
            </h1>
          </div>

          {/* Barra de pesquisa */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-9 pr-3 py-2 border-0 ring-1 ring-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm transition-shadow"
                placeholder="Buscar produtos, feiras ou vendedores..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <select className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-xl focus:ring-emerald-500">
                  <option>Todas</option>
                  <option>Frutas</option>
                  <option>Verduras</option>
                  <option>Orgânicos</option>
                </select>
              </div>
            </div>
            <button className="ml-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 flex items-center transition-colors">
              <MapPin className="h-4 w-4 mr-1.5" />
              Local
            </button>
          </div> 

          {/* Ícones a direira*/}
          <div className="flex items-center">
            {/*<button className="p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>*/}
            <button className="ml-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"> 
              <User className="h-5 w-5 text-gray-600" 
              onClick={() => openLoginOrLogoutModal ? openLoginOrLogoutModal() : null}
              />
            </button>
            <button 
              className="ml-3 p-2 rounded-xl hover:bg-gray-50 transition-colors md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Categorias */}
        <nav className="hidden md:flex space-x-8 py-3">
          {['Frutas', 'Verduras', 'Legumes', 'Orgânicos', 'Artesanato', 'Temperos'].map((category) => (
            <a
              key={category}
              href="#"
              className="text-gray-500 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              {category}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}