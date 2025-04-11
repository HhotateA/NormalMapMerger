import './App.css'
import NormalMapMerger from './components/NormalMapMerger'
import LicenseNotice from "./components/LicenseNotice";
import ToolDescription from './components/ToolDescription'

function App() {
  return (
    <div> 
      <NormalMapMerger/>
      <LicenseNotice />
      <ToolDescription/>
    </div>
  )
}

export default App
