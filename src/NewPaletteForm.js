import React, { useState } from 'react'
import clsx from 'clsx';
import {withStyles} from "@material-ui/styles";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import DraggableColorBox from './DraggableColorBox';


const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
       height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


export default function NewPaletteForm() {
     
       
   
        const classes = useStyles();
        const theme = useTheme();
        const [open, setOpen] = React.useState(true);
        const [currColor, setCurrColor]= React.useState('black');
        const [colors,setColors]= React.useState(['purple','green','#cde125'])
        
        
        const handleDrawerOpen = () => {
            setOpen(true);
        };
        
        const handleDrawerClose = () => {
            setOpen(false);
        };


        const updateCurrentColor=(newColor) =>{
            setCurrColor(newColor.hex);
        }

        const addNewColor=()=> {
            setColors([...colors,currColor])
        } 

   
       return (
         <div className={classes.root}>
        <CssBaseline />
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
        >
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
        Persistent drawer
        </Typography>
        </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
        <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design your Palette</Typography>
        <div>
        <Button variant='contained' color='secondary' >Random Color</Button>
        <Button variant='contained' color='primary'>Clear Palette</Button>
        </div>
        <ChromePicker color={currColor} onChangeComplete={updateCurrentColor} />
        <Button style={{backgroundColor: currColor}} variant='contained' color='primary' onClick={addNewColor}>Add Color</Button>
        
        </Drawer>
        <main
        className={clsx(classes.content, {
            [classes.contentShift]: open,
        })}
        >
        <div className={classes.drawerHeader} />
         {colors.map(color =>(
             <DraggableColorBox color={color} />
            
         ))}
        </main>
        </div>
        );
}

//export default withStyles(useStyles,{withTheme: true})(NewPaletteForm);