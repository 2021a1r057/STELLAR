import React, { useState } from 'react';
import { Alert, Button, Form, Container, Row, Col, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Booking.css';

const availableSlots = {
  Monday: ['10 AM', '2 PM', '5 PM'],
  Tuesday: ['10 AM', '2 PM', '5 PM'],
  Wednesday: ['10 AM', '2 PM', '5 PM'],
  Thursday: ['10 AM', '2 PM', '5 PM'],
  Friday: ['10 AM', '2 PM', '5 PM'],
  Saturday: ['10 AM', '2 PM', '5 PM'],
};

const therapyTypes = [
  { value: 'solo', label: 'Solo Therapy', cost: 4000 },   
  { value: 'couple', label: 'Couple Therapy', cost: 6400 }, 
  { value: 'group', label: 'Group Therapy', cost: 2400 },   
];

function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sessionType: '',
    date: null,
    time: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: date,
    }));
    setSelectedTime('');
  };

  const handleSessionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedSessionType(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sessionType: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);

    // Auto-reset the form after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
      setFormData({
        name: '',
        email: '',
        sessionType: '',
        date: null,
        time: '',
      });
      setSelectedDate(null);
      setSelectedTime('');
      setSelectedSessionType('');
    }, 2000);
  };

  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    const day = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    return availableSlots[day] || [];
  };

  const getSessionCost = (type: string) => {
    const session = therapyTypes.find((session) => session.value === type);
    return session ? session.cost : 0;
  };

  const getTotalCost = () => {
    return getSessionCost(selectedSessionType);
  };

  return (
    <Container className="booking-container mt-5">
      <h1 className="text-center mb-4">Book a Therapy Session</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="text-center">Booking Form</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Session Type</Form.Label>
                  <Form.Select
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleSessionTypeChange}
                    required
                  >
                    <option value="">Select a session type</option>
                    {therapyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                  {selectedSessionType && (
                    <Form.Text className="text-muted">
                      Cost: ₹{getSessionCost(selectedSessionType)}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Choose Date</Form.Label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="form-control"
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Time</Form.Label>
                  <Form.Select
                    name="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {getAvailableTimes().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                  {selectedTime && (
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip>
                          Available time slots for the selected date.
                        </Tooltip>
                      }
                    >
                      <Button variant="link" className="mt-2">Help</Button>
                    </OverlayTrigger>
                  )}
                </Form.Group>
                <div className="mb-3 text-center">
                  <h5>Total Cost: ₹{getTotalCost()}</h5>
                </div>
                <div className="text-center">
                  <Button variant="primary" type="submit" className="w-100">
                    Book Session
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center">Available Booking Times</Card.Title>
              <ul className="list-group">
                {Object.keys(availableSlots).map((day) => (
                  <li key={day} className="list-group-item">
                    <strong>{day}:</strong> {availableSlots[day].join(', ')}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center">Therapy Sessions We Provide</Card.Title>
              <ul className="list-group">
                {therapyTypes.map((type) => (
                  <li key={type.value} className="list-group-item">
                    <strong>{type.label}:</strong> ₹{type.cost} - {type.value === 'solo' ? 'Personalized sessions focused on your unique needs.' : type.value === 'couple' ? 'Helping couples navigate their relationship challenges.' : 'Sessions that provide peer support and shared experiences.'}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Your session has been booked successfully!
        </Alert>
      )}
      </Row>
    </Container>
  );
}

export default Booking;
