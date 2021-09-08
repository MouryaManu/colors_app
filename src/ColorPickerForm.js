import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles={
    picker: {
        width: "100%",
        marginTop: '2rem'
    },
    addColor: {
        width: "100%",
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '1rem'
    },
    colorInput: {
        width: "100%",
        height: '70px',
    }

}

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state={
           currColor: 'teal',
           newColorName: ''
        }
        this.updateCurrentColor=this.updateCurrentColor.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    updateCurrentColor=(newColor) =>{
        this.setState({
            currColor: newColor.hex
        });
    }

    handleSubmit() {
        const newColor= {
            color: this.state.currColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({
            newColorName: ''
        })
    }

    handleChange=(evt) => {
        this.setState({
            newColorName: evt.target.value
        }) 
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            return this.props.colors.every(
                ({color}) => color !== this.state.currColor 
            );
          });
          
          ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase() 
            );
          });

    }

    render() {
        const {isPaletteFull,classes}= this.props;
        const {currColor, newColorName} = this.state;
        return (
            <div>
                 <ChromePicker className={classes.picker} color={this.state.currColor} onChangeComplete={this.updateCurrentColor} />
                    <ValidatorForm onSubmit={this.handleSubmit}>
                      <TextValidator placeholder="Color Name" className={classes.colorInput}
                       value={newColorName} variant='filled'
                        name='newColorName' margin='normal'
                        onChange={this.handleChange}
                        validators={["required","isColorUnique","isColorNameUnique"]}
                        errorMessages={["this field is required", "Color already exists","Color Name already exists"]}
                     />
                     <Button style={{backgroundColor: isPaletteFull? "gray" : currColor}} variant='contained' color='primary' type='submit' disabled={isPaletteFull} className={classes.addColor} >
                           {isPaletteFull? "Palette Full" : "Add Colors" }
                    </Button>
                </ValidatorForm>   
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);