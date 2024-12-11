import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { APIKeyFormData } from '../../types/apiKey';

interface APIKeyFormProps {
  onSubmit: (data: APIKeyFormData) => void;
}

const APIKeyForm: React.FC<APIKeyFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<APIKeyFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('apiKey.name')}
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: t('validation.required') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="permissions" className="block text-sm font-medium text-gray-700">
          {t('apiKey.permissions')}
        </label>
        <select
          multiple
          id="permissions"
          {...register('permissions', { required: t('validation.required') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="read">{t('apiKey.permissionRead')}</option>
          <option value="write">{t('apiKey.permissionWrite')}</option>
          <option value="delete">{t('apiKey.permissionDelete')}</option>
        </select>
        {errors.permissions && (
          <p className="mt-1 text-sm text-red-600">{errors.permissions.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">
          {t('apiKey.expiresAt')}
        </label>
        <input
          type="date"
          id="expiresAt"
          {...register('expiresAt')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('apiKey.generate')}
        </button>
      </div>
    </form>
  );
};

export default APIKeyForm;