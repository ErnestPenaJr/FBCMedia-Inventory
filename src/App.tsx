import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { EquipmentForm } from './components/EquipmentForm';
import { EquipmentList } from './components/EquipmentList';
import { BarcodeScanner } from './components/BarcodeScanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Church Inventory System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Equipment List</Nav.Link>
                <Nav.Link as={Link} to="/add">Add Equipment</Nav.Link>
                <Nav.Link as={Link} to="/scanner">Barcode Scanner</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<EquipmentList />} />
              <Route path="/add" element={<EquipmentForm />} />
              <Route path="/scanner" element={<BarcodeScanner />} />
            </Routes>
          </ErrorBoundary>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;