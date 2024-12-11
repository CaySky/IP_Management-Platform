import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import type { IP } from '../types/ip';

interface IPListProps {
  data: IP[];
  onEdit: (ip: IP) => void;
  onDelete: (ip: IP) => void;
}

const columnHelper = createColumnHelper<IP>();

const IPList: React.FC<IPListProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    columnHelper.accessor('address', {
      header: 'IP Address',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`capitalize ${
          info.getValue() === 'available' ? 'text-green-600' :
          info.getValue() === 'allocated' ? 'text-blue-600' :
          'text-yellow-600'
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: info => info.getValue() || '-',
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
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
    <div className="mt-4 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
      </div>
    </div>
  );
};

export default IPList;