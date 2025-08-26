"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

// Modal Component for Editing (Date field removed)
function EditEventModal({ eventId, onClose, onUpdated }) {
  const [eventData, setEventData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/events/${eventId}`);
      if (res.ok) {
        const data = await res.json();
        setEventData(data.data);
      }
      setLoading(false);
    };
    fetchEventData();
  }, [eventId]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let imageUrl = eventData.imageUrl;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await fetch("/api/admin/events/upload", { method: "POST", body: formData });
      if (!uploadRes.ok) { alert("Failed to upload image."); return; }
      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    const res = await fetch("/api/admin/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...eventData, imageUrl }),
    });

    if (res.ok) {
      alert("Event updated successfully!");
      onUpdated();
      onClose();
    } else {
      alert("Failed to update event.");
    }
  };

  if (loading) return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><p className="text-white">Loading...</p></div>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Event Service</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-1">Service Name</label>
            <input type="text" name="name" value={eventData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea name="description" value={eventData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Starting Price</label>
            <input type="number" name="price" value={eventData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Change Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
            <Image src={eventData.imageUrl} alt={eventData.name} width={80} height={80} className="rounded mt-1 object-cover" />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-fuchsia-500 text-white px-4 py-2 rounded hover:bg-fuchsia-600">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Page Component (Date field removed)
export default function AdminEventsPage() {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/events");
    if (res.ok) {
      const data = await res.json();
      setEvents(data.data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);
  
  const handleFileChange = (e) => { setImageFile(e.target.files[0]); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) { alert("Please select an image."); return; }

    const formData = new FormData();
    formData.append("file", imageFile);
    const uploadRes = await fetch("/api/admin/events/upload", { method: "POST", body: formData });
    if (!uploadRes.ok) { alert("Failed to upload image."); return; }
    const uploadData = await uploadRes.json();
    const imageUrl = uploadData.url;

    const eventRes = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: eventName, description, price, imageUrl }),
    });

    if (eventRes.ok) {
      alert("Event service added successfully!");
      setEventName("");
      setDescription("");
      setPrice("");
      setImageFile(null);
      document.getElementById('imageFile').value = null;
      fetchEvents();
    } else {
      alert("Failed to add event service.");
    }
  };
  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const res = await fetch("/api/admin/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert("Service deleted successfully!");
      fetchEvents();
    } else {
      alert("Failed to delete service.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      {editingEventId && <EditEventModal eventId={editingEventId} onClose={() => setEditingEventId(null)} onUpdated={fetchEvents} />}
      <h1 className="text-3xl font-bold text-center my-4">Manage Event Services</h1>
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="mb-4">
            <label htmlFor="eventName" className="block mb-1">Service Name (e.g., Wedding Planning, Corporate Gala)</label>
            <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded" required></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">Starting Price (₹)</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="imageFile" className="block mb-1">Service Image</label>
            <input type="file" id="imageFile" accept="image/*" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <button type="submit" className="bg-fuchsia-500 text-white px-4 py-2 rounded hover:bg-fuchsia-600">Add Service</button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Existing Services</h2>
        {loading ? <p>Loading...</p> : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event._id} className="border p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <Image src={event.imageUrl} alt={event.name} width={300} height={150} className="rounded-md mb-2 object-cover w-full h-40" />
                  <h3 className="font-bold text-lg">{event.name}</h3>
                  <p>From ₹{event.price}</p>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={() => setEditingEventId(event._id)} className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                  <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500">No services found. Add one using the form above.</p>}
      </div>
    </div>
  );
}