import React, { useState } from 'react';
import { X } from 'lucide-react';
import FileUpload from './FileUpload';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: { name: string; price: number; image: string }) => void;
}

export default function AddProductModal({ isOpen, onClose, onSave }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = 'https://via.placeholder.com/150';
    
    if (imageFile) {
      // Em um ambiente real, você faria o upload do arquivo para um servidor
      // e receberia a URL da imagem em resposta
      // Por enquanto, vamos criar uma URL local para o preview
      imageUrl = URL.createObjectURL(imageFile);
    }

    onSave({
      name,
      price: Number(price),
      image: imageUrl,
    });
    onClose();
  };

  const handleFileSelect = (file: File) => {
    setImageFile(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Adicionar Novo Produto</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite o nome do produto"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2">R$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem do Produto
            </label>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
          >
            Salvar Produto
          </button>
        </form>
      </div>
    </div>
  );
}