import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            stage: 'form',
            newPaletteName:''
        }
        this.handleClickOpen= this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handlePaletteName=this.handlePaletteName.bind(this);
        this.showEmojiPicker=this.showEmojiPicker.bind(this);
        this.savePalette=this.savePalette.bind(this);
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

    showEmojiPicker() {
        this.setState({
            stage:'emoji'
        })
    }

    savePalette(emoji) {
        const newPalette= {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        };
       this.props.handleSubmit(newPalette);
       this.setState({
        stage:''
    })
    }
     

      
    render() {
        
        return ( 
            <div>
       <Dialog onClose={this.props.hideForm} open={this.state.stage=== 'emoji'}>
       <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
           <Picker title="Pick an Emoji for your Palette" onSelect={this.savePalette} />
       </Dialog>
    
      <Dialog open={this.state.stage=== 'form'} onClose={this.props.hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={this.showEmojiPicker}>
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
          <Button onClick={this.props.hideForm} color="primary">
            Cancel
          </Button>
          <Button variant='contained' color='primary' type='submit' >Save Palette</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
      </div>
  );
    }
}

export default PaletteMetaForm;