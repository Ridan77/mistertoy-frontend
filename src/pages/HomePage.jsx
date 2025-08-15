import imgUrl from '../assets/img/hero.png';

import { useState } from "react"
// const { useState } = React

import { useDispatch, useSelector } from "react-redux"
// const { useSelector, useDispatch } = ReactRedux


export function HomePage() {

    const homeStyle = { textAlign: 'center' }
    return (
        <section className='home-page' style={homeStyle}>
          
            <img src={imgUrl} />
            {/* <img src="./img/vite.svg" /> */}
        </section >
    )
}