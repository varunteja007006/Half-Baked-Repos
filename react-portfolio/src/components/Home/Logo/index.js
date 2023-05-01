import './index.scss'
import Logos from '../../../assets/vt1.png'

const Logo = () => {

  return (
    <div className="logo-container">
      <img src={Logos} alt="logo" className="solid-logo image" />
      <div class="overlay">
        <div class="text">
          <p>
            A tech-savvy computer science engineer with adaptive and problem-solving skills to solve challenges in the workplace.
            I love to explore, research, and learn about new and popular technologies to help me and the organization grow.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Logo
