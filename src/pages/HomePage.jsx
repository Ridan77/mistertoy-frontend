import imgUrl from '../assets/img/logo.png';

import { useState } from "react"
// const { useState } = React

import { useDispatch, useSelector } from "react-redux"
// const { useSelector, useDispatch } = ReactRedux


export function HomePage() {

    const homeStyle = { textAlign: 'center' }
    return (
        <section style={homeStyle}>
            <h2>
                Welcome!
            </h2 >
            <img src={imgUrl} />
            
            {/* <img src="../assets/img/logo.png" /> */}
            {/* <img src="./img/vite.svg" /> */}
        </section >
    )
}