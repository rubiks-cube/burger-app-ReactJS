import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Chicken', type: 'chicken'},
  { label: 'Fish', type: 'fish'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong> ​&#8377;{props.price}</strong></p>
       {controls.map(ctrl => {
           return <BuildControl key={ctrl.label} label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
       })}

       <button className={classes.OrderButton}
       disabled={!props.purchasable}
       onClick={props.ordered}>{props.isAuth?'ORDER NOW!': 'ORDER NOW!'}</button>
    </div>

    );

export default buildControls;