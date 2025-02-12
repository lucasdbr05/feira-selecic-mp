import React, { useState } from 'react';
import { Pencil, Star, MapPin, Clock, Phone, Mail, DollarSign, Plus, Trash2, ChevronLeft, Tag } from 'lucide-react';
import Header from '../components/Header';
import AddProductModal from '../components/AddProductModal';
import EditStoreModal from '../components/EditStoreModal';
import useUserData from '../hooks/useUser';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface StoreInfo {
  name: string;
  address: string;
  hours: string;
  tags: string[];
  phone: string;
  email: string;
  priceRange: string;
  image: string;
}

interface EditStoreScreenProps {
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

const EditStoreScreen = ( {onBack, storeData = defaultStoreData}: EditStoreScreenProps) => {
  const [isEditStoreModalOpen, setIsEditStoreModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: storeData.name,
    address: storeData.address,
    hours: storeData.schedule,
    tags: storeData.tags,
    phone: storeData.phone,
    email: storeData.email,
    priceRange: storeData.priceRange,
    image: storeData.image
  });
  
  // atributos do Header
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useUserData()
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Tomate',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format',
    },
  ]);

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

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdateStoreInfo = (newStoreInfo: StoreInfo) => {
    setStoreInfo(newStoreInfo);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          <div className="space-y-4">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              {storeData.name}
              <button
                onClick={() => setIsEditStoreModalOpen(true)}
                className="text-emerald-500 hover:text-emerald-600"
              >
                <Pencil size={16} />
              </button>
            </h1>
            
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-6">Produtos</h2>
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
            >
            <Plus size={16} />
              Adicionar Produto
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
            <div
              key={product.id}
              className="relative group border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-emerald-600">R$ {product.price.toFixed(2)}</p>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
              <Trash2 size={16} />
              </button>
            </div>
            ))}
          </div>
        </section>
        
        {/* Reviews Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Avaliações</h2>
            <div className="flex gap-4">
              <button
                //onClick={() => setShowAllReviews(!showAllReviews)}
              >
                Ver mais
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

      <EditStoreModal
        isOpen={isEditStoreModalOpen}
        onClose={() => setIsEditStoreModalOpen(false)}
        onSave={handleUpdateStoreInfo}
        initialData={storeInfo}
      />

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSave={handleAddProduct}
      />
    </div>
  );
}

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

export default EditStoreScreen;