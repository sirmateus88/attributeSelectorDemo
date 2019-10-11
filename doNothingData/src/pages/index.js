import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import States from './states'
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import throttle from '../utilities/throttle';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 20,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  promptSelection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  selectedChip: {
    backgroundColor: '#C83837',
    color: '#ffffff',
    margin: theme.spacing.unit
  }
});

class Index extends React.Component {
  state = {
      currentState: 'nothing',
      showDoNothing: false,
      showDotAI: false
  };

  componentDidMount = () => {
    setTimeout(this.showTitle,7000)
    setTimeout(this.showAI,9000)
  }

  handleSearch = () => {

  }

  showTitle = () => {
    this.setState({showDoNothing: true})
  }

  showAI = () => {
    this.setState({showDotAI: true})
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className='doNothingAI'>
          {this.state.showDoNothing &&
          <text className='theTitle'>
            Do Nothing
          </text>
          }
          {this.state.showDotAI &&
            <text className='theTitle'>
              .ai
            </text>
          }

        </div>

        <div className='typewriter'>
          What do I do about all of my data?
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
