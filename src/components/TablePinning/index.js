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

  const [isSplit, setIsSplit] = React.useState(false);

  const {
    getIsAllColumnsVisible,
    getToggleAllColumnsVisibilityHandler,
    getAllLeafColumns,
    getRowModel,
    getHeaderGroups,
    getLeftHeaderGroups,
    getCenterHeaderGroups,
    getRightHeaderGroups,
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
    <div className='divTable py-5'>
      <div className='p-2 flex'>
        <div className='inline-block border shadow rounded'>
          <div className='px-1'>
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
          <div>
            <label>
              <input
                type='checkbox'
                checked={isSplit}
                onChange={(e) => setIsSplit(e.target.checked)}
              />{' '}
              Split Mode
            </label>
          </div>
        </div>

        <div className={`flex ${isSplit ? 'gap-2' : ''}`}>
          {isSplit ? (
            <table>
              <thead>
                {getLeftHeaderGroups().map((headerGroup) => (
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
                        {row.getLeftVisibleCells().map((cell) => {
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
          ) : null}
          <table>
            <thead>
              {(isSplit ? getCenterHeaderGroups() : getHeaderGroups()).map(
                (headerGroup) => (
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
                )
              )}
            </thead>
            <tbody>
              {getRowModel()
                .rows.slice(0, 20)
                .map((row) => {
                  return (
                    <tr key={row.id}>
                      {(isSplit
                        ? row.getCenterVisibleCells()
                        : row.getVisibleCells()
                      ).map((cell) => {
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
          {isSplit ? (
            <table>
              <thead>
                {getRightHeaderGroups().map((headerGroup) => (
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
                        {row.getRightVisibleCells().map((cell) => {
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Table;
