import React, { createContext, PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import NoSsr from '@material-ui/core/NoSsr';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CloseIcon from '@material-ui/icons/Close';

const { Consumer, Provider } = createContext(undefined);

export const withSnackBar = Component => props => (
  <Consumer>
    {({ showSnackBar }) => (
      <Component {...props} showSnackBar={showSnackBar} />
    )}
  </Consumer>
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

  handleComingMessage = ({ message, variant = 'info' }) =>
    this.setState({
      open: true,
      message,
      variant,
    });

  getChildrenContext = () => ({
    showSnackBar: this.handleComingMessage
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
      <Provider value={this.getChildrenContext()}>
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
                  component="span"
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
      </Provider>
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
