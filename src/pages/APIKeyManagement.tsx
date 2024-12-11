import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Key } from 'lucide-react';
import APIKeyList from '../components/apikeys/APIKeyList';
import APIKeyForm from '../components/apikeys/APIKeyForm';
import type { APIKey, APIKeyFormData } from '../types/apiKey';

const APIKeyManagement: React.FC = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);

  const handleSubmit = (data: APIKeyFormData) => {
    const newKey = {
      id: Math.random().toString(36).substr(2, 9),
      userId: '1', // Current user ID
      key: Math.random().toString(36).substr(2, 32),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setApiKeys(prevKeys => [...prevKeys, newKey]);
    setShowForm(false);
  };

  const handleDelete = (apiKey: APIKey) => {
    if (window.confirm(t('apiKey.confirmDelete'))) {
      setApiKeys(prevKeys => prevKeys.filter(key => key.id !== apiKey.id));
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            <Key className="inline-block mr-2 h-8 w-8" />
            {t('apiKey.management')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('apiKey.managementDescription')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('apiKey.generate')}
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="mt-6 max-w-lg mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t('apiKey.generate')}
              </h3>
              <div className="mt-5">
                <APIKeyForm onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <APIKeyList
          data={apiKeys}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default APIKeyManagement;