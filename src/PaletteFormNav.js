import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state={
          open: true,
          newPaletteName: '',
          colors: []
        };
        this.handlePaletteName=this.handlePaletteName.bind(this);

    }
   

    handlePaletteName=(evt) => {
        this.setState({
            newPaletteName: evt.target.value
        })
    }


    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase() 
            );
          });
    };
    render() {
        const {classes,open} = this.props;
        const {newPaletteName}= this.state;
        return (
       <div className={classes.root}>
        <CssBaseline />
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        color='default'
        >
        <Toolbar>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.props.handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
        >
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
        Persistent drawer
        </Typography>
        <ValidatorForm onSubmit={()=>this.props.handleSubmit(newPaletteName)}>
            <TextValidator
            name='newPaletteName'
            label='New Palette Name'
            value={this.state.newPaletteName}
            onChange={this.handlePaletteName}
            validators={['required','isPaletteNameUnique']}
            errorMessages={['Enter Palette Name','Palette Name already exists!']} />
        <Button variant='contained' color='primary' type='submit' >Save Palette</Button>
        <Link to='/'>
           <Button variant='contained' color='secondary'>Go Back!</Button>
        </Link>
        </ValidatorForm>
        </Toolbar>
        </AppBar>
        </div>
        )
    }
}

export default PaletteFormNav;