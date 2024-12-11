import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { Lock, LogOut, MessageSquare } from 'lucide-react';
import { userAtom } from '../../store/auth';
import SettingsModal from './SettingsModal';

interface SettingsMenuProps {
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const [modalType, setModalType] = useState<'password' | 'feedback' | null>(null);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
    onClose();
  };

  return (
    <>
      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <button
            onClick={() => setModalType('password')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            role="menuitem"
          >
            <Lock className="mr-3 h-4 w-4" />
            {t('settings.changePassword')}
          </button>
          
          <button
            onClick={() => setModalType('feedback')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            role="menuitem"
          >
            <MessageSquare className="mr-3 h-4 w-4" />
            {t('settings.feedback')}
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            role="menuitem"
          >
            <LogOut className="mr-3 h-4 w-4" />
            {t('user.logout')}
          </button>
        </div>
      </div>

      {modalType && (
        <SettingsModal
          type={modalType}
          onClose={() => {
            setModalType(null);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default SettingsMenu;