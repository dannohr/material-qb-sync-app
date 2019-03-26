import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import PersonIcon from "@material-ui/icons/Person";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";

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

function CustomerMenuList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List component="nav" className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText inset primary="Customers" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link component={RouterLink} to="/customer">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadlineIcon />
              </ListItemIcon>
              <ListItemText inset primary="View All" />
            </ListItem>
          </Link>

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

export default CustomerMenuList;
