import React, { createContext, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  NoSsr,
  Snackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { green, amber } from '@material-ui/core/colors';



const styles = ({ spacing, palette }) => ({
  close: {
    width: spacing(4),
    height: spacing(4),
    padding: 0,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: palette.error.dark,
  },
  info: {
    backgroundColor: palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});

const SnackBarContext = createContext();

export const withSnackBar = Component => props => (
  <SnackBarContext.Consumer>
    {({ message }) => {
      return <Component {...props} message={message} />
    }}
  </SnackBarContext.Consumer>
);

class SnackBarSupplier extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    settings: PropTypes.object,
    classes: PropTypes.object.isRequired,
    anchorOriginVertical: PropTypes.oneOf(['top', 'bottom']),
    anchorOriginHorizontal: PropTypes.oneOf(['left', 'center', 'right']),
  };

  static defaultProps = {
    settings: {},
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'left',
  };

  state = {
    open: false,
    message: '',
    variant: ''
  };

  handleComingMessage = (message, variant = 'info') =>
    this.setState({
      open: true,
      message,
      variant,
    });

  getChildrenContext = () => ({
    message: this.handleComingMessage
  });

  handleClose = () => this.setState({open: false});

  render() {
    const {
      open,
      message,
      variant
    } = this.state;
    const {
      classes,
      settings,
      children,
      anchorOriginVertical,
      anchorOriginHorizontal,
    } = this.props;

    return (
      <SnackBarContext.Provider value={this.getChildrenContext()}>
        {children}
        <NoSsr>
          <Snackbar
            anchorOrigin={{
              vertical: anchorOriginVertical,
              horizontal: anchorOriginHorizontal,
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

const styles = ({ spacing, palette }) =>
  createStyles({
    close: {
      width: spacing(4),
      height: spacing(4),
      padding: 0,
    },
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: palette.error.dark,
    },
    info: {
      backgroundColor: palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    }
  });

export default withStyles(styles)(SnackBarSupplier);
