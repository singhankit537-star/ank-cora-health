import { Provider } from 'react-redux'
import { store } from '../store'

export default function StoreProvider({ children, store: customStore }) {
  return <Provider store={customStore ?? store}>{children}</Provider>
}
