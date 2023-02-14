import { Center, Table as MantineTable, TableProps, Text } from "@mantine/core";

/* -------- TABLE COLUMN COMPONENT ----------- */

interface ColumnType {
  label: string;
  render?: (value: any, record: any) => React.ReactNode;
  key: string;
}

const TableColumn: React.FC<ColumnType> = ({ label }) => {
  return (
    <th>
      <Center>
        <Text>{label}</Text>
      </Center>
    </th>
  );
};

/* -------- TABLE ROW COMPONENT ----------- */

const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <td>
      <Center>{children}</Center>
    </td>
  );
};

/* -------- MAIN COMPONENT ----------- */

interface CustomTableProps {
  columns: ColumnType[];
  data: any[];
  children?: React.ReactNode;
  mantineTableProps?: TableProps;
}

const Table: React.FC<CustomTableProps> = ({
  columns,
  data,
  children,
  mantineTableProps,
}) => {
  return (
    <MantineTable {...mantineTableProps}>
      <thead>
        <tr>
          {columns.map((col) => (
            <TableColumn label={col.label} key={col.key} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, idx) => (
          <tr key={idx}>
            {columns.map((column) => (
              <TableRow key={column.key}>
                {column.render
                  ? column.render(record[column.key], record)
                  : record[column.key]}
              </TableRow>
            ))}
          </tr>
        ))}
      </tbody>
    </MantineTable>
  );
};

export default Table;
