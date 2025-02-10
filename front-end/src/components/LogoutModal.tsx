import React from 'react';
import { X, } from 'lucide-react';
import { Api } from '../api-client/api';
import { UserStored } from '../api-client/types';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserStored
}

export default function LogoutModal({ isOpen, onClose, user }: LogoutModalProps) {
  const api = new Api();
  
  const onSubmit  = () => {
    return api.logout();
  };

  const handleLogout = () => {
    onSubmit();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">{user?.name}</h2>
          <h2 className="text-xl font-medium text-gray-900">Sair</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}