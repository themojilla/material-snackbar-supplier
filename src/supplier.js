import React from 'react';

import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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

const SnackBarContext = React.createContext();

export const withSnackBar = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <SnackBarContext.Consumer>
          {({message}) => {
            return <Component {...this.props} message={message}/>
          }}
        </SnackBarContext.Consumer>
      )
    }
  }
};

class SnackBarSupplier extends React.Component {
  state = {
    open: false,
    message: '',
    variant: ''
  };

  static propTypes = {
    children: PropTypes.node,
    settings: PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  handleComingMessage = (message, variant = 'info') => {
    this.setState({open: true, message, variant})
  };

  getChildrenContext() {
    return {
      message: this.handleComingMessage
    }
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {
      classes,
      settings
    } = this.props;

    const {open, message, variant} = this.state;

    return (
      <SnackBarContext.Provider value={this.getChildrenContext()}>
        {this.props.children}

        <NoSsr>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={open}
            onClose={this.handleClose}
            {...settings}
          >
            <SnackbarContent
              className={classes[variant]}
              aria-describedby="message-snackbar"
              message={
                <span className={classes.message}>
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
            />
          </Snackbar>
        </NoSsr>
      </SnackBarContext.Provider>
    )
  }
}

export default withStyles(styles)(SnackBarSupplier);
