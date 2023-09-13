import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo/index.js'
import './index.scss'
import Loader from 'react-loaders'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = ['V', 'a', 'r', 'u', 'n']
  const roleArray = [
    'F',
    'u',
    'l',
    'l',
    'S',
    't',
    'a',
    'c',
    'k',
    'D',
    'e',
    'v',
    'e',
    'l',
    'o',
    'p',
    'e',
    'r',
  ]

  useEffect(() => {
    setTimeout(() => {
      return setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <span>&nbsp;</span>
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={16}
            ></AnimatedLetters>
          </h1>
          <h2>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={roleArray}
              idx={21}
            ></AnimatedLetters>
          </h2>

          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>

          <Logo />

          {/*<div class="btn from-left">From Left</div>
        <div class="btn from-right">From Right</div>*/}
        </div>
      </div>
      <Loader type="line-scale-random" color="" />
    </>
  )
}

export default Home
