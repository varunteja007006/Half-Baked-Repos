import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const aboutArray = ['A', 'b', 'o', 'u', 't']

  useEffect(() => {
    setTimeout(() => {
      return setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className="container">
        <div className="about-page">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={aboutArray}
              idx={1}
            ></AnimatedLetters>
            <span>&nbsp;</span>
            <span className={`${letterClass} _8`}>M</span>
            <span className={`${letterClass} _9`}>e</span>
          </h1>
          <p>&#8211;&#8211;&#8211; Education &#8211;&#8211;&#8211;</p>
          <p>
            Born in Andhra Pradesh, India I finished primary and secondary
            school with admirable scores. Then I moved on to pursue my BTech in
            Computer Science at Vel Tech, Chennai.
          </p>
          <p>&#8211;&#8211;&#8211; Skills &#8211;&#8211;&#8211;</p>
          <p>
            I am a tech-savvy computer science engineer with adaptive and
            problem-solving skills to solve challenges in the workplace.I love
            to explore, research, and learn about new and popular technologies
            to help me and the organization grow.
          </p>
          <p>&#8211;&#8211;&#8211; My Personal Life &#8211;&#8211;&#8211;</p>
          <p>
            I spend my free time reading books, sketching, and cooking. I can
            speak Telugu, English, Hindi, and Tamil.
          </p>
        </div>
      </div>
      <Loader type="line-scale-random" />
    </>
  )
}

export default About
