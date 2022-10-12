import "./App.css";
import {
  Outlet,
  Route,
  Routes,
  BrowserRouter as Switch,
} from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPanel } from "./components/conversation/ConversationPanel";
import { ProtectedRoute } from "./utils/ProtectedAuth";

function App() {
  return (
    <div className="App">
      <Switch>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/conversations"
            element={
              <ProtectedRoute>
                <ConversationPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ConversationPanel />}></Route>
            <Route path=":id" element={<ConversationChannelPage />}></Route>
          </Route>
        </Routes>
      </Switch>
    </div>
  );
}

export default App;
