import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'

export const Home = function() {
  return (
    <div className="Home">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to={'/hooks'}>Hooks</Link>
        <Link to={'/components'}>components</Link>
        <Link to={'/react-api'}>react-api</Link>
        <Link to={'/tools'}>tools</Link>
      </header>
    </div>
  )
}