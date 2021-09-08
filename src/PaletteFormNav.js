import React, { Component } from 'react'
import PaletteMetaForm from './PaletteMetaForm';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';

import styles from './styles/PaletteFormNavStyles';



class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state={
          open: true,
          formShowing: false
        }; 
     this.showForm=this.showForm.bind(this);
     this.hideForm=this.hideForm.bind(this);
    }

    showForm() {
        this.setState ({
             formShowing: true
        })
    }

    hideForm() {
        this.setState({
            formShowing: false
        })
    }
   

    
    render() {
        const {classes,open} = this.props;
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
        Create A Palette
        </Typography>
        </Toolbar>
        <div className="navBtns">
        <Link className={classes.link} to='/'>
           <Button className={classes.button} variant='contained' color='secondary'>Go Back!</Button>
        </Link>
        <Button className={classes.button} variant="contained" color="primary" onClick={this.showForm}>
          Save
        </Button>
        </div>
        </AppBar>

       {this.state.formShowing && (
       <PaletteMetaForm palettes={this.props.palettes} handleSubmit={this.props.handleSubmit} hideForm={this.hideForm} />
       )}
        </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);