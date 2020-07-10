import React from 'react';
import { makeStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Card } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
      position: 'relative',
      alignItems: 'center',
      boxShadow: "none",
      borderRadius: "5px 5px 0 0"
  },
});

export default function Navbar({screenConfig}) {
  const classes = useStyles();
    console.log(screenConfig[0], "screen")
    
  return (
    <BottomNavigation
      value={screenConfig[0]}
      onChange={(event, newValue) => {
        screenConfig[1](newValue);
        // console.log(newValue, "new")
      }}
      showLabels
      className={classes.root}
      component={Card}
    >
      <BottomNavigationAction label="Global" />
      <BottomNavigationAction label="Countries" />
      
    </BottomNavigation>
  );
}