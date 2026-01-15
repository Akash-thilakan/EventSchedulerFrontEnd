import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { deleteEventAPI, getAllEventsAPI } from '../Service/allAPI';
import { toast } from 'react-toastify';

function Home({ IsLoggedIn }) {
  const [allEvents, setAllEvents] = useState([]);
  const [value, onChange] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getAllEvents = async () => {
    const result = await getAllEventsAPI();
    setAllEvents(result.data);
  };

  const deleteEvent = async (id) => {
    const result = await deleteEventAPI(id);
    if (result.status === 200) {
      toast.success("Event deleted successfully");
      getAllEvents();
    } else {
      toast.error("Deletion failed");
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const filteredEvents = value
    ? allEvents.filter(
        (item) => item.date === value.toISOString().split("T")[0]
      )
    : allEvents;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 p-6 md:p-12">
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-[2.5rem] p-8 shadow-sm">
            <Calendar
              onChange={onChange}
              value={value}
              next2Label={null}
              prev2Label={null}
              locale="en-US"
            />
          </div>
        </div>

        <section className="lg:col-span-8">
          <div className="mb-12">
            <h1 className="text-6xl font-black">
              {value ? `${months[value.getMonth()]} ${value.getDate()}` : "All Events"}
            </h1>
            <p className="text-slate-500 mt-4">
              {filteredEvents.length} event(s) scheduled
            </p>
          </div>

          <div className="space-y-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((item) => (
                <div key={item._id} className="bg-white p-8 rounded-3xl shadow-sm">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-slate-500 mt-2">{item.description}</p>
                  <p className="mt-4 font-semibold">
                    {item.startTime} - {item.endTime}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Created by {item.createdBy}
                  </p>
                  {IsLoggedIn && (
                    <div className="mt-4">
                      <Link to={`/edit-event/${item._id}`}>
                        <button className="px-3 py-1 bg-yellow-400 rounded mr-3">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteEvent(item._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-400 font-semibold">
                No events available
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
