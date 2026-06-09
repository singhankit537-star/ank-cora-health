/**
 * Main App Component with React Router
 * Demonstrates: Route-level code splitting with React.lazy and Suspense
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Layout } from '@components/layout';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('@pages/Home'));
const Services = React.lazy(() => import('@pages/Services'));
const Locations = React.lazy(() => import('@pages/Locations'));
const About = React.lazy(() => import('@pages/About'));
const Contact = React.lazy(() => import('@pages/Contact'));
const Appointment = React.lazy(() => import('@pages/Appointment'));

// Loading component
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// 404 Not Found page
const NotFound: React.FC = () => (
  <Layout>
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  </Layout>
);

export const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
