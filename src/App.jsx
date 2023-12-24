import { Quiz, Home, Login, Result, Signup } from "./js/index";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateComponet from "./components/PrivateComponent";
import PublicRoute from "./components/pages/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/quiz/:id"
              element={
                <PrivateComponet>
                  <Quiz />
                </PrivateComponet>
              }
            />
            <Route
              path="/result/:id"
              element={
                <PrivateComponet>
                  <Result />
                </PrivateComponet>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
