import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});

export default class SnackbarSupplier extends React.Component {
  state = {
    open: true,
    message: ''
  };

  static propTypes = {
    options: PropTypes.object,
  };

  getChildContext() {
    return {
      snackbar: {
        message: this.showMessage
      }
    }
  }

  showMessage = (message, action, handleAction) => {
    this.setState({ open: true, message, action, handleAction })
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const {
      children,
      classes,
      className,
      message,
      variant,
      ...other
    } = this.props;

    const { open } = this.state;

    const variantIcon = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon,
      info: InfoIcon
    };
    const Icon = variantIcon[variant];

    return (
      <Fragment>
        {children}

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="message-snackbar"
            message={
              <span id="message-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                {message}
            </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.icon}/>
              </IconButton>
            ]}
            {...other}
          />
        </Snackbar>
      </Fragment>
    )
  }
}

export default withStyles(styles)(SnackbarSupplier);
