import * as React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});
export default function Game({ data }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Rank</TableCell>
            <TableCell align="right">Weighted Points&nbsp;</TableCell>
            <TableCell align="right">Publication&nbsp;</TableCell>
            <TableCell align="right">List Year&nbsp;</TableCell>
            <TableCell align="right">List Type&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.rank}
              </TableCell>
              {/*<TableCell align="right">{row.rank}</TableCell>*/}
              <TableCell align="right">{row.weightedpoints}</TableCell>
              <TableCell align="right">{row.publication}</TableCell>
              <TableCell align="right">{row.listyear}</TableCell>
              <TableCell align="right">{row.listtype}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:5000/api/results`);
  const data = await res.json();
  const paths = data.map((game) => {
    return { params: { game: game.name } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `http://localhost:5000/api/${encodeURIComponent(
      params.game.replace(/'/g, "''")
    )}`
  );
  const data = await res.json();
  return {
    props: { data }, // will be passed to the page component as props
  };
};
