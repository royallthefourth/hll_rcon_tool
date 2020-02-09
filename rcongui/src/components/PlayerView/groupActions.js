import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { PlayerActions } from "./playerActions";
import withWidth from "@material-ui/core/withWidth";
import { Reason } from "./textInputBar";
import Grid from "@material-ui/core/Grid";
import { DialogTitle, DialogContent, DialogActions } from "../dialog";

const GroupActions = ({
  players,
  classes,
  width,
  handleAction,
  onClose,
  open
}) => {
  const [message, setMessage] = React.useState("");
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);

  const nbButton = ["xs"].indexOf(width) != -1 ? 3 : 6;

  console.log("buttons:", width, nbButton, width in ["sm", "xs"]);
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={width}
      maxWidth={width}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Apply same action on all selected players
      </DialogTitle>
      <DialogContent dividers>
        <Autocomplete
          autoFocus
          className={classes.marginBottom}
          multiple
          id="tags-outlined"
          options={_.sortBy(players, p => p.name.toLowerCase())}
          getOptionLabel={option => option.name}
          filterSelectedOptions
          onChange={(e, val) => setSelectedPlayers(val)}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Select players"
              fullWidth
            />
          )}
        />
        <Grid container>
          <Grid item xs={12} xl={12} className={classes.marginBottom}>
            <Reason
              handleMessageChange={setMessage}
              helperText={"A message is mandatory"}
            />
          </Grid>
          <Grid item xs={12} xl={12} className={classes.marginTop}>
            <PlayerActions
              handleAction={actionType =>
                selectedPlayers.map(p =>
                  handleAction(actionType, p.name, message)
                )
              }
              disable={message === ""}
              displayCount={nbButton}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withWidth()(GroupActions);
