import React from 'react';
import { MapPin, Star, Eye } from 'lucide-react';
import type { Fair } from '../types';

interface FairCardProps {
  fair: Fair;
  onVisitFair: (fair: Fair) => void;
}

export default function FairsCard({ fair, onVisitFair }: FairCardProps) {
  return (
    <div className="group bg-white rounded-xl ring-1 ring-gray-200 overflow-hidden hover:ring-2 hover:ring-emerald-500 transition-all duration-300">
      <div className="relative">
        <img
          src={fair.image}
          alt={fair.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-white/75 rounded px-2 py-1 flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium text-gray-800">{fair.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{fair.name}</h3>
        <div className="mt-2">
          <span className="font-medium text-gray-900">R$ {fair.averagePrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{fair.location}</span>
          <span className="mx-1">•</span>
          <span>{fair.distance}km</span>
        </div>
        <button
          onClick={() => onVisitFair(fair)}
          className="mt-4 w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium transition-colors"
        >
          <Eye className="h-4 w-4" />
          <span>Visitar Loja</span>
        </button>
      </div>
    </div>
  );
}