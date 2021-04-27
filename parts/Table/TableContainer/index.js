
import { memo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  cell: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    border: 'unset',
    padding: theme.spacing(1, 0)
  },
}));

const TableContainer = ({
  columns,
  className,
  children
}) => {
  const classes = useStyles();

  return (
    <Table aria-label='table' className={className}>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
              className={classes.cell}
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