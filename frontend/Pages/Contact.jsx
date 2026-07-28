import React from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    toast.info(
      "Message sent successfully! We will get back to you within 24 hours.",
    );
  };

  return (
    <>
      <div className="flex flex-col gap-3 bg-white p-6 rounded-xl shadow-md flex-1">
        <h1 className="text-2xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-500">
          Send us a message and we'll get back within 24 hours.
        </p>

        <form
          id="contactForm"
          className="flex flex-col gap-3 mt-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="cname" className="font-medium text-gray-700">
            Name
          </label>
          <input
            id="cname"
            name="name"
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <small className="text-red-500 text-xs hidden">
            Should only contain letters and spaces.
          </small>

          <label htmlFor="cemail" className="font-medium text-gray-700">
            Email
          </label>
          <input
            id="cemail"
            name="email"
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <label htmlFor="cmessage" className="font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="cmessage"
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>

          <button
            type="submit"
            className="bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
