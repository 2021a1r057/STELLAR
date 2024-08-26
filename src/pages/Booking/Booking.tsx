import React, { useState } from 'react';
import { Alert, Button, Form, Container, Row, Col, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Booking.css';

// Define available slots and types for the therapy sessions
interface AvailableSlots {
  [key: string]: string[];
}

const availableSlots: AvailableSlots = {
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

interface FormData {
  name: string;
  email: string;
  sessionType: string;
  date: Date | null;
  time: string;
}

function Booking() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    sessionType: '',
    date: null,
    time: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: e.target.value,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: e.target.value,
    }));
  };

  const handleSessionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sessionType: e.target.value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date,
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      time: e.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let errors: { [key: string]: string } = {};
    const { name, email, sessionType, date, time } = formData;

    if (!name) errors.name = 'Name is required.';
    if (!email) errors.email = 'Email is required.';
    if (!sessionType) errors.sessionType = 'Session type is required.';
    if (!date) errors.date = 'Date is required.';
    if (!time) errors.time = 'Time is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Simulate a successful booking process
    setShowAlert(true);
    setFormErrors({});
    
    // Reset form data
    setFormData({
      name: '',
      email: '',
      sessionType: '',
      date: null,
      time: '',
    });
  };

  const getAvailableTimes = () => {
    if (!formData.date) return [];
    const day = formData.date.toLocaleDateString('en-US', { weekday: 'long' }) as keyof AvailableSlots;
    return availableSlots[day] || [];
  };

  const getSessionCost = (type: string) => {
    const session = therapyTypes.find((session) => session.value === type);
    return session ? session.cost : 0;
  };

  const getTotalCost = () => {
    return getSessionCost(formData.sessionType);
  };

  return (
    <Container className="booking-container mt-5">
      <h1 className="text-center mb-4">Book a Therapy Session</h1>
      <Row>
        {/* Booking Form Section */}
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
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    isInvalid={!!formErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    isInvalid={!!formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Session Type</Form.Label>
                  <Form.Select
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleSessionTypeChange}
                    isInvalid={!!formErrors.sessionType}
                  >
                    <option value="">Select a session type</option>
                    {therapyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.sessionType}
                  </Form.Control.Feedback>
                  {formData.sessionType && (
                    <Form.Text className="text-muted">
                      Cost: ₹{getSessionCost(formData.sessionType)}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Choose Date</Form.Label>
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    className="form-control"
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    required
                  />
                  {formErrors.date && (
                    <Form.Text className="text-danger">{formErrors.date}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Time</Form.Label>
                  <Form.Select
                    name="time"
                    value={formData.time}
                    onChange={handleTimeChange}
                    isInvalid={!!formErrors.time}
                  >
                    <option value="">Select a time slot</option>
                    {getAvailableTimes().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.time}
                  </Form.Control.Feedback>
                  {formData.time && (
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

        {/* Available Sessions and Therapy Details */}
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
              <Card.Title className="text-center">Therapy Types and Costs</Card.Title>
              <ul className="list-group">
                {therapyTypes.map((type) => (
                  <li key={type.value} className="list-group-item">
                    <strong>{type.label}:</strong> ₹{type.cost}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Alert for successful submission */}
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Your booking has been confirmed!
        </Alert>
      )}
    </Container>
  );
}

export default Booking;
