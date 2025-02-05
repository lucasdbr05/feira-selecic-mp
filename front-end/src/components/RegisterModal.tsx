import React, { useState } from 'react';
import { X, Mail, Lock, User, MapPin, Store } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateUserData, Role } from '../api-client/types';
import { Api } from '../api-client/api';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type FormInputData =  {
  name: string;
  email: string;
  password: string;
  address: string;
  cep: string;
  feiraLocation?: string;
  storeName?: string;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const api = new Api();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputData>();
  const onSubmit: SubmitHandler<FormInputData> = (data) => {
    const req: CreateUserData = {
      email: data.email,
      name: data.name,
      nickname: "fluminense",
      password: data.password,
      role: isFeirante ? Role.SELLER : Role.CLIENT,
      client: {
        cep: data.cep
      }
    }
    api.createUser(req)
  }

  const [isFeirante, setIsFeirante] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Cadastro</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register('name', { required: 'Nome é obrigatório' })}
                className="block w-full pl-9 pr-3 py-2 ring-1 ring-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow sm:text-sm"
                placeholder="Nome"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register('email', { required: 'Email é obrigatório' })}
                className="block w-full pl-9 pr-3 py-2 ring-1 ring-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow sm:text-sm"
                placeholder="Email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="password"
                {...register('password', { required: 'Senha é obrigatória' })}
                className="block w-full pl-9 pr-3 py-2 ring-1 ring-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow sm:text-sm"
                placeholder="Senha"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Endereço</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register('address', { required: 'Endereço é obrigatório' })}
                className="block w-full pl-9 pr-3 py-2 ring-1 ring-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow sm:text-sm"
                placeholder="Endereço"
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CEP</label>
            <input
              type="text"
              {...register('cep', { required: 'CEP é obrigatório' })}
              className="block w-full p-2 ring-1 ring-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow sm:text-sm"
              placeholder="00000-000"
            />
            {errors.cep && <p className="text-red-500 text-sm">{errors.cep.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sou feirante</label>
            <input
              type="checkbox"
              checked={isFeirante}
              onChange={() => setIsFeirante(!isFeirante)}
              className="mr-2"
            />
          </div>
          {isFeirante && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Local da Feira</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register('feiraLocation', { required: 'Local da feira é obrigatório' })}
                    className="block w-full pl-9 pr-3 py-2 ring-1 ring-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow sm:text-sm"
                    placeholder="Nome da feira"
                  />
                </div>
                {errors.feiraLocation && <p className="text-red-500 text-sm">{errors.feiraLocation.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nome da Banca</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register('storeName', { required: 'Nome da banca é obrigatório' })}
                    className="block w-full pl-9 pr-3 py-2 ring-1 ring-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow sm:text-sm"
                    placeholder="Nome da banca"
                  />
                </div>
                {errors.storeName && <p className="text-red-500 text-sm">{errors.storeName.message}</p>}
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}