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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 400;
const styles= theme=> ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBtns: {
        marginRight: '1rem',
    },
    button: {
        margin: '0 0.5rem',
    },
    link : {
        textDecoration: 'none'
    }
    
})

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