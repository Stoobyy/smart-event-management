import { Container } from "react-bootstrap";

export default function SiteFooter() {
  return (
    <footer className="border-top mt-5">
      <Container className="py-3 d-flex justify-content-between">
        <span>© {new Date().getFullYear()} Smart Events</span>
        <a href="/about" className="text-decoration-none">About</a>
      </Container>
    </footer>
  );
}
