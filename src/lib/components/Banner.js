import React, { useContext } from "react";
import "./Banner.css";
import { AppContext } from "../contexts/GlobalContext";
import { Alert, Grid, LinearProgress } from "@mui/material";

function Banner() {
  const context = useContext(AppContext);
  const loadingId = "loadingBar";
  const errorId = "errorBar";
  return (
    <>
      <div id={errorId}>
        {context.errorMessage && (
          <Alert severity="error">{context.errorMessage}</Alert>
        )}
      </div>
      <div id={loadingId}>
        {context.loadingMessage && (
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <LinearProgress />
            </Grid>
            <Grid
              item
              style={{
                alignContent: "flex-end",
                textAlign: "right",
                paddingRight: "5px",
              }}
            >
              <span>{context.loadingMessage}</span>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}

export default Banner;
