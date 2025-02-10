import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Api } from '../api-client/api';
import RegisterModal from './RegisterModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const api = new Api();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    api.login(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Entrar</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="w-full py-2.5 px-4 ring-1 ring-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              onClick={() => setIsRegisterModalOpen(true)}
            >
              Cadastre-se
            </button>
          </div>
        </div>
      </div>

      {/*Modal de Register - Adicionado aqui*/}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

    </div>
  );
}