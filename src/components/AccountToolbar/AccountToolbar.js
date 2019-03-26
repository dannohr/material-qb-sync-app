import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../_actions";
import PropTypes from "prop-types";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import QBIcon from "@material-ui/icons/LibraryBooks";
import MoreIcon from "@material-ui/icons/MoreVert";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuLabel: {
    marginLeft: theme.spacing(2)
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  buttonDiv: {
    borderStyle: "solid",
    borderColor: "red",
    color: "#ff0000"
  },
  noMorPDiv: {
    borderStyle: "solid",
    borderColor: "red",
    color: "#ff0000"
  }
});

class AccountToolbar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogout = event => {
    this.handleMenuClose();
    this.props.dispatch(authActions.logout());
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { isAuthenticated, qbConnected } = this.props.childProps;
    const authenticatedButtons = [
      { linkto: "/login", text: "Logout", onClick: this.handleLogout },
      {
        linkto: "/password",
        text: "Change Password",
        onClick: this.handleMenuClose
      }
    ];

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {isAuthenticated ? (
          authenticatedButtons.map((button, index) => (
            <MenuItem key={index} onClick={button.onClick}>
              <Link
                component={RouterLink}
                onClick={button.onClick}
                to={button.linkto}
              >
                {button.text}
              </Link>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={this.handleMenuClose}>
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </MenuItem>
        )}
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
          <span className={classes.menuLabel}>Messages</span>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
          <span className={classes.menuLabel}>Notifications</span>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <AccountCircle />
          <span className={classes.menuLabel}>Profile</span>
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <Link component={RouterLink} to="/login">
            <span className={classes.menuLabel}>Login</span>
          </Link>
        </MenuItem>
      </Menu>
    );

    const renderButtonBadges = isAuthenticated ? (
      <Box>
        {/* <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton> */}

        <IconButton color="inherit" component={RouterLink} to="/qblogin">
          <Badge color={qbConnected ? "secondary" : "error"} variant="dot">
            <QBIcon />
          </Badge>
        </IconButton>
      </Box>
    ) : null;

    return (
      <div className={classes.grow}>
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {renderButtonBadges}
            <IconButton
              edge="end"
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

AccountToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(AccountToolbar);
export default connect()(withStyles(styles)(AccountToolbar));
