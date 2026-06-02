/**
 * Contact Page
 * Demonstrates: Form handling with validation
 */

import React, { useState } from 'react';
import { Container, SectionHeading, Input, Select, Button } from '@components/ui';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const serviceOptions = [
    { value: 'pt', label: 'Physical Therapy' },
    { value: 'sports', label: 'Sports Medicine' },
    { value: 'wellness', label: 'Wellness Programs' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Container>
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">
            We're here to help. Get in touch with us today.
          </p>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <SectionHeading title="Get In Touch" centered={false} />
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">info@corahealth.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Downtown Location</h3>
                  <p className="text-gray-600">123 Main Street, New York, NY 10001</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Uptown Location</h3>
                  <p className="text-gray-600">456 Park Avenue, New York, NY 10022</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you for contacting us! We'll be in touch soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Select
                  label="Service Interest"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  options={serviceOptions}
                  placeholder="Select a service"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                <Button type="submit" fullWidth>
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
