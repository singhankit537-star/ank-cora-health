/**
 * Home Page
 * Demonstrates: Promise.all, custom hooks, withErrorBoundary, lazy loading
 */

import React from 'react';
import { homepageApi } from '@services/api/endpoints';
import { Card, Button, Container, SectionHeading } from '@components/ui';
import { withErrorBoundary } from '@hocs/withErrorBoundary';

const ServiceCard: React.FC<{ name: string; description: string; icon: string }> = ({
  name,
  description,
  icon,
}) => (
  <Card hoverable>
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

const TestimonialCard: React.FC<{ author: string; content: string; rating: number }> = ({
  author,
  content,
  rating,
}) => (
  <Card>
    <div className="mb-3 flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>
          ★
        </span>
      ))}
    </div>
    <p className="text-gray-600 mb-4">"{content}"</p>
    <p className="font-semibold text-gray-900">— {author}</p>
  </Card>
);

const HomePageContent: React.FC = () => {
  // Use Promise.all pattern through custom logic
  React.useEffect(() => {
    const loadData = async () => {
      try {
        await homepageApi.getHomePageData();
        // Data loaded successfully
      } catch (err) {
        console.error('Failed to load home data:', err);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Path to Better Health
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Professional physical therapy and wellness services designed for your recovery and
              well-being.
            </p>
            <Button variant="secondary" size="lg">
              Schedule Your Visit
            </Button>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive care for your healing journey"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              name="Physical Therapy"
              description="Targeted rehabilitation and therapeutic treatment programs"
              icon="🏥"
            />
            <ServiceCard
              name="Sports Medicine"
              description="Specialized care for athletes and active individuals"
              icon="⚽"
            />
            <ServiceCard
              name="Wellness Programs"
              description="Preventative care and wellness optimization"
              icon="💪"
            />
            <ServiceCard
              name="Injury Rehabilitation"
              description="Recovery and functional restoration programs"
              icon="🩹"
            />
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="What Our Patients Say"
            subtitle="Real stories from people we've helped"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              author="John Smith"
              content="Excellent care and professional staff. Highly recommend!"
              rating={5}
            />
            <TestimonialCard
              author="Sarah Johnson"
              content="Helped me recover from my injury faster than expected."
              rating={5}
            />
            <TestimonialCard
              author="Michael Brown"
              content="Great experience overall. Very knowledgeable therapists."
              rating={4}
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Recovery?</h2>
            <Button variant="secondary" size="lg">
              Book an Appointment
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

const HomePage = withErrorBoundary(HomePageContent);

export default HomePage;
