import "./App.css";
import { Route, Routes, BrowserRouter as Switch } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPanel } from "./components/conversation/ConversationPanel";
import { ProtectedRoute } from "./components/ProtectedAuth";
import { AuthContext } from "./utils/context/AuthContext";
import { useState } from "react";
import { User } from "./utils/types/types";

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
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
    </AuthContext.Provider>
  );
}

export default App;
