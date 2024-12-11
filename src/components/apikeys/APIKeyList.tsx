import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Trash2, Copy } from 'lucide-react';
import type { APIKey } from '../../types/apiKey';

interface APIKeyListProps {
  data: APIKey[];
  onDelete: (apiKey: APIKey) => void;
}

const columnHelper = createColumnHelper<APIKey>();

const APIKeyList: React.FC<APIKeyListProps> = ({ data, onDelete }) => {
  const { t } = useTranslation();

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const columns = [
    columnHelper.accessor('name', {
      header: t('apiKey.name'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('key', {
      header: t('apiKey.key'),
      cell: info => (
        <div className="flex items-center space-x-2">
          <code className="bg-gray-100 px-2 py-1 rounded">{info.getValue()}</code>
          <button
            onClick={() => handleCopy(info.getValue())}
            className="text-gray-400 hover:text-gray-600"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      ),
    }),
    columnHelper.accessor('lastUsed', {
      header: t('apiKey.lastUsed'),
      cell: info => info.getValue() ? new Date(info.getValue()!).toLocaleString() : '-',
    }),
    columnHelper.accessor('expiresAt', {
      header: t('apiKey.expiresAt'),
      cell: info => info.getValue() ? new Date(info.getValue()!).toLocaleDateString() : t('apiKey.never'),
    }),
    columnHelper.display({
      id: 'actions',
      header: t('common.actions'),
      cell: props => (
        <div className="flex space-x-2">
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

export default APIKeyList;