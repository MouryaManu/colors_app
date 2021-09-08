import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            open: true,
            newPaletteName:''
        }
        this.handleClickOpen= this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handlePaletteName=this.handlePaletteName.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase() 
            );
          });
    };


     handleClickOpen = () => {
        this.setState({
            open:true
        })
      };
    
     handleClose = () => {
        this.setState({
            open:false
        })
      };

      handlePaletteName=(evt) => {
        this.setState({
            newPaletteName: evt.target.value
        })
    }
     

      
    render() {
        const {open,newPaletteName}= this.state;
        
        return ( 
      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={()=>this.props.handleSubmit(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new Palette, make sure that the name is Unique!.
          </DialogContentText>
          
            <TextValidator
            name='newPaletteName'
            label='New Palette Name'
            value={this.state.newPaletteName}
            onChange={this.handlePaletteName}
            validators={['required','isPaletteNameUnique']}
            errorMessages={['Enter Palette Name','Palette Name already exists!']}
            fullWidth 
            margin='normal' />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button variant='contained' color='primary' type='submit' >Save Palette</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
  );
    }
}

export default PaletteMetaForm;