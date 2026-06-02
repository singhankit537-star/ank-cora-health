/**
 * About Page
 */

import React from 'react';
import { Container, SectionHeading, Card, Button } from '@components/ui';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Container>
          <h1 className="text-5xl font-bold mb-4">About CoraHealth</h1>
          <p className="text-xl text-blue-100">
            Dedicated to your recovery and wellbeing
          </p>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              title="Our Mission"
              centered={true}
            />
            <p className="text-lg text-gray-600 text-center mb-8">
              We are committed to providing exceptional physical therapy and wellness services that help our patients recover, rehabilitate, and optimize their health. Our team of licensed professionals uses evidence-based practices to deliver personalized care.
            </p>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <Container>
          <SectionHeading title="Our Values" subtitle="What drives us every day" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-2xl font-bold mb-3 text-blue-600">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in patient care and clinical outcomes.
              </p>
            </Card>
            <Card>
              <h3 className="text-2xl font-bold mb-3 text-blue-600">Compassion</h3>
              <p className="text-gray-600">
                We treat each patient with empathy and understanding on their healing journey.
              </p>
            </Card>
            <Card>
              <h3 className="text-2xl font-bold mb-3 text-blue-600">Innovation</h3>
              <p className="text-gray-600">
                We embrace modern techniques and evidence-based approaches to therapy.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <Container>
          <SectionHeading title="Our Team" subtitle="Expert professionals dedicated to your care" />
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our highly trained physical therapists and wellness specialists bring years of experience and expertise to every patient interaction.
          </p>
          <div className="text-center">
            <Button variant="outline">Learn About Our Team</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
