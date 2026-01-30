import { useState } from "react";

export default function CustomerSupport() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      alert("Message sent successfully!");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    } else {
      alert("Failed to send message. Try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Error sending message.");
  }
};


  return (
    <div className="min-h-screen bg-[#1e1b16] text-white flex flex-col items-center justify-start p-6">
      
      {/* HEADER */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 mt-6 text-center text-[#FF9500]">
        Chordify Support
      </h1>

      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT INFO SECTION */}
        <div className="flex flex-col justify-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-white">How can we help?</h2>
          <p className="text-gray-300 mb-8">
            Get in touch with our sales and support teams for demos, onboarding help, or any product-related questions.
          </p>

          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <div>
              <div className="font-semibold text-[#FF9500] mb-1">Email us</div>
              <div>support@chordify.com</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div>
              <div className="font-semibold text-[#FF9500] mb-1">Call us</div>
              <div>9800000000</div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#393328] border border-[#374151] rounded-2xl p-8 md:p-12 shadow-lg flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#FF9500]">Contact our sales team</h2>

          {/* Full Name Input */}
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="bg-[#4b4433] text-white px-4 py-3 rounded-lg border border-[#374151] focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] outline-none w-full transition"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-[#4b4433] text-white px-4 py-3 rounded-lg border border-[#374151] focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] outline-none w-full transition"
          />

          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="bg-[#4b4433] text-white px-4 py-3 rounded-lg border border-[#374151] focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] outline-none w-full transition"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your project, timeline, and specific needs..."
            rows="4"
            className="bg-[#4b4433] text-white px-4 py-3 rounded-lg border border-[#374151] focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] outline-none w-full resize-none transition min-h-[120px]"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-[#FF9500] to-orange-600 text-white py-4 rounded-lg font-semibold text-lg shadow-md hover:from-orange-400 hover:to-orange-500 transition-transform transform hover:-translate-y-1 active:scale-95"
          >
            Send Message
          </button>

          <p className="text-gray-400 text-xs text-center mt-2 leading-relaxed">
            By submitting this form, you agree to our{" "}
            <a href="#" className="text-[#FF9500]">Privacy Policy</a> and{" "}
            <a href="#" className="text-[#FF9500]">Terms of Service</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
