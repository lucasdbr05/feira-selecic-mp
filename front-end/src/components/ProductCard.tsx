import React from 'react';
import { ShoppingCart, MapPin, Star } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl ring-1 ring-gray-200 overflow-hidden hover:ring-2 hover:ring-emerald-500 transition-all duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1.5 bg-gray-900/75 backdrop-blur-sm rounded-lg text-sm">
              Indisponível
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
          <span className="text-lg font-semibold text-emerald-600">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span>{product.seller}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{product.fairName}</span>
            <span className="mx-1">•</span>
            <span>{product.distance}km</span>
          </div>
        </div>
        <button
          onClick={() => product.available && onAddToCart(product)}
          disabled={!product.available}
          className={`mt-4 w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
            product.available
              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium transition-colors'
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Adicionar ao Carrinho</span>
        </button>
      </div>
    </div>
  );
}