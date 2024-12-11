import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FeedbackFormData {
  type: 'bug' | 'feature' | 'other';
  title: string;
  description: string;
}

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormData) => void;
  onCancel: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<FeedbackFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          {t('feedback.type')}
        </label>
        <select
          id="type"
          {...register('type', { required: t('validation.required') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="bug">{t('feedback.typeBug')}</option>
          <option value="feature">{t('feedback.typeFeature')}</option>
          <option value="other">{t('feedback.typeOther')}</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          {t('feedback.title')}
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: t('validation.required') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          {t('feedback.description')}
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description', { required: t('validation.required') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
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
          {t('common.submit')}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;