/**
 * @file ProfileScreen.tsx
 * @brief Tela de perfil do usuário, permitindo a navegação entre perfil, favoritos e avaliações.
 * @details Componente React responsável por exibir e gerenciar a tela de perfil do usuário, onde é possível editar informações pessoais,
 * visualizar feiras favoritas e acessar avaliações feitas anteriormente.
 */

import React, { useState } from 'react';
import { User, Heart, Newspaper, Store, Star } from 'lucide-react';
import Header from '../components/Header';
import FairsCard from '../components/FairsCard';
import StoreScreen from './StoreScreen';
import useUserData from '../hooks/useUser';

import type { Fair } from '../types';

/**
 * @constant {Fair[]} MOCK_FAIRS
 * @brief Lista de feiras fictícias para exibição na tela de favoritos.
 */
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
    rating: 3.0,
    tags: ['Orgânicos', 'Mel', 'Produtos Naturais'],
    averagePrice: 20.0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl7sATwiTU1Mn6QOsgEQGy0jJpqwqJlB2jUA&s'
  }
];

/**
 * @constant {Object[]} MOCK_REVIEWS
 * @brief Lista de avaliações fictícias para exibição na seção de avaliações.
 */
const MOCK_REVIEWS = [
  {
    id: '1',
    storeName: 'João da Horta',
    rating: 5,
    date: '2025-02-05',
    time: '14:30',
    comment: 'Produtos sempre frescos e de alta qualidade! Recomendo.',
  },
  {
    id: '2',
    storeName: 'Maria das Frutas',
    rating: 4,
    date: '2025-02-02',
    time: '10:15',
    comment: 'Variedade incrível, mas um pouco lotada.',
  },
  {
    id: '3',
    storeName: 'Apiário Natural',
    rating: 3,
    date: '2024-11-02',
    time: '16:40',
    comment: 'Péssimo atendimento! Não encontrei o que procurava na loja, e ao pedir ajuda, me falaram que era só procurar direito. 😠😠😠',
  },
];

/**
 * @function ProfileScreen
 * @brief Componente principal da tela de perfil do usuário.
 * @assertivas_de_entrada Nenhuma entrada obrigatória, pois é um componente de tela.
 * @assertivas_de_saída Retorna um componente React representando a tela de perfil do usuário.
 * @return {JSX.Element} Componente React representando a tela de perfil do usuário.
 * @details Permite a navegação entre três seções: Perfil, Favoritos e Avaliações.
 * O usuário pode editar suas informações pessoais, visualizar suas feiras favoritas e acessar suas avaliações.
 */
const ProfileScreen = () => {
  const [activeSection, setActiveSection] = useState('perfil');
  const [showFair, setShowFair] = useState(false);
  const [selectedFair, setSelectedFair] = useState<Fair | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useUserData()

  /**
   * @function handleVisitFair
   * @brief Manipula a seleção de uma feira, alternando a exibição para a tela de detalhes.
   * @param {Fair} fair - Feira selecionada.
   * @assertivas_de_entrada `fair` deve ser um objeto válido contendo informações da feira.
   * @assertivas_de_saída Atualiza o estado `selectedFair` e exibe a tela de detalhes da feira.
   */
  const handleVisitFair = (fair: Fair) => {
    setSelectedFair(fair);
    setShowFair(true);
  };
  
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
            setIsLoginModalOpen(true)
          }
          else {
            setIsLogoutModalOpen(!!user)
          } 
      }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-64 space-y-4">
          <button
            className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 ${activeSection === 'perfil' ? 'bg-emerald-600 text-white' : 'text-emerald-600 border border-emerald-600 hover:bg-emerald-50'}`}
            onClick={() => setActiveSection('perfil')}
          >
            <User className="w-5 h-5" /> Meu Perfil
          </button>
          <button
            className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 ${activeSection === 'favoritos' ? 'bg-emerald-600 text-white' : 'text-emerald-600 border border-emerald-600 hover:bg-emerald-50'}`}
            onClick={() => setActiveSection('favoritos')}
          >
            <Heart className="w-5 h-5" /> Favoritos
          </button>
          <button
            className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 ${activeSection === 'avaliacoes' ? 'bg-emerald-600 text-white' : 'text-emerald-600 border border-emerald-600 hover:bg-emerald-50'}`}
            onClick={() => setActiveSection('avaliacoes')}
          >
            <Newspaper className="w-5 h-5" /> Minhas Avaliações
          </button>
        </div>

        {/* Conteúdo dinâmico */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          {activeSection === 'perfil' && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Meu Perfil</h1>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2" placeholder="Nome Completo da Pessoa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg p-2" placeholder="teste@gmail.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2" placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <input type="password" className="w-full border border-gray-300 rounded-lg p-2" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmação da Senha</label>
                  <input type="password" className="w-full border border-gray-300 rounded-lg p-2" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full py-2 px-4 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700">Salvar Alterações</button>
              </form>
            </div>
          )}
          {activeSection === 'favoritos' && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Favoritos</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MOCK_FAIRS.map((fair) => (
                    <FairsCard
                      key={fair.id}
                      fair={fair}
                      onVisitFair={handleVisitFair}
                    />
                  ))}
              </div>
            </div>
          )}
          {activeSection === 'avaliacoes' && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Minhas Avaliações</h1>
              {MOCK_REVIEWS.length === 0 ? (
                <p className="text-gray-500">Você ainda não fez nenhuma avaliação.</p>
              ) : (
                <div className="space-y-4">
                  {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 shadow-sm flex gap-4 items-start">
                      <div className="flex flex-col items-center">
                        <Store className="w-10 h-10 text-emerald-600" />
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star 
                              key={index}
                              className={
                                index < review.rating ? 'w-5 h-5 text-yellow-500' : 'w-5 h-5 text-gray-300'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">{review.storeName}</h2>
                        <p className="text-gray-500 text-sm">{review.date} às {review.time}</p>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
