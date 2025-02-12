/**
 * @file Filters.tsx
 * @brief Componente de filtros para busca de produtos.
 * @details Este componente permite que os usuários filtrem itens por preço, distância, categoria e avaliação.
 *          Ele fornece opções de entrada de faixa de preço, controle deslizante para distância, caixas de seleção para categorias
 *          e botões de rádio para classificação por avaliação.
 *          O estado dos filtros é gerenciado e atualizado dinamicamente conforme as interações do usuário.
 *          Inclui um botão para redefinir todos os filtros para os valores padrão.
 */

import React, { ChangeEvent } from 'react';
import { Sliders, Star } from 'lucide-react';

/**
 * @brief Interface das propriedades do componente de filtros.
 * @details Define os tipos para os filtros disponíveis, incluindo faixa de preço, distância, categorias e avaliação.
 */
interface FiltersProps {
  filters: {
    priceRange: { min: number | null; max: number | null };
    distance: number;
    categories: string[];
    rating: number | null;
  };
  onChange: (filters: FiltersProps['filters']) => void;
}

const CATEGORIES = ['Frutas', 'Verduras', 'Legumes', 'Orgânicos', 'Artesanato'];

/**
 * @brief Componente de filtros para busca de produtos.
 * @param {FiltersProps} props - Propriedades do componente.
 * @assertivas_de_entrada - O estado inicial deve conter valores válidos para os filtros.
 * @assertivas_de_saída - O estado atualizado deve refletir os filtros escolhidos pelo usuário.
 * @return {JSX.Element} Elemento de filtro renderizado.
 */
export default function Filters({ filters, onChange }: FiltersProps) {
  /**
   * @brief Manipula a alteração da faixa de preço.
   * @param {('min' | 'max')} type - Define se o valor alterado é o mínimo ou máximo.
   * @param {string} value - Valor digitado pelo usuário.
   * @assertivas_de_entrada - O valor deve ser um número ou uma string vazia.
   * @assertivas_de_saída - O estado de priceRange é atualizado corretamente.
   */
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? null : Number(value);
    onChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: numValue
      }
    });
  };

  /**
   * @brief Manipula a alteração da distância.
   * @param {ChangeEvent<HTMLInputElement>} e - Evento do input range.
   * @assertivas_de_entrada - O valor deve estar dentro da faixa 0-50.
   * @assertivas_de_saída - O estado de distância é atualizado corretamente.
   */
  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      distance: Number(e.target.value)
    });
  };

  /**
   * @brief Manipula a seleção de categorias.
   * @param {string} category - Categoria selecionada.
   * @assertivas_de_entrada - A categoria deve estar definida na lista `CATEGORIES`.
   * @assertivas_de_saída - O estado de categorias é atualizado corretamente.
   */
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onChange({
      ...filters,
      categories: newCategories
    });
  };

  /**
   * @brief Manipula a seleção de avaliação.
   * @param {ChangeEvent<HTMLInputElement>} e - Evento do input radio.
   * @assertivas_de_entrada - O valor deve ser um número entre 1 e 5 ou 0 (qualquer avaliação).
   * @assertivas_de_saída - O estado de rating é atualizado corretamente.
   */
  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedRating = Number(e.target.value);
    onChange({
      ...filters,
      rating: selectedRating === 0 ? null : selectedRating
    });
  };

  /**
   * @brief Limpa todos os filtros e retorna aos valores padrão.
   * @assertivas_de_saída - Todos os filtros são redefinidos para os valores iniciais.
   */
  const handleClearFilters = () => {
    onChange({
      priceRange: { min: null, max: null },
      distance: 50,
      categories: [],
      rating: null
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl ring-1 ring-gray-200 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-gray-900">Filtros</h2>
        <Sliders className="h-4 w-4 text-gray-400" />
      </div>

      {/* Faixa de Preço */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Faixa de Preço</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange.min ?? ''}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className="w-1/2 px-3 py-2 ring-1 ring-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange.max ?? ''}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="w-1/2 px-3 py-2 ring-1 ring-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
          />
        </div>
      </div>

      {/* Distância */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Distância (km)</h3>
        <input
          type="range"
          min="0"
          max="50"
          value={filters.distance}
          onChange={handleDistanceChange}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>0km</span>
          <span>50km</span>
        </div>
      </div>

      {/* Categorias */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Categorias</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded text-emerald-500 focus:ring-emerald-500"
              />
              <span className="ml-2 text-sm text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Avaliação */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Avaliação</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={handleRatingChange}
                className="rounded text-emerald-500 focus:ring-emerald-500"
              />
              <span className="ml-2 flex items-center text-sm text-gray-600">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400" />
                ))}
                <span className="ml-1">ou mais</span>
              </span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="rating"
              value="0"
              checked={filters.rating === null}
              onChange={handleRatingChange}
              className="rounded text-emerald-500 focus:ring-emerald-500"
            />
            <span className="ml-2 text-sm text-gray-600">Qualquer avaliação</span>
          </label>
        </div>
      </div>

      {/* Limpar Filtros */}
      <button
        onClick={handleClearFilters}
        className="w-full py-2 px-4 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm"
      >
        Limpar Filtros
      </button>
    </div>
  );
}