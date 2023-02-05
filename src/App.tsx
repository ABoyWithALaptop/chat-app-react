import "./App.css";
import { Route, Routes, BrowserRouter as Switch } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPanel } from "./components/conversation/ConversationPanel";
import { ProtectedRoute } from "./components/ProtectedAuth";
import { AuthContext } from "./utils/context/AuthContext";
import { PropsWithChildren, useState } from "react";
import { Conversation, User } from "./utils/types/types";
// import { ConversationContext } from "./utils/context/ConversationContext";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { Socket } from "socket.io-client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
};

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AppWithProvider user={user} setUser={setUser} socket={socket}>
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
    // <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
    //   <SocketContext.Provider value={socket}>

    //   </SocketContext.Provider>
    // </AuthContext.Provider>
  );
}

function AppWithProvider({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

export default App;
