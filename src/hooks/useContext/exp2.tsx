import { useState, useContext } from 'react'
import { ThemeContext, CountContext } from './ThemeContext'
import './index.scss'

interface ProviderProps {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}

// 将 provider 抽离成单独的组件
const MyProviders = ({ children, theme, count, setCount }: any) => {
  return (
    <ThemeContext.Provider value={theme}>
      <CountContext.Provider
        value={{ count, setCount }}
      >
        {children}
      </CountContext.Provider>
    </ThemeContext.Provider>
  )
}

export default function MyApp() {
  const [theme, setTheme] = useState('light')
  const [count, setCount] = useState(0)

  return (
    <MyProviders theme={theme} count={count} setCount={setCount}>
      <div>count: {count}</div>
      <Form />

      <label>
        <input
          type='checkbox'
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </MyProviders>
  )
}

function Form(props: any) {
  const Count = useContext(CountContext) as ProviderProps
  let count = Count.count
  const handleAdd = () => {
    console.log('>>>add')
    Count.setCount(++count)
  }
  return (
    <Panel title='Welcome'>
      <Button onClick={handleAdd}>add</Button>
      <Button onClick={() => Count.setCount(--count)}>reduce</Button>
    </Panel>
  )
}

function Panel({ title, children }: { title: string; children?: any }) {
  const theme = useContext(ThemeContext)
  const className = 'panel-' + theme
  return (
    <section className={`${className} panel`}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }: { children?: any; onClick?: any }) {
  const theme = useContext(ThemeContext)
  const className = 'button-' + theme
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
