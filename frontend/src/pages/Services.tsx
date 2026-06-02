/**
 * Services Page
 */

import React from 'react';
import { Container, Card } from '@components/ui';

interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Physical Therapy',
    description: 'Comprehensive rehabilitation and therapeutic treatment programs designed to restore function and mobility.',
    benefits: ['Pain relief', 'Improved mobility', 'Faster recovery', 'Personalized programs'],
    icon: '🏥',
  },
  {
    id: '2',
    title: 'Sports Medicine',
    description: 'Specialized care for athletes and active individuals to prevent and treat sports-related injuries.',
    benefits: ['Injury prevention', 'Athletic training', 'Performance optimization', 'Return to sport'],
    icon: '⚽',
  },
  {
    id: '3',
    title: 'Wellness Programs',
    description: 'Preventative care and wellness optimization to maintain your health and quality of life.',
    benefits: ['Health maintenance', 'Injury prevention', 'Fitness coaching', 'Lifestyle guidance'],
    icon: '💪',
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Container>
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Comprehensive healthcare solutions tailored to your unique needs
          </p>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage;
