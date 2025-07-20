import { useState, useRef } from "react";
import Modal from "./components/Modal";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const focusButton = () => {
    buttonRef.current?.focus();
  };

  return (
    <div className="app">
      <h1>Modal & Button System</h1>
      
      <Button onClick={toggleModal}>Open Modal</Button>
      
      <Button 
        as="a" 
        size="lg" 
        href="#example"
        role="button"
      >
        Go to Example
      </Button>
      
      <Button 
        ref={buttonRef} 
        onClick={focusButton} 
        size="sm"
      >
        Focus Me
      </Button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2>It's a Modal!</h2>
        <p>Press Escape or click outside the modal to close.</p>
        <p>This modal is fully accessible and responsive!</p>
        <Button onClick={toggleModal}>Close Modal</Button>
      </Modal>
    </div>
  );
}

export default App;