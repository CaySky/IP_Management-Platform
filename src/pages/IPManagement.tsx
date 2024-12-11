import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import IPList from '../components/IPList';
import IPForm from '../components/IPForm';
import type { IP, IPFormData } from '../types/ip';

const IPManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedIP, setSelectedIP] = useState<IP | null>(null);
  const [ips, setIps] = useState<IP[]>([
    {
      id: '1',
      address: '192.168.1.1',
      name: 'Gateway',
      status: 'allocated',
      description: 'Main network gateway',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const handleSubmit = (data: IPFormData) => {
    if (selectedIP) {
      // Update existing IP
      setIps(prevIps =>
        prevIps.map(ip =>
          ip.id === selectedIP.id
            ? {
                ...ip,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : ip
        )
      );
    } else {
      // Add new IP
      setIps(prevIps => [
        ...prevIps,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    }
    setShowForm(false);
    setSelectedIP(null);
  };

  const handleEdit = (ip: IP) => {
    setSelectedIP(ip);
    setShowForm(true);
  };

  const handleDelete = (ip: IP) => {
    if (window.confirm('Are you sure you want to delete this IP?')) {
      setIps(prevIps => prevIps.filter(item => item.id !== ip.id));
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">IP Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your IP addresses, their assignments, and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setSelectedIP(null);
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add IP
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="mt-6 max-w-lg mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {selectedIP ? 'Edit IP' : 'Add New IP'}
              </h3>
              <div className="mt-5">
                <IPForm
                  onSubmit={handleSubmit}
                  initialData={selectedIP || undefined}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <IPList
          data={ips}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default IPManagement;