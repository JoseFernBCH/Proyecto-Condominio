import React, { useState } from 'react';

function BookingPage() {
  const [date, setDate] = useState('');
  const [space, setSpace] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Reserva confirmada para ${space} en la fecha ${date}`);
  };

  return (
    <div>
      <h2>Reserve a Space</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Space:
          <select
            value={space}
            onChange={(e) => setSpace(e.target.value)}
          >
            <option value="">Select a space</option>
            <option value="Gym">Gym</option>
            <option value="Pool">Pool</option>
            <option value="Event Hall">Event Hall</option>
          </select>
        </label>
        <br />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingPage;
