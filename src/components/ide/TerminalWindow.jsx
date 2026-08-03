import IdeWindow from './IdeWindow'
import Terminal from './Terminal'

export default function TerminalWindow() {
  return (
    <IdeWindow id="terminal" title="dev@terminal" path="~/dev/terminal">
      <Terminal />
    </IdeWindow>
  )
}
