import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Button from './components/Button';
import Footer from './components/Footer';
import Register from './Register';

// Custom Input Component
const Input = ({ type, placeholder, value, onChange }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterView, setShowRegisterView] = useState(false);  // Nuevo estado para controlar la visualización del registro

  const handleLogin = async (event) => {
    // ... tu función de inicio de sesión existente ...
  };

  // Alternar entre la vista de inicio de sesión y registro
  const toggleView = () => {
    setShowRegisterView(!showRegisterView);
  };

  return (
    <div>
      <Header title={showRegisterView ? "Registro" : "Iniciar Sesión"} />
      <div className='container' id='container'>
        {showRegisterView ? (
          // Vista de registro
          <Register />
        ) : (
          // Vista de inicio de sesión
          <div className='form-container sign-in'>
            <form onSubmit={handleLogin}>
              <span>Usa tu correo electrónico y contraseña para iniciar sesión</span>
              <Input type="email" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} />
              <Input type="password" placeholder="Ingresa tu contraseña" value={password} onChange={e => setPassword(e.target.value)} />
              <Button type="submit">Iniciar Sesión</Button>
            </form>
           {/* Usa la clase boton-registrarse en este botón */}
           <button onClick={toggleView} className="boton-registrarse">Registrarse</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}


export default App;


