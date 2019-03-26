import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import StoreIcon from "@material-ui/icons/Store";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import AddIcon from "@material-ui/icons/Add";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

function VendorMenuList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List component="nav" className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText inset primary="Vendors" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText inset primary="View All" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText inset primary="Create New" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default VendorMenuList;
