import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Home = () => {
  const classes = useStyles();

  const [defaultInfo, setDefaultInfo] = useState([]);
  const [sort, setSort] = useState(false);
  const [rows, setRows] = useState([]);
  const [sortDirection, setSortDirection] = useState({
    total_time: "asc",
    distance: "asc",
    avgPace: "asc",
  });
  const [groups, setGroups] = useState([[], [], []]);

  useEffect(() => {
    if (!sort) {
      fetchFullInfo();
    }
  }, []);

  const fetchFullInfo = async () => {
    const data = await fetch(`http://localhost:5000/`);
    const response = await data.json();
    const temp = await response.map((item) => {
      const { pace, ...element } = item;
      return { ...element, ...pace[0] };
    });
    const result = await temp.map((item) => {
      return {
        ...item,
        avgPace: ((item["total_time"] * 1000) / item["distance"]).toFixed(2),
      };
    });
    setDefaultInfo(result);
    const sorted = result.sort((a, b) => {
      if (a["avgPace"] < b["avgPace"]) return 1;
      else if (a["avgPace"] == b["avgPace"]) return 0;
      return -1;
    });
    const tempRows = sorted.map((item) => {
      return createData(
        item.username,
        item.age,
        item.gender,
        item.total_time,
        item.distance,
        item.avgPace
      );
    });

    setRows(tempRows);
    createGroupsofUsers(tempRows);
  };
  const createGroupsofUsers = (list) => {
    const first = list.filter((item) => item.age >= 20 && item.age < 30);
    const second = list.filter((item) => item.age >= 30 && item.age < 40);
    const third = list.filter((item) => item.age >= 40 && item.age < 60);
    setGroups([first, second, third]);
  };

  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => (a[orderBy] > b[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }

  const sortDefaultInfo = (field) => {
    setSort(true);

    const temp = defaultInfo.sort(getSorting(sortDirection[field], field));
    const tempRows = temp.map((item) => {
      return createData(
        item.username,
        item.age,
        item.gender,
        item.total_time,
        item.distance,
        item.avgPace
      );
    });

    setRows(tempRows);
    createGroupsofUsers(tempRows);
    let newDirection = { ...sortDirection };
    sortDirection[field] == "desc"
      ? (newDirection[field] = "asc")
      : (newDirection[field] = "desc");
    setSortDirection(newDirection);
  };

  function createData(name, age, gender, total_time, distance, avgPace) {
    return { name, age, gender, total_time, distance, avgPace };
  }
  const getTitle = (group) => {
    if (group === 0) return "20-30";
    else if (group === 1) return "30-40";
    return "40-60";
  };

  return (
    <div>
      <AppBar position="static">
        <h2>Herogi</h2>
      </AppBar>
      <div className="list-class">
        <TableContainer className="table-container" component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    onClick={() => {
                      sortDefaultInfo("total_time");
                    }}
                    direction={sortDirection["total_time"]}
                  >
                    Total Time
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    onClick={() => {
                      sortDefaultInfo("distance");
                    }}
                    direction={sortDirection["distance"]}
                  >
                    Distance
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    onClick={() => {
                      sortDefaultInfo("avgPace");
                    }}
                    direction={sortDirection["avgPace"]}
                  >
                    Avg Pace
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((group, index) => {
                return (
                  <React.Fragment>
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        style={{ fontWeight: "bold", cursor: "pointer" }}
                      >
                        <span>{getTitle(index)}</span>
                      </TableCell>
                    </TableRow>
                    {groups[index].map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">{row.gender}</TableCell>
                        <TableCell align="right">{row.total_time}</TableCell>
                        <TableCell align="right">{row.distance}</TableCell>
                        <TableCell align="right">{row.avgPace}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
