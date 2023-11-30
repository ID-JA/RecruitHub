import { portalLayoutRoute } from '../../layouts/portal-layout';
import { Route } from '@tanstack/react-router';
import { MouseEvent, useMemo, useState } from 'react';
import { ActionIcon, Badge, Checkbox, Group } from '@mantine/core';
import { IconArchive, IconEdit, IconTrash } from '@tabler/icons-react';
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { DataGrid } from '../../components/shared/datatable/DataTable';
// Create a type for data
type Job = {
  id: number;
  title: string;
  location: string;
  company: string;
  createdAt: string;
  createdBy: string;
  status: string;
  candidates: number;
  employees: number;
};

const MOCK_JOBS: Job[] = [
  {
    id: 32,
    title: 'JavaScript developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidates: 5,
    employees: 20
  },
  {
    id: 64,
    title: 'JavaScript developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidates: 5,
    employees: 20
  },
  {
    id: 25,
    title: 'Data Analytic Engineer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'active',
    candidates: 5,
    employees: 12
  },
  {
    id: 4,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 12,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 18,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 5,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 42,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 96,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 7,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 89,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 51,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 92,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 82,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  },
  {
    id: 63,
    title: 'DotNet developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    employees: 2
  }
];

const renderStatus = (status: string) => {
  switch (status) {
    case 'draft':
      return <Badge color='orange'>{status}</Badge>;
    case 'active':
      return <Badge color='green'>{status}</Badge>;

    default:
      return <Badge color='red'>Unknown</Badge>;
  }
};

const renderActions = (record: Job) => {
  return (
    <Group gap={4} justify='center'>
      <ActionIcon
        color='blue'
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.stopPropagation();
          console.log(`edit row with id: ${record.id}`);
        }}
      >
        <IconEdit size={16} />
      </ActionIcon>
      <ActionIcon
        color='red'
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.stopPropagation();
          console.log(`delete row with id: ${record.id}`);
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
      <ActionIcon
        color='orange'
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.stopPropagation();
          console.log(`archive row with id: ${record.id}`);
        }}
      >
        <IconArchive size={16} />
      </ActionIcon>
    </Group>
  );
};

function Jobs() {
  const [rowSelection, setRowSelection] = useState({});

  const columnHelper = createColumnHelper<Job>();

  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        accessorKey: 'select',
        header: ({ table }) => {
          // TODO: Check if there's any way to remove this handler
          const handleHeaderSelectionChange = () => {
            const value =
              (!table.getIsAllRowsSelected() && table.getIsSomePageRowsSelected()) ||
              !table.getIsAllPageRowsSelected();
            console.log(value);

            table.toggleAllPageRowsSelected(value);
          };
          return (
            <Checkbox
              {...{
                checked: table.getIsAllPageRowsSelected(),
                indeterminate:
                  !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected(),
                onChange: handleHeaderSelectionChange
              }}
              onClick={(e) => e.stopPropagation()}
            />
          );
        },
        size: 10,
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
            onClick={(e) => e.stopPropagation()}
          />
        )
      },
      {
        id: 'title',
        accessorFn: (row) => row.title,
        accessorKey: 'Title',
        cell: (info) => info.getValue(),
        size: 150
      },

      {
        accessorFn: (row) => row.company,
        accessorKey: 'Company',
        cell: (info) => info.getValue()
      },

      {
        accessorFn: (row) => row.location,
        accessorKey: 'Location',
        cell: (info) => info.getValue()
      },
      {
        accessorFn: (row) => row.createdAt,
        accessorKey: 'Created At',
        cell: (info) => info.getValue()
      },
      {
        accessorFn: (row) => row.createdBy,
        accessorKey: 'Created By',
        cell: (info) => info.getValue()
      },

      {
        accessorFn: (row) => row.status,
        accessorKey: 'Status',
        cell: (info) => renderStatus(info.getValue() as string),
        size: 50
      },
      {
        accessorFn: (row) => row.employees,
        accessorKey: 'Employees',
        cell: (info) => info.getValue(),
        size: 150
      },

      {
        accessorFn: (row) => row.candidates,
        accessorKey: 'Candidates',
        cell: (info) => info.getValue(),
        size: 150
      },
      columnHelper.display({
        id: 'actions',
        cell: (props) => renderActions(props.row.original),
        size: 100
      })
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: MOCK_JOBS,
    columns,
    state: {
      rowSelection
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const handleRowClick = (row: Job) => {
    console.log('row clicked', row);
  };
  return (
    <div>
      <h1>Jobs (List of jobs)</h1>
      <DataGrid
        table={table}
        onRowClick={(record: Job) => handleRowClick(record)}
        page={table.getState().pagination.pageIndex + 1}
        recordsPerPage={10}
        paginationSize='sm'
        totalRecords={table.getCoreRowModel().rows.length}
        withBorder
      />
    </div>
  );
}

export const jobsRoute = new Route({
  path: 'jobs',
  component: Jobs,
  getParentRoute: () => portalLayoutRoute
});
