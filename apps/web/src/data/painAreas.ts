// `slug` links each card to a condition page (#condition/<slug>) in conditions.ts
export interface PainArea {
  id: string
  title: string
  slug: string
  image: string
}

export const painAreas: PainArea[] = [
  { id: 'neck', title: 'Neck', slug: 'neck-pain', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop' },
  { id: 'shoulder', title: 'Shoulder', slug: 'shoulder-pain', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop' },
  { id: 'elbow', title: 'Elbow', slug: 'elbow-pain', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
  { id: 'hand', title: 'Hand & Wrist', slug: 'wrist-hand-pain', image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=400&h=300&fit=crop' },
  { id: 'back', title: 'Back', slug: 'back-pain', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
  { id: 'knee', title: 'Knee', slug: 'knee-pain', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop' },
  { id: 'foot', title: 'Foot & Ankle', slug: 'foot-pain', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop' },
  { id: 'hip', title: 'Hip', slug: 'hip-pain', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop' },
]
