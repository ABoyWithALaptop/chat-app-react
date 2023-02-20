import "./App.css";
import { Route, Routes, BrowserRouter as Switch } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPanel } from "./components/conversation/ConversationPanel";
import { ProtectedRoute } from "./components/ProtectedAuth";
import { PropsWithChildren } from "react";
// import { ConversationContext } from "./utils/context/ConversationContext";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { Socket } from "socket.io-client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

type Props = {
  socket: Socket;
};

function App() {
  return (
    <AppWithProvider socket={socket}>
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
    </AppWithProvider>
  );
}

function AppWithProvider({ children, socket }: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </ReduxProvider>
  );
}

export default App;
