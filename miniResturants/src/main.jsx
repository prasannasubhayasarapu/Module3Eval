import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowserRouter>
  <AppProvider>
    <App/>
      </AppProvider>   
  </BrowserRouter>
</React.StrictMode>

)