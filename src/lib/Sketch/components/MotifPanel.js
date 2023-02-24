import React, { useContext, useEffect, useState } from "react";
import "./MotifPanel.css";
import { AppContext } from "../contexts/GlobalContext";
import SketchPanel from "./SketchPanel";
import SearchIcon from "@mui/icons-material/Search";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Button from "@mui/material/Button";
import { FormControl, TextField, ThemeProvider } from "@mui/material";
import _ from "lodash";
import InfoButton from "./InfoButton";
import { getCypherQuery } from "../services/data";
import { Color } from "../utils/rendering";
import Tooltip from "@mui/material/Tooltip";

function MotifPanel(props) {
  const { isQuerying, processRequest, attrs } = props;
  const [number, setNumber] = useState(1);
  const [enableAbsMotifCountInfo, setEnableAbsMotifCountInfo] = useState(false);
  const [countButtonColor, setCountButtonColor] = useState("neutral");
  const [cypherLoading, setCypherLoading] = useState(false);

  const motifPanelId = "motif-panel-div";
  const context = useContext(AppContext);

  const handleSubmit = () => {
    console.log("handle submit clicked");
    return fetchMotifs();
  };

  const fetchMotifs = async () => {
    console.log("Fetch Motifs");
    context.setErrorMessage(null);
    setCypherLoading(true);
    try {
      // const query = await getCypherQuery(vimo_server, data_server, data_version, token, context.motifQuery, number)
      // setCypherQuery(query);
      processRequest(context.motifQuery, number);
    } catch (e) {
      console.log(e);
      context.setErrorMessage(e.message);
    } finally {
      setCypherLoading(false);
    }
  };

  const getMotifCountAsString = () => {
    if (context.absMotifCount) {
      return context.absMotifCount.toLocaleString();
    } else {
      return "N/A";
    }
  };

  const parseButtonTooltip = () => {
    let exp = "";
    if (countButtonColor === "neutral") {
      exp = "Expressed as in random network";
    } else if (countButtonColor === "weak") {
      exp = "Under expressed";
    } else if (countButtonColor === "strong") {
      exp = "Over expressed";
    } else if (countButtonColor === "stronger") {
      exp = "Strongly over expressed";
    } else if (countButtonColor === "weaker") {
      exp = "Strongly under expressed";
    }
    return `${exp} in hemibrain`;
  };

  useEffect(() => {
    let relCount = context.relativeMotifCount;
    if (relCount >= 2.0) {
      setCountButtonColor("stronger");
    } else if (relCount > 0.5 && relCount < 2.0) {
      setCountButtonColor("strong");
    } else if (relCount >= -0.5 && relCount <= 0.5) {
      setCountButtonColor("neutral");
    } else if (relCount < -0.5 && relCount > -2.0) {
      setCountButtonColor("weak");
    } else if (relCount <= -2.0) {
      setCountButtonColor("weaker");
    } else {
      setCountButtonColor("neutral");
    }
  }, [context.relativeMotifCount]);

  // catch change in context absmotifcount
  useEffect(() => {
    if (context.absMotifCount == null || context.absMotifCount <= 0) {
      setEnableAbsMotifCountInfo(false);
    } else {
      setEnableAbsMotifCountInfo(true);
    }
  }, [context.absMotifCount]);

  return (
    <div id={motifPanelId}>
      {/*<div className={classes["motif-panel-div"]}>*/}
      {/*<div>*/}
      {/*<Alert severity="error" sx={{position:'absolute'}}>*/}
      {/*    This is an error alert — <strong>check it out!</strong>*/}
      {/*</Alert>*/}
      <div className="form">
        <div className="handle">
          {/*<DragHandleIcon />*/}
          <ThemeProvider theme={Color.theme}>
            <Tooltip title={parseButtonTooltip()} arrow placement="right">
              <span>
                <InfoButton
                  text={getMotifCountAsString()}
                  disabled={!enableAbsMotifCountInfo}
                  color={countButtonColor}
                  icon={<SearchIcon />}
                />
              </span>
            </Tooltip>
          </ThemeProvider>
          {context.showWarning ? (
            <InfoButton color="error" icon={<PriorityHighIcon />} />
          ) : null}
        </div>
        <div id="motif-panel-wrapper">
          <SketchPanel {...props} />
          <div className="sketch-panel-options-style">
            <FormControl sx={{ m: 1, maxWidth: 80 }}>
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                margin="normal"
                style={{ marginTop: 0, marginLeft: "8px" }}
                defaultValue={1}
                onChange={(event) => setNumber(_.toNumber(event.target.value))}
              />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <Button
                size="medium"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSubmit}
                disabled={cypherLoading || isQuerying}
              >
                Search
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MotifPanel;
