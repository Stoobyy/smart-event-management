// src/components/EventsDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { Card, Button, Modal, Form, Row, Col, Badge } from "react-bootstrap";
import api from "../api";

export default function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [seats, setSeats] = useState(1);

  const user = useMemo(() => {
    const u = localStorage.getItem("user");
    try { return u ? JSON.parse(u) : null; } catch { return null; }
  }, []);

  // fetch events
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/events");
        setEvents(data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const { recommended, others } = useMemo(() => {
    if (!user?.role) return { recommended: [], others: events };
    const interests = (user?.interests || []).map((s) => s.toLowerCase());
    if (!interests.length) return { recommended: [], others: events };

    const rec = [];
    const non = [];
    for (const ev of events) {
      const typeMatch = ev?.type && interests.includes(String(ev.type).toLowerCase());
      const tagMatch =
        Array.isArray(ev?.tags) &&
        ev.tags.some((t) => interests.includes(String(t).toLowerCase()));
      if (typeMatch || tagMatch) rec.push(ev);
      else non.push(ev);
    }
    return { recommended: rec, others: non };
  }, [events, user]);

  const openModal = (ev) => {
    setSelected(ev);
    setSeats(1);
  };

  const bookSeats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first");
      const { data } = await api.post(`/events/book/${selected._id}`, { seats });
      alert("✅ " + data.message);
      setSelected(null);
      const refreshed = await api.get("/events");
      setEvents(refreshed.data || []);
    } catch (err) {
      alert(err?.response?.data?.message || "Booking failed");
    }
  };

  const EventsGrid = ({ list, showBadge = false }) => (
    <Row xs={1} sm={2} md={3} className="g-4">
      {list.map((ev) => {
        const available = ev.totalSeats - ev.bookedSeats;
        return (
          <Col key={ev._id}>
            <Card className="h-100 shadow-sm">
              <div style={{ position: "relative" }}>
                <Card.Img
                  variant="top"
                  src={ev.imageUrl}
                  alt={ev.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                {showBadge && (
                  <Badge bg="warning" text="dark" style={{ position: "absolute", top: 10, left: 10 }}>
                    Recommended
                  </Badge>
                )}
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{ev.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ev.type}</Card.Subtitle>
                <Card.Text className="flex-grow-1">
                  {ev.description?.slice(0, 110)}...
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-secondary">Seats left: {available}</small>
                  <Button
                    variant="primary"
                    onClick={() => openModal(ev)}
                    disabled={available <= 0}
                  >
                    View
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  return (
    <div className="container my-4">
      {/* Recommended section */}
      {user && recommended.length > 0 && (
        <>
          <div className="d-flex align-items-baseline mb-2">
            <h4 className="me-2 mb-0">Recommended for you</h4>
            <small className="text-muted">
              based on your interests{user?.name ? `, ${user.name}` : ""}
            </small>
          </div>
          <EventsGrid list={recommended} showBadge />
          <hr className="my-4" />
        </>
      )}

      {/* All / remaining events */}
      <h4 className="mb-3">All Events</h4>
      <EventsGrid list={others} />

      {/* View/Book Modal */}
      <Modal show={!!selected} onHide={() => setSelected(null)} centered>
        {selected && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selected.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Type:</strong> {selected.type}</p>
              <p><strong>Description:</strong> {selected.description}</p>
              <p><strong>Date:</strong> {new Date(selected.date).toDateString()}</p>
              <p><strong>Venue:</strong> {selected.venue}, {selected.city}</p>
              <p><strong>Available Seats:</strong> {selected.totalSeats - selected.bookedSeats}</p>

              <Form.Group className="mt-3">
                <Form.Label>Seats to Book</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max={Math.max(1, selected.totalSeats - selected.bookedSeats)}
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button
                variant="success"
                onClick={bookSeats}
                disabled={seats < 1 || seats > (selected.totalSeats - selected.bookedSeats)}
              >
                Book
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
