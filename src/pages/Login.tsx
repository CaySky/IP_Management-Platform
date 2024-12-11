import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import { LogIn, Key } from 'lucide-react';
import type { LoginFormData } from '../types/user';
import { userAtom, validateCredentials } from '../store/auth';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>();

  const handleLogin = useCallback((data: LoginFormData) => {
    if (validateCredentials(data.username, data.password)) {
      setUser({
        id: '1',
        username: data.username,
        email: 'admin@example.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      navigate('/');
    } else {
      setError('username', {
        type: 'manual',
        message: t('validation.invalidCredentials'),
      });
      setError('password', {
        type: 'manual',
        message: t('validation.invalidCredentials'),
      });
    }
  }, [navigate, setUser, setError, t]);

  const handleSSOLogin = () => {
    // TODO: Implement SSO login logic
    console.log('SSO login clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Key className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('user.login')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {t('user.username')}
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  {...register('username', { required: t('validation.required') })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('user.password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: t('validation.required') })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogIn className="h-5 w-5 mr-2" />
                {t('user.login')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t('user.ssoLogin')}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSSOLogin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('user.ssoLoginButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;