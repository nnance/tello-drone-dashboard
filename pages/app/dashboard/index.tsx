import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import AccelConatiner from "./Accel";
import Chart from "./Chart";
import Controller from "./Controller";
import SpeedConatiner from "./Speed";
import Orders from "./StateLog";
import StatsConatiner from "./Stats";
import Status from "./Status";
import TitleBar from "./TitleBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {". Built with "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  fixedHeight: {
    height: 240,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: theme.spacing(2),
  },
  root: {
    display: "flex",
  },
}));

export default function Dashboard() {
  const classes = useStyles(useTheme());
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>
            <Grid container item spacing={3} xs={10}>
              {/* stats */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <StatsConatiner />
                </Paper>
              </Grid>
              {/* accel */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <AccelConatiner />
                </Paper>
              </Grid>
              {/* speed */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <SpeedConatiner />
                </Paper>
              </Grid>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart />
                </Paper>
              </Grid>
            </Grid>
            <Grid container item xs={2}>
                {/* Drone Status */}
                <Grid item xs={12}>
                  <Paper className={fixedHeightPaper}>
                    <Status />
                  </Paper>
                </Grid>
                {/* Drone Controller */}
                <Grid item xs={12}>
                  <Paper className={fixedHeightPaper}>
                    <Controller />
                  </Paper>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
