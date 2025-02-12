import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, Mail, DollarSign, Tag, XIcon } from 'lucide-react';
import FileUpload from './FileUpload';

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

interface EditStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (storeInfo: StoreInfo) => void;
  initialData: StoreInfo;
}

export default function EditStoreModal({ isOpen, onClose, onSave, initialData }: EditStoreModalProps) {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = storeInfo.image;
    
    if (imageFile) {
      // Em um ambiente real, você faria o upload do arquivo para um servidor
      // e receberia a URL da imagem em resposta
      // Por enquanto, cria apenas uma URL local 
      imageUrl = URL.createObjectURL(imageFile);
    }

    onSave({
      ...storeInfo,
      image: imageUrl
    });
    onClose();
  };

  const handleFileSelect = (file: File) => {
    setImageFile(file);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!storeInfo.tags?.includes(newTag.trim())) {
        setStoreInfo({
          ...storeInfo,
          tags: [...(storeInfo.tags || []), newTag.trim()]
        });
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setStoreInfo({
      ...storeInfo,
      tags: storeInfo.tags?.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Editar Informações da Loja</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Loja
            </label>
            <input
              type="text"
              value={storeInfo.name}
              onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin size={16} className="inline mr-1" />
              Endereço
            </label>
            <input
              type="text"
              value={storeInfo.address}
              onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock size={16} className="inline mr-1" />
              Horário de Funcionamento
            </label>
            <input
              type="text"
              value={storeInfo.hours}
              onChange={(e) => setStoreInfo({ ...storeInfo, hours: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Tag size={16} className="inline mr-1" />
              Tags
            </label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {storeInfo.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-emerald-800"
                    >
                      <XIcon size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Digite uma tag e pressione Enter"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Phone size={16} className="inline mr-1" />
              Telefone
            </label>
            <input
              type="tel"
              value={storeInfo.phone}
              onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail size={16} className="inline mr-1" />
              Email
            </label>
            <input
              type="email"
              value={storeInfo.email}
              onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <DollarSign size={16} className="inline mr-1" />
              Faixa de Preço
            </label>
            <select
              value={storeInfo.priceRange}
              onChange={(e) => setStoreInfo({ ...storeInfo, priceRange: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Econômico">Econômico</option>
              <option value="Preço médio">Preço médio</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem da Loja
            </label>
            <FileUpload
              onFileSelect={handleFileSelect}
              currentImageUrl={storeInfo.image}
            />
          </div>

          <div className="flex justify-center space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}