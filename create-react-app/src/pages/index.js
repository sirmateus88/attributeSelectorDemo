import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import States from './states'
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    //textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
    display: 'flex',
    flexDirection: 'column',
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
  // searchBubbles: {
  //   width: 800
  // }
});

class Index extends React.Component {
  state = {
    searchText: '',
    available: [],
    selected: []
  };

  componentDidMount = () => {
    this.setState({available: States})
  }

  handleSearch = name => (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  handleClick = (event) => {
    let clickedName = event.target.innerText;
    let selected = this.state.available.find(attribute => attribute === clickedName)
    let newAvailable = this.state.available.filter(attribute => attribute !== clickedName)
    let newSelected = this.state.selected.slice();
    newSelected.push(selected);
    this.setState({
      available: newAvailable,
      selected: newSelected,
      searchText: ''
    })
  };

  handleDelete = (idx) => {
    let removed = this.state.selected[idx]
    let newSelected = this.state.selected.filter(attribute => attribute !== removed)
    let newAvailable = this.state.available.slice();
    newAvailable.push(removed);
    newAvailable.sort();

    this.setState({
      available: newAvailable,
      selected: newSelected
    })
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state; 

    let selected = this.state.selected.slice()
    let available = this.state.available.slice()
    let searched = new RegExp(this.state.searchText, 'i');
    
    let selectFrom = this.state.searchText.length ? 
    available.filter(attribute => attribute.match(searched)) :
    available;

    return (
      <div className={classes.root}>
        <div className='promptSelection'>
          <div className='selectedItems'>
            <TextField
              id="searchField"
              label="State"
              className={classes.textField}
              value={this.state.searchText}
              onChange={this.handleSearch('State')}
              margin="normal"
            />
            <div className={classes.searchBubbles}>
              {selected.map((usState, idx) => (
                <Chip
                  label={usState}
                  onDelete={() => this.handleDelete(idx)}
                  className={classes.selectedChip}
                />)
                )
              }
            </div>

          </div>
          <div className={classes.searchBubbles}>
            {selectFrom.map(usState => (
              <Chip
                label={usState}
                onClick={this.handleClick}
                className={classes.chip}
              />)
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
