import React/*, { useState }*/ from 'react';
/*
const Input = ({ type, placeholder }) => (
    <input type={type} placeholder={placeholder} />
);
*/
const Input = (props) => (
    <input type={props.type} placeholder={props.placeholder} />
);
/*

function Input(props) {
    return <input type={props.type} placeholder={props.placeholder}/>;
}
*/

export default Input;