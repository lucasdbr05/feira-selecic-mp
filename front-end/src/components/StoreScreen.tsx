import React, { useState } from 'react';
import { Star, MapPin, Clock, Tag, Phone, Mail, DollarSign, ChevronLeft} from 'lucide-react';
import Header from './Header';
import ReviewModal from './ReviewModal';
import useUserData from '../hooks/useUser';
import LoginModal from './LoginModal';
import LogoutModal from './LogoutModal';

interface StoreScreenProps {
  onBack: () => void;
  storeData?: {
    name: string;
    rating: number;
    totalReviews: number;
    address: string;
    schedule: string;
    tags: string[];
    phone: string;
    email: string;
    priceRange: string;
    image: string;
  };
}

const StoreScreen = ({ onBack, storeData = defaultStoreData }: StoreScreenProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useUserData()

  const reviews = [
    {
      id: 1,
      name: "Pedro Santos",
      date: "Janeiro 2023",
      rating: 4,
      comment: "Produtos sempre frescos e preços justos. O Seu João é muito atencioso!"
    },
    {
      id: 2,
      name: "Maria da Silva",
      date: "Janeiro 2023",
      rating: 5,
      comment: "Ótima variedade de produtos. Recomendo!"
    }
  ];

  const productPhotos = Array(8).fill("https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format");

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 flex items-center gap-2"
          >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </button>
          
        {/* Store Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>

            <h1 className="text-3xl font-bold mb-4">{storeData.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {Array(5).fill(null).map((_, index) => (
                  <Star 
                    key={index} 
                    className={`w-5 h-5 ${
                      index < Math.floor(storeData.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-yellow-400/0 text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {storeData.rating.toFixed(1)} ({storeData.totalReviews} avaliações)
              </span>
            </div>

            {/* Store Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>{storeData.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span>{storeData.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-600" />
                <span>{storeData.tags.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-600" />
                <span>{storeData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-600" />
                <span>{storeData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span>{storeData.priceRange}</span>
              </div>
            </div>
          </div>

          {/* Store Image */}
          <div className="rounded-lg overflow-hidden h-[400px]">
            <img
              src={storeData.image}
              alt={storeData.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Photos Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Fotos dos produtos</h2>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {productPhotos.map((photo, index) => (
                <div key={index} className="flex-none w-64 h-64">
                  <img
                    src={photo}
                    alt={`Produto ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Avaliações</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50"
              >
                Ver mais
              </button>
              <button 
                type = "button"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                onClick={() => setIsReviewModalOpen(true)}>
                Escrever Avaliação
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{storeData.rating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {Array(5).fill(null).map((_, index) => (
                    <Star 
                      key={index} 
                      className={`w-5 h-5 ${
                        index < Math.floor(storeData.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-yellow-400/0 text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <div className="text-gray-600">{storeData.totalReviews} avaliações</div>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm text-gray-600">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {Array(review.rating).fill(null).map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        user={user}
      />

    </div>
  );
};

const defaultStoreData = {
  name: "Barraca do Seu João",
  rating: 4.2,
  totalReviews: 125,
  address: "Feira Municipal - Rua das Flores, 123",
  schedule: "Aberto: Terça a Domingo, 06:00 - 14:00",
  tags: ["Frutas", "Verduras", "Legumes"],
  phone: "61 994567890",
  email: "barracadoseujao@gmail.com",
  priceRange: "Preço médio",
  image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800&auto=format"
};

export default StoreScreen;