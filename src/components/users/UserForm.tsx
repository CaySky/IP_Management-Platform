import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { UserFormData } from '../../types/user';

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: UserFormData;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          {t('user.username')}
        </label>
        <input
          type="text"
          id="username"
          {...register('username', { required: t('validation.required') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('user.email')}
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: t('validation.required'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('validation.invalidEmail'),
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {!initialData && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('user.password')}
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: !initialData && t('validation.required'),
              minLength: {
                value: 6,
                message: t('validation.passwordMinLength'),
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          {t('user.role')}
        </label>
        <select
          id="role"
          {...register('role', { required: t('validation.required') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="user">{t('user.user')}</option>
          <option value="admin">{t('user.admin')}</option>
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? t('common.save') : t('common.add')}
        </button>
      </div>
    </form>
  );
};

export default UserForm;