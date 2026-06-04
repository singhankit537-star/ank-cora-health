import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cora-sky border-t-cora-navy" />
      <span className="sr-only">Loading page…</span>
    </div>
  )
}

// PublicLayout: Header + lazy page + Footer
export const PublicLayout: React.FC = () => (
  <>
    <Header />
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
    <Footer />
  </>
)

export default PublicLayout
