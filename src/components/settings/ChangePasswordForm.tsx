import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordFormData) => void;
  onCancel: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ChangePasswordFormData>();
  const newPassword = watch('newPassword');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          {t('settings.currentPassword')}
        </label>
        <input
          type="password"
          id="currentPassword"
          {...register('currentPassword', { required: t('validation.required') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          {t('settings.newPassword')}
        </label>
        <input
          type="password"
          id="newPassword"
          {...register('newPassword', {
            required: t('validation.required'),
            minLength: {
              value: 6,
              message: t('validation.passwordMinLength'),
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          {t('settings.confirmPassword')}
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: t('validation.required'),
            validate: value =>
              value === newPassword || t('validation.passwordMismatch'),
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('common.save')}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;