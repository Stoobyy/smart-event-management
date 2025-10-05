import { useEffect, useState } from "react";
import { Navbar, Container, Offcanvas, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Topbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowDrawer(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand={false}
        className="navbar"
        style={{
          backgroundColor: "#4F46E5",
        }}
        variant="dark" 
      >

        <Container className="nav-container">
          <Navbar.Brand as={Link} to="/" className="logo">Smart Events</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setShowDrawer(true)}
            style={{ borderColor: "rgba(255,255,255,0.5)" }}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showDrawer}
            onHide={() => setShowDrawer(false)}
            style={{ width: 300 }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" onClick={() => setShowDrawer(false)}>Home</Nav.Link>
                <Nav.Link as={Link} to="/events" onClick={() => setShowDrawer(false)}>Events</Nav.Link>
                <Nav.Link as={Link} to="/dashboard" onClick={() => setShowDrawer(false)}>Dashboard</Nav.Link>

                {user?.role === "admin" && (
                  <Nav.Link as={Link} to="/admin/analytics" onClick={() => setShowDrawer(false)}>
                    Analytics
                  </Nav.Link>
                )}

                <div className="mt-3 d-flex gap-2">
                  {!user ? (
                    <>
                      <Button variant="outline-primary" onClick={() => { setShowRegister(true); setShowDrawer(false); }}>
                        Register
                      </Button>
                      <Button variant="primary" onClick={() => { setShowLogin(true); setShowDrawer(false); }}>
                        Login
                      </Button>
                    </>
                  ) : (
                    <Button variant="danger" onClick={signOut}>Sign out</Button>
                  )}
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Modals */}
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(u) => setUser(u)}
      />
      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onRegister={(u) => setUser(u)}
      />
    </>
  );
}
