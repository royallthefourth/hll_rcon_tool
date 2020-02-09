import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from '../dialog'
import withWidth from "@material-ui/core/withWidth";
import moment from 'moment'

const Unban = ({ bannedPlayers, classes, width, handleUnban, onReload, onClose, open }) => {
  const [message, setMessage] = React.useState("");
  const [selectedPlayers, setSelectedPlayers] = React.useState([])
 
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={width}
      maxWidth={width}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Unban players
      </DialogTitle>
      <DialogContent dividers>
        {bannedPlayers !== null ? 
        <Autocomplete
          className={classes.marginBottom}
          multiple
          id="tags-outlined"
          options={bannedPlayers}
          getOptionLabel={option => `${option.name} [${option.type}] ${moment.unix(option.timestamp)}`}
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
        /> : 'Unable to show bans. Please retry'}
        <Button autoFocus onClick={onReload} variant="outlined" color="primary">
          RELOAD LIST
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {selectedPlayers.map(p => handleUnban(p)); onClose()}} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withWidth()(Unban);
