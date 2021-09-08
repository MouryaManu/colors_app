import React, { useEffect } from 'react'
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';



const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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


export default function NewPaletteForm(props,{maxColors=20} ) {
        
       
   
        const classes = useStyles();
        const theme = useTheme();
        const [open, setOpen] = React.useState(true);
        const [currColor, setCurrColor]= React.useState('teal');
        const [colors,setColors]= React.useState(props.palettes[0].colors);
        const[newColorName, setnewColorName]= React.useState('')
       // const [newPaletteName, setNewPaletteName]= React.useState('')

        const isPaletteFull= colors.length >= maxColors;
        
        const handleDrawerOpen = () => {
           setOpen(true);
        };
       
        
        const handleDrawerClose = () => {
            setOpen(false);
        };


        // const updateCurrentColor=(newColor) =>{
        //     setCurrColor(newColor.hex);
        // }

        const addNewColor=(newColor)=> {
            setColors([...colors, newColor])
            setnewColorName('');
        } 

        // const handleChange=(evt) => {
        //     setnewColorName(evt.target.value); 
        // }

        const handleSubmit=(newPaletteName)=> {
            const newPalette ={
                paletteName: newPaletteName,
                id: newPaletteName.toLowerCase().replace(/ /g,'-'),
                colors: colors
            }
            props.savePalette(newPalette);
            props.history.push('/');
        }

       

        const deleteColor=(colorName)=> {
            let filteredColors= colors.filter(color => color.name!== colorName);
            
            setColors([...filteredColors]);
        }

        const onSortEnd=({oldIndex, newIndex}) => {
               setColors((colors) => 
                   arrayMove(colors, oldIndex, newIndex)
               )
        }

        const clearColors=() => {
            setColors([]);
        }

        const addRandomColor=() => {
             const allColors= props.palettes.map(p => p.colors).flat();
             var rand= Math.floor(Math.random() * allColors.length);
             const randColor= allColors[rand];
             setColors([...colors, randColor]);
             console.log(isPaletteFull)
        }
        



   
       return (
         <div className={classes.root}>
             <PaletteFormNav open={open}  palettes={props.palettes} handleSubmit={handleSubmit}
             handleDrawerOpen={handleDrawerOpen} />
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
        <Button variant='contained' color='secondary' onClick={addRandomColor} disabled={isPaletteFull} >Random Color</Button>
        <Button variant='contained' color='primary' onClick={clearColors} >Clear Palette</Button>
        </div>


         <ColorPickerForm isPaletteFull={isPaletteFull} 
         addNewColor={addNewColor} colors={colors} />
        </Drawer>
        <main
        className={clsx(classes.content, {
            [classes.contentShift]: open,
        })}
        >
        <div className={classes.drawerHeader} />
        <DraggableColorList colors={colors}
         deleteColor={deleteColor}
         axis='xy'
         onSortEnd={onSortEnd} />
        </main>
        </div>
        );
}