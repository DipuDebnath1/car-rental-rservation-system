import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to backend API)
    console.log('Form submitted:', formData);
    // Reset form data after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen py-[5rem]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className='bg-gray-100 p-10 rounded-lg shadow-md'>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-gray-600 mb-6">
              Feel free to reach out to us for any inquiries or assistance. We're here to help!
            </p>
            <ul className="text-gray-700">
              <li className="mb-2">
                <strong>Email:</strong> support@flexicar.com
              </li>
              <li className="mb-2">
                <strong>Phone:</strong> +1 (800) 123-4567
              </li>
              <li className="mb-2">
                <strong>Address:</strong> 123 Car Lane, Drive City, Thakurgaon 5100
              </li>
              <li className="mb-2">
                <strong>Working Hours:</strong> 7Days , 24H
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Optional: Interactive Map */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Our Location</h2>
          <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28682.466419103836!2d88.43189486667481!3d26.02346671005644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4c1005e3f6455%3A0xd92b77b4140806fb!2sThakurgaon%20Airport!5e0!3m2!1sen!2sbd!4v1726515209760!5m2!1sen!2sbd" 
          width="100%" height="450"  
          allowFullScreen 
          loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
