import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const Table = ({ data, columns }) => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnPinning, setColumnPinning] = useState({});

  const {
    getIsAllColumnsVisible,
    getToggleAllColumnsVisibilityHandler,
    getAllLeafColumns,
    getRowModel,
    getHeaderGroups,
    getCenterTotalSize,
  } = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
    },
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className='divTable'>
      <div className='flex p-2'>
        <div className='inline-block border border-black shadow rounded'>
          <div className='px-1 border-b border-black'>
            <label>
              <input
                {...{
                  type: 'checkbox',
                  checked: getIsAllColumnsVisible(),
                  onChange: getToggleAllColumnsVisibilityHandler(),
                }}
              />{' '}
              Toggle All
            </label>
          </div>
          {getAllLeafColumns().map((column) => {
            return (
              <div key={column.id} className='px-1'>
                <label>
                  <input
                    {...{
                      type: 'checkbox',
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{' '}
                  {column.id}
                </label>
              </div>
            );
          })}
        </div>
        <div className='flex'>
          <table
            className='border-2 border-black'
            {...{
              style: {
                width: getCenterTotalSize(),
              },
            }}
          >
            <thead>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div className='whitespace-nowrap'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div className='flex gap-1 justify-center'>
                          {header.column.getIsPinned() !== 'left' ? (
                            <button
                              className='border rounded px-2'
                              onClick={() => {
                                header.column.pin('left');
                              }}
                            >
                              {'<='}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() ? (
                            <button
                              className='border rounded px-2'
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              X
                            </button>
                          ) : null}
                          {header.column.getIsPinned() !== 'right' ? (
                            <button
                              className='border rounded px-2'
                              onClick={() => {
                                header.column.pin('right');
                              }}
                            >
                              {'=>'}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {getRowModel()
                .rows.slice(0, 20)
                .map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
