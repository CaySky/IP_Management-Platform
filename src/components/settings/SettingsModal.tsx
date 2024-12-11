import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import ChangePasswordForm from './ChangePasswordForm';
import FeedbackForm from './FeedbackForm';

interface SettingsModalProps {
  type: 'password' | 'feedback';
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ type, onClose }) => {
  const { t } = useTranslation();

  const handlePasswordChange = async (data: any) => {
    // TODO: Implement password change logic
    console.log('Password change:', data);
    onClose();
  };

  const handleFeedbackSubmit = async (data: any) => {
    // TODO: Implement feedback submission logic
    console.log('Feedback:', data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {type === 'password' ? t('settings.changePassword') : t('settings.feedback')}
              </h3>
              <div className="mt-4">
                {type === 'password' ? (
                  <ChangePasswordForm onSubmit={handlePasswordChange} onCancel={onClose} />
                ) : (
                  <FeedbackForm onSubmit={handleFeedbackSubmit} onCancel={onClose} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;