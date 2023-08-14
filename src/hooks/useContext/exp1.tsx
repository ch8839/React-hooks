import { useState, useContext } from "react"
import { ThemeContext, CountContext } from './ThemeContext'
import './index.scss'

interface ProviderProps {
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>
}

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  return (
    <ThemeContext.Provider value={theme}>
      <CountContext.Provider value={{count, setCount}}>
        <div>count: {count}</div>
        <Form />
      </CountContext.Provider>

      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </ThemeContext.Provider>
  )
}

function Form(props: any ) {
  console.log('===Form render===')
  const Count = useContext(CountContext) as ProviderProps;
  let count = Count.count
  const handleAdd = ()=> {
    console.log('>>>add')
    Count.setCount(++count)
  }
  return (
    <Panel title="Welcome">
      <Button onClick={handleAdd}>add</Button>
      <Button onClick={() => Count.setCount(--count)}>reduce</Button>
    </Panel>
  );
}

function Panel({ title, children } : {title: string, children?: any}) {
  console.log('===Panel render===')
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={`${className} panel`}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }: { children?: any, onClick?: any }) {
  console.log('===Button render===')
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}