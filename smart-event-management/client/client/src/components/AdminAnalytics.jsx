import { useEffect, useMemo, useState } from "react";
import { Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../api";

function monthLabel(y, m) {
  const date = new Date(y, m - 1, 1);
  return date.toLocaleString(undefined, { month: "short", year: "numeric" });
}

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  }, []);

  useEffect(() => {
    if (user?.role !== "admin") {
      setErr("Forbidden: admin only");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await api.get("/admin/analytics/overview");
        setData(data);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return <div className="container py-5 text-center"><Spinner animation="border" /></div>;
  }
  if (err) {
    return <div className="container py-5"><Alert variant="danger">{err}</Alert></div>;
  }

  const monthlyCategories = (data.byMonth || []).map(x => monthLabel(x.year, x.month));
  const monthlySeats = (data.byMonth || []).map(x => x.seats);

  const typeSeries = (data.byType || []).map(x => ({ name: x.type, y: x.bookedSeats || 0 }));
  const cityCategories = (data.byCity || []).map(x => x.city);
  const citySeats = (data.byCity || []).map(x => x.bookedSeats);

  const lineOptions = {
    title: { text: "Seats Booked per Month" },
    xAxis: { categories: monthlyCategories },
    yAxis: { title: { text: "Seats" } },
    series: [{ name: "Seats", data: monthlySeats, type: "line" }],
    credits: { enabled: false }
  };

  const pieOptions = {
    title: { text: "Participation by Event Type" },
    series: [{
      type: "pie",
      name: "Booked Seats",
      data: typeSeries
    }],
    credits: { enabled: false }
  };

  const barOptions = {
    chart: { type: "bar" },
    title: { text: "Top Cities by Booked Seats" },
    xAxis: { categories: cityCategories, title: { text: null } },
    yAxis: { min: 0, title: { text: "Seats" } },
    series: [{ name: "Booked Seats", data: citySeats }],
    credits: { enabled: false }
  };

  return (
    <div className="container my-4">
      <Row className="g-3 mb-3">
        <Col sm={6} md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-muted">Users</div>
              <div className="h4 mb-0">{data.totals?.totalUsers ?? 0}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-muted">Events</div>
              <div className="h4 mb-0">{data.totals?.totalEvents ?? 0}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-muted">Bookings</div>
              <div className="h4 mb-0">{data.totals?.totalBookings ?? 0}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-muted">Seats Booked</div>
              <div className="h4 mb-0">{data.totals?.seatsBooked ?? 0}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <HighchartsReact highcharts={Highcharts} options={lineOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <HighchartsReact highcharts={Highcharts} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
