import { useEffect, useState } from "react";
import { Modal, Button, Form, ToggleButtonGroup, ToggleButton, Badge } from "react-bootstrap";
import api from "../api";

const INTEREST_OPTIONS = ["Workshop", "Seminar", "Hackathon", "Cultural"];

export default function RegisterModal({ open, onClose, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (!open) {
      setName(""); setEmail(""); setPassword(""); setInterests([]);
    }
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", {
        name, email, password, interests
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onRegister?.(data.user);
      onClose();
    } catch (err) {
      alert(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    <Modal show={open} onHide={onClose} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>Create account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={name} onChange={(e)=>setName(e.target.value)} required placeholder="John Doe" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="john@mail.com" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="••••••••" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Interests</Form.Label>
            <div className="mb-2">
              <ToggleButtonGroup
                type="checkbox"
                value={interests}
                onChange={setInterests}
                className="d-flex flex-wrap gap-2"
              >
                {INTEREST_OPTIONS.map((opt) => (
                  <ToggleButton
                    key={opt}
                    id={`interest-${opt}`}
                    value={opt}
                    variant={interests.includes(opt) ? "primary" : "outline-primary"}
                  >
                    {opt}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
            {interests.length > 0 && (
              <div className="d-flex flex-wrap gap-2">
                {interests.map((i) => (
                  <Badge key={i} bg="info">{i}</Badge>
                ))}
              </div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="success" type="submit">Register</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
