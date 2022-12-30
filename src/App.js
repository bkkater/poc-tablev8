import React, { useState } from 'react';

import TableSizing from './components/TableSizing';
import TablePinning from './components/TablePinning';
import { defaultData } from './config/mock';

const columns = [
  {
    header: 'Nome',
    accessorKey: 'name',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 280,
  },
  {
    header: 'Data de Nascimento',
    accessorKey: 'birthdate',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    header: 'Sexo',
    accessorKey: 'sex',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    header: 'Altura',
    accessorKey: 'height',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    header: 'Peso',
    accessorKey: 'weight',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    header: 'Nacionalidade',
    accessorKey: 'nationality',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    header: 'Email',
    accessorKey: 'email',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    header: 'Celular',
    accessorKey: 'cel',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
];

function App() {
  const [data] = useState(() => [...defaultData]);

  return (
    <div className='App'>
      <TableSizing data={data} columns={columns} />
      <TablePinning data={data} columns={columns} />
    </div>
  );
}

export default App;
