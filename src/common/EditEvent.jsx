import React, { useEffect, useState } from "react";
import { editEventAPI, getEventAPI } from "../Service/allAPI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const cancel = () => {
    setEventData({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
    });
  };

  const navigate=useNavigate()
  const editEvent = async (id) => {
    if (sessionStorage.getItem("admin")) {
      const result = await editEventAPI(id,eventData);
      if (result.status === 200) {
        alert("Event edited successfully");
        setEventData({
          title: "",
          description: "",
          date: "",
          startTime: "",
          endTime: "",
        });
        navigate("/")
      } else if (result.status === 409) {
        alert("An event already exists in this slot");
      } else {
        alert("couldnt Edit event");
      }
    } else {
      toast.error("Only Admin can Edit an event");
    }
  };

  const { id } = useParams();

  useEffect(() => {
    const getEvent = async () => {
      const result = await getEventAPI(id);
      setEventData(result.data)
    };
    getEvent();
  }, [id]);
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 text-indigo-600 font-bold text-sm tracking-widest uppercase mb-2">
            <span className="w-8 h-[2px] bg-indigo-600"></span>
            Admin
          </div>
          <h1 className="text-6xl font-black tracking-tighter">
            Edit Event<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-slate-500 font-medium mt-4 text-lg">
            Create a new event by providing the details below.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
          <form className="space-y-10">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
                Event Title
              </label>
              <input
                value={eventData.title}
                onChange={(e) =>
                  setEventData({ ...eventData, title: e.target.value })
                }
                type="text"
                placeholder="Enter event title"
                className="w-full text-lg px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
                Description
              </label>
              <textarea
                value={eventData.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
                rows="4"
                placeholder="Describe the event"
                className="w-full text-lg px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
                  Date
                </label>
                <input
                  value={eventData.date}
                  onChange={(e) =>
                    setEventData({ ...eventData, date: e.target.value })
                  }
                  type="date"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
                  Start Time
                </label>
                <input
                  value={eventData.startTime}
                  onChange={(e) =>
                    setEventData({ ...eventData, startTime: e.target.value })
                  }
                  type="time"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
                  End Time
                </label>
                <input
                  value={eventData.endTime}
                  onChange={(e) =>
                    setEventData({ ...eventData, endTime: e.target.value })
                  }
                  type="time"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={()=>{editEvent(id)}}
                type="button"
                className="flex-1 bg-indigo-600 text-white text-lg font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Edit Event
              </button>

              <button
                onClick={cancel}
                type="button"
                className="flex-1 bg-slate-100 text-slate-700 text-lg font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
