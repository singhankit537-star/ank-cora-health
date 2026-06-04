import React from 'react'
import { CategoryCard, PageHero } from '@cora/ui'
import type { BodyAreaCategory } from '@cora/ui'

const CATEGORIES: BodyAreaCategory[] = [
  {
    slug: 'neck-pain',
    name: 'Neck Pain & Injuries',
    intro: 'Our physical therapists specialize in treating a range of neck conditions that cause pain, stiffness, and limited mobility.',
    conditionsTreated: ['Cervical Disc Disease', 'Cervical Radiculopathy', 'Whiplash', 'Torticollis', 'Cervicogenic Headaches'],
  },
  {
    slug: 'shoulder-pain',
    name: 'Shoulder Pain & Injuries',
    intro: 'We treat a wide range of shoulder injuries and conditions to restore full range of motion and strength.',
    conditionsTreated: ['Rotator Cuff Tears', 'Shoulder Impingement', 'Frozen Shoulder (Adhesive Capsulitis)', 'AC Joint Sprain', 'Bicep Tendinitis'],
  },
  {
    slug: 'back-pain',
    name: 'Back Pain & Spine Conditions',
    intro: 'Back pain is one of the most common conditions we treat. Our evidence-based approach targets the root cause.',
    conditionsTreated: ['Herniated Disc', 'Lumbar Spinal Stenosis', 'Sciatica', 'Spondylolisthesis', 'Degenerative Disc Disease'],
  },
  {
    slug: 'knee-pain',
    name: 'Knee Pain & Injuries',
    intro: 'Whether from sports, surgery, or wear-and-tear, we help you recover and return to the activities you love.',
    conditionsTreated: ['ACL / MCL Tears', 'Meniscus Tears', 'Patellofemoral Pain Syndrome', 'IT Band Syndrome', 'Post-Surgical Knee Rehab'],
  },
  {
    slug: 'ankle-foot',
    name: 'Ankle & Foot Conditions',
    intro: 'Ankle sprains, plantar fasciitis, and more — we restore your mobility and help prevent re-injury.',
    conditionsTreated: ['Ankle Sprain', 'Plantar Fasciitis', 'Achilles Tendinitis', 'Posterior Tibial Tendon Dysfunction', 'Stress Fractures'],
  },
  {
    slug: 'hip-pain',
    name: 'Hip Pain & Injuries',
    intro: 'Hip pain affects your entire lower body. We address the underlying causes to restore pain-free movement.',
    conditionsTreated: ['Hip Bursitis', 'Femoroacetabular Impingement', 'Labral Tear', 'Hip Flexor Strain', 'Post-Hip Replacement Rehab'],
  },
]

const WhatWeTreat: React.FC = () => (
  <main>
    <PageHero
      title="What We Treat"
      subtitle="We specialize in treating a wide range of musculoskeletal conditions. Find your area below."
    />

    <section className="bg-gray-50 py-16" aria-label="Condition categories">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  </main>
)

export default WhatWeTreat
