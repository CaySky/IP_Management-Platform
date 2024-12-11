import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2 } from 'lucide-react';
import type { User } from '../../types/user';

interface UserListProps {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const columnHelper = createColumnHelper<User>();

const UserList: React.FC<UserListProps> = ({ data, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const columns = [
    columnHelper.accessor('username', {
      header: t('user.username'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: t('user.email'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('role', {
      header: t('user.role'),
      cell: info => (
        <span className={`capitalize ${
          info.getValue() === 'admin' ? 'text-indigo-600' : 'text-gray-600'
        }`}>
          {t(`user.${info.getValue()}`)}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: t('common.actions'),
      cell: props => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(props.row.original)}
            className="p-1 text-gray-600 hover:text-indigo-600"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(props.row.original)}
            className="p-1 text-gray-600 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;