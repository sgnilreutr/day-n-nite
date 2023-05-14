import ModeSwitch from './modeSwitch'

const appStyles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default function App() {
  return (
    <div style={appStyles}>
      <ModeSwitch />
    </div>
  )
}
