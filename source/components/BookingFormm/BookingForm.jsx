// components/BookingForm/BookingForm.jsx

import React, { useState } from 'react';
import { submitBooking } from '../../services/firebase';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phoneNumber: '',
    dogName: '',
    dropOffDate: '',
    pickUpDate: '',
    specialNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitBooking(formData);
      // Reset form
      setFormData({
        ownerName: '',
        email: '',
        phoneNumber: '',
        dogName: '',
        dropOffDate: '',
        pickUpDate: '',
        specialNotes: ''
      });
      alert('Booking request submitted successfully!');
    } catch (error) {
      alert('Error submitting booking request: ' + error.message);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Stay</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ownerName">Owner's Name</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dogName">Dog's Name</label>
          <input
            type="text"
            id="dogName"
            name="dogName"
            value={formData.dogName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dropOffDate">Drop-off Date</label>
          <input
            type="datetime-local"
            id="dropOffDate"
            name="dropOffDate"
            value={formData.dropOffDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pickUpDate">Pick-up Date</label>
          <input
            type="datetime-local"
            id="pickUpDate"
            name="pickUpDate"
            value={formData.pickUpDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialNotes">Special Notes</label>
          <textarea
            id="specialNotes"
            name="specialNotes"
            value={formData.specialNotes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Request Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;