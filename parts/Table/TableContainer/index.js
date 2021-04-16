
import { memo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

const TableContainer = ({
  columns,
  className,
  children
}) => {
  return (
    <Table aria-label='table' className={className}>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {children}
      </TableBody>
    </Table>

  )
}

export default memo(TableContainer)