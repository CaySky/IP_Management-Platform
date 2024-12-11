import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, UserCog } from 'lucide-react';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import type { User, UserFormData } from '../types/user';

const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const handleSubmit = (data: UserFormData) => {
    if (selectedUser) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : user
        )
      );
    } else {
      setUsers(prevUsers => [
        ...prevUsers,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    }
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(t('user.confirmDelete'))) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            <UserCog className="inline-block mr-2 h-8 w-8" />
            {t('user.management')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('user.managementDescription')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setSelectedUser(null);
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('user.addNew')}
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="mt-6 max-w-lg mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {selectedUser ? t('user.edit') : t('user.addNew')}
              </h3>
              <div className="mt-5">
                <UserForm
                  onSubmit={handleSubmit}
                  initialData={selectedUser || undefined}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UserList
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default UserManagement;