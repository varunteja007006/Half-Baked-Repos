import { useEffect, useRef, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import emailjs from '@emailjs/browser'
import './index.scss'
import { Col, Row } from 'react-bootstrap'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const contactArray = ['C', 'o', 'n', 't', 'a', 'c', 't']
  const refForm = useRef()

  useEffect(() => {
    setTimeout(() => {
      return setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'xxxxxxxxxxxxxxxxxxx',
        'xxxxxxxxxxxxxxxxx',
        refForm.current,
        'xxxxxxxxxxxxx'
      )
      .then(
        () => {
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }

  return (
    <>
      <div className="container">
        <Row>
          <Col>
            {' '}
            <div className="contact-page">
              <h1>
                <AnimatedLetters
                  letterClass={letterClass}
                  strArray={contactArray}
                  idx={1}
                ></AnimatedLetters>
                <span>&nbsp;</span>
                <span className={`${letterClass} _8`}>M</span>
                <span className={`${letterClass} _9`}>e</span>
              </h1>
              <form ref={refForm} onSubmit={sendEmail} className="contact-form p-2">
                <ul>
                  <div className="f-row">
                    <li className="half">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                      />
                    </li>
                    <li className="half">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                      />
                    </li>
                  </div>
                  <div className="s-row">
                    <li>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                      />
                    </li>
                    <li>
                      <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="5"
                        placeholder="Message"
                        required
                      ></textarea>
                    </li>
                    <div className="center">
                      <li className="btn-shadow">
                        <input
                          type="submit"
                          className="submit-button"
                          value="Send"
                        />
                      </li>
                    </div>
                  </div>
                </ul>
              </form>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </div>
      <Loader type="line-scale-random" />
    </>
  )
}

export default Contact
