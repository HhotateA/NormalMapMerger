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
      <footer>
        <p><small>Site create by <a href="https://www.hhotatea.com/">ほたてねこまじん</a></small></p>
        <p><small>サイトの閲覧情報は、サイト管理者に送信される可能性があります。  — プライバシーポリシー <a href="https://www.hhotatea.com/privacypolicy.html">PrivacyPolicy</a></small></p>
      </footer>
    </div>
  )
}

export default App
