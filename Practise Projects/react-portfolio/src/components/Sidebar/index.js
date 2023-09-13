import './index.scss'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faGit,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

import Logos from '../../assets/vibes.jpg'

const Sidebar = () => {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <img src={Logos} alt="Logo" />
      </Link>

      <nav>
        <NavLink exact="true" activeclassname="active" to="/">
          <FontAwesomeIcon icon={faHome} color="#ffffff"></FontAwesomeIcon>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          className="about-link"
          to="/about"
        >
          <FontAwesomeIcon icon={faUser} color="#ffffff"></FontAwesomeIcon>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          className="contact-link"
          to="/contact"
        >
          <FontAwesomeIcon icon={faEnvelope} color="#ffffff"></FontAwesomeIcon>
        </NavLink>
      </nav>
      <ul>
        <li>
          <a target="_blank" rel="noreferrer" href="https://www.fb.com">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://www.github.com">
            <FontAwesomeIcon icon={faGit} />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://www.fb.com">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
