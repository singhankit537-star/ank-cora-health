// Content for the shared condition page. Every entry renders through
// <ConditionPage>, selected by the `slug` in the URL hash (#condition/<slug>).
//
// To add a new condition: add an object below and it automatically appears in
// the "What We Treat" menu (order here = order in the menu).

// Intentionally omits &w= so callers can append the correct width for their context.
const img = (id: string): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75`

export interface Condition {
  slug: string
  menuLabel: string
  name: string
  heroImage: string
  title: string
  intro: string
  subheading: string
  body: string
  symptoms: string[]
  conditionsTreated: string[]
  treatments: string[]
}

export const conditions: Record<string, Condition> = {
  'neck-pain': {
    slug: 'neck-pain',
    menuLabel: 'Neck',
    name: 'Neck Pain',
    heroImage: img('1559757148-5c350d0d3c56'),
    title: 'Neck Pain? Turn to CORA.',
    intro:
      'Poor posture or sleep position, repetitive lifting, computer work, car accidents, sports injuries, falls, chronic spine problems…there are a lot of reasons you could be experiencing neck pain but there’s no reason to put up with it. Thirty percent of us deal with neck pain every year — therapy with CORA can make a difference.',
    subheading: 'Meet the Movement Experts',
    body:
      'The good news is most neck pain responds well to conservative treatment. The bad news is it probably won’t go away by itself — at least not quickly. CORA therapists are experts in movement. We can reduce or eliminate your pain, help you regain your ability to move normally, and get you back to doing the things you like — and need — to do.',
    symptoms: [
      'Ache or pain in the neck, head, shoulders, or arms',
      'Headache',
      'Muscle spasms and tightness',
      'Shooting pain',
      'Decreased motion',
      'Weakness',
      'Numbness and tingling in the arms',
    ],
    conditionsTreated: [
      'Bulging or herniated discs',
      'Cervical stenosis',
      'Degenerative disc disease',
      'Degenerative joint disease',
      'Fractures',
      'Muscle strain',
      'Muscle weakness',
      'Spondylolisthesis',
      'Spondylosis',
      'Whiplash associated disorder',
      'Rheumatoid arthritis',
    ],
    treatments: [
      'Dry needling',
      'Instrument assisted soft tissue mobilization',
      'Modalities such as ice, heat, electrical stimulation, and ultrasound',
      'Postural exercises',
      'Range of motion and flexibility exercises',
      'Manual therapy',
      'McKenzie method treatment',
      'Stabilization exercise',
      'Therapeutic exercise for strengthening',
      'Traction',
    ],
  },

  'shoulder-pain': {
    slug: 'shoulder-pain',
    menuLabel: 'Shoulder',
    name: 'Shoulder Pain',
    heroImage: img('1571019614242-c5c5dee9f50c'),
    title: 'Physical Therapy to Make Shoulder Pain Go Away',
    intro:
      'A series of complex ligaments and muscles keep the shoulder in joint and a lot can go wrong. If you suffer from shoulder pain due to an injury, overuse, fall, arthritis, or no apparent reason, CORA can help.',
    subheading: 'Why Shoulder the Pain When There’s CORA?',
    body:
      'Need a list of shoulder shoulds and should-nots? You’ve come to the right place. The goal of the CORA team is to keep your shoulder pain from impinging on your life. When your shoulder’s not working as it should, it affects everything from your job, to your ability to do household chores, to being able to pick up a child or even give someone a hug.',
    symptoms: [
      'Burning pain',
      'Pain in the back or the front of the shoulder',
      'Pain in the upper part of the arm',
      'Pain when moving your shoulder',
      'Reduced movement',
      'Sensation of the joint slipping in and out of the socket',
      'Tingling sensations (pins and needles)',
      'Weakness of the shoulder/upper arm',
    ],
    conditionsTreated: [
      'AC joint sprains',
      'Bicep tendinitis',
      'Frozen shoulder',
      'Humerus fracture',
      'Impingement',
      'Osteoarthritis',
      'Post-surgical',
      'Rotator cuff tear (RCT)',
      'Rotator cuff tendinitis',
      'Shoulder bursitis',
      'Sports injuries',
      'Total shoulder replacement',
    ],
    treatments: [
      'Body mechanics training',
      'Dry needling',
      'FMS and SFMA screens',
      'Functional exercise',
      'Home exercise program',
      'Manual therapy',
      'Modalities including ice/heat, ultrasound and electrical stimulation',
      'Range of motion and flexibility',
      'Postural strengthening',
      'Progressive exercise',
      'Return to sports',
      'Sports performance (golf, throwing)',
      'Taping',
    ],
  },

  'elbow-pain': {
    slug: 'elbow-pain',
    menuLabel: 'Elbow',
    name: 'Elbow Pain',
    heroImage: img('1517836357463-d25dfeac3438'),
    title: 'Put Elbow Pain Behind You.',
    intro:
      'From tennis elbow to fractures, the elbow takes a beating in daily life and sport. Whether your pain came on suddenly or built up over time, CORA’s therapists can help you bend, lift, and reach without it holding you back.',
    subheading: 'Move Without the Ache',
    body:
      'Elbow pain rarely fixes itself, and compensating for it can strain your wrist and shoulder too. Our team pinpoints the source of your pain and builds a plan to restore strength and mobility so you can get back to the things you love.',
    symptoms: [
      'Pain on the inside or outside of the elbow',
      'Weak grip strength',
      'Stiffness or trouble straightening the arm',
      'Swelling',
      'Tingling into the forearm and hand',
      'Pain that worsens with gripping or lifting',
    ],
    conditionsTreated: [
      'Tennis elbow (lateral epicondylitis)',
      'Golfer’s elbow (medial epicondylitis)',
      'Bursitis',
      'Cubital tunnel syndrome',
      'Fractures',
      'Sprains and strains',
      'Post-surgical recovery',
      'Arthritis',
    ],
    treatments: [
      'Manual therapy',
      'Dry needling',
      'Therapeutic exercise',
      'Bracing and taping',
      'Modalities (ice/heat, ultrasound, electrical stimulation)',
      'Range of motion and flexibility',
      'Strengthening program',
      'Home exercise program',
    ],
  },

  'wrist-hand-pain': {
    slug: 'wrist-hand-pain',
    menuLabel: 'Wrist/Hand',
    name: 'Wrist & Hand Pain',
    heroImage: img('1574680096145-d05b474e3a91'),
    title: 'Get a Grip on Wrist & Hand Pain.',
    intro:
      'Your hands and wrists power nearly everything you do. When pain, numbness, or weakness sets in, even simple tasks become a challenge. CORA helps restore the dexterity and strength you rely on every day.',
    subheading: 'Restore Your Dexterity',
    body:
      'Whether your symptoms stem from an injury, repetitive strain, or a chronic condition, our therapists tailor treatment to your goals — typing, lifting, gripping, or creating — so you can use your hands with confidence again.',
    symptoms: [
      'Pain or aching in the wrist or hand',
      'Numbness and tingling in the fingers',
      'Weak grip',
      'Swelling and stiffness',
      'Reduced range of motion',
      'Clicking or locking of the fingers',
    ],
    conditionsTreated: [
      'Carpal tunnel syndrome',
      'Tendinitis',
      'Sprains and strains',
      'Fractures',
      'Arthritis',
      'Trigger finger',
      'De Quervain’s tenosynovitis',
      'Post-surgical recovery',
    ],
    treatments: [
      'Manual therapy',
      'Splinting and bracing',
      'Therapeutic exercise',
      'Nerve gliding techniques',
      'Modalities (ice/heat, ultrasound)',
      'Range of motion and flexibility',
      'Grip and dexterity training',
      'Home exercise program',
    ],
  },

  'back-pain': {
    slug: 'back-pain',
    menuLabel: 'Back',
    name: 'Back Pain',
    heroImage: img('1544367567-0f2fcb009e0b'),
    title: 'Getting In Front of Back Pain.',
    intro:
      'If you suffer from back pain, you know firsthand how it can impact you physically and emotionally. Know this: you’re not alone. Around 80% of us will experience back pain in our lifetimes. Your doctor will tell you that it’s one of the most common conditions they treat, and employers claim it’s at the top of the list of reasons people miss work.',
    subheading: 'Physical Therapy Sooner Not Later',
    body:
      'Early referral and intervention is the key to treating back pain. The thing to remember is, we no longer have to accept back pain the way our parents and grandparents did. The sooner you get therapy, the better.',
    symptoms: [
      'Ache and stiffness in the lower back',
      'Nerve pain in the legs',
      'Muscle spasms',
      'Muscle tension',
      'Pain in the buttock and/or legs',
      'Tingling and numbness in the arms and legs',
    ],
    conditionsTreated: [
      'Bulging or herniated discs',
      'Degenerative disc disease',
      'Degenerative joint disease',
      'Fractures',
      'Muscle strain',
      'Muscle weakness',
      'Piriformis syndrome',
      'Sciatica',
      'Spinal stenosis',
      'Spondylolisthesis',
      'Spondylosis',
    ],
    treatments: [
      'Aerobic exercise',
      'Aquatic therapy',
      'Dry needling',
      'Flexibility exercises',
      'Joint mobilization',
      'McKenzie-based therapy',
      'Modalities such as ice, heat and electrical stimulation',
      'Patient education on activity modification and ergonomic assessment',
      'Neuromuscular conditioning',
      'Stabilization exercises',
      'Traction',
    ],
  },

  'low-back-pain-sciatica': {
    slug: 'low-back-pain-sciatica',
    menuLabel: 'Low back pain/Sciatica',
    name: 'Low Back Pain & Sciatica',
    heroImage: img('1576091160550-2173dba999ef'),
    title: 'Relief for Low Back Pain & Sciatica.',
    intro:
      'Low back pain and sciatica can turn everyday movement into a struggle, sending pain shooting down the leg. The good news: most cases respond well to physical therapy, often without surgery or long-term medication.',
    subheading: 'Target the Source, Not Just the Symptom',
    body:
      'Sciatica is usually a symptom of an underlying issue in the spine. Our therapists identify what’s irritating the nerve and address it directly, helping you sit, stand, and move comfortably again.',
    symptoms: [
      'Aching or burning in the lower back',
      'Pain radiating down the leg',
      'Numbness or tingling in the leg or foot',
      'Muscle weakness',
      'Pain that worsens with sitting',
      'Difficulty standing up straight',
    ],
    conditionsTreated: [
      'Herniated or bulging discs',
      'Sciatica',
      'Spinal stenosis',
      'Degenerative disc disease',
      'Piriformis syndrome',
      'Spondylolisthesis',
      'Muscle strain',
      'SI joint dysfunction',
    ],
    treatments: [
      'McKenzie-based therapy',
      'Manual therapy',
      'Nerve mobilization',
      'Core stabilization exercises',
      'Traction',
      'Modalities (ice/heat, electrical stimulation)',
      'Postural and ergonomic education',
      'Flexibility exercises',
    ],
  },

  'degenerative-disk-joint-disease': {
    slug: 'degenerative-disk-joint-disease',
    menuLabel: 'Degenerative Disk/Joint Disease',
    name: 'Degenerative Disk/Joint Disease',
    heroImage: img('1581009146145-b5ef050c2e1e'),
    title: 'Stay Active With Degenerative Disk & Joint Disease.',
    intro:
      'Degenerative changes in the spine and joints are a natural part of aging, but they don’t have to slow you down. Physical therapy can ease pain, improve mobility, and help you keep doing what you love.',
    subheading: 'Manage It, Don’t Surrender to It',
    body:
      'There’s a lot you can do to stay ahead of degenerative disease. Our therapists design programs that protect your joints, strengthen supporting muscles, and keep you moving safely for the long haul.',
    symptoms: [
      'Stiffness, especially in the morning',
      'Aching or pain that comes and goes',
      'Reduced range of motion',
      'Weakness',
      'Pain that worsens with activity',
      'Grinding or popping sensations',
    ],
    conditionsTreated: [
      'Degenerative disc disease',
      'Osteoarthritis',
      'Degenerative joint disease',
      'Spinal stenosis',
      'Facet joint arthritis',
      'Spondylosis',
      'Chronic neck and back pain',
    ],
    treatments: [
      'Therapeutic exercise',
      'Manual therapy',
      'Joint mobilization',
      'Aquatic therapy',
      'Modalities (ice/heat, electrical stimulation)',
      'Postural strengthening',
      'Flexibility exercises',
      'Activity modification education',
    ],
  },

  arthritis: {
    slug: 'arthritis',
    menuLabel: 'Arthritis',
    name: 'Arthritis',
    heroImage: img('1597764690523-15bea4c581c9'),
    title: 'Keep Moving Through Arthritis.',
    intro:
      'Arthritis affects millions and can make joints stiff, swollen, and painful. Movement might be the last thing you feel like doing — but it’s one of the best ways to manage symptoms and protect your joints.',
    subheading: 'Motion Is Lotion',
    body:
      'Our therapists help you find the right balance of activity and rest, building strength around affected joints and teaching strategies to reduce pain and keep you independent.',
    symptoms: [
      'Joint pain and tenderness',
      'Stiffness, especially after rest',
      'Swelling',
      'Reduced range of motion',
      'Warmth or redness around joints',
      'Fatigue',
    ],
    conditionsTreated: [
      'Osteoarthritis',
      'Rheumatoid arthritis',
      'Psoriatic arthritis',
      'Gout',
      'Post-traumatic arthritis',
      'Joint replacement recovery',
    ],
    treatments: [
      'Therapeutic exercise',
      'Manual therapy',
      'Aquatic therapy',
      'Joint protection education',
      'Modalities (heat/ice, electrical stimulation)',
      'Range of motion and flexibility',
      'Strengthening program',
      'Home exercise program',
    ],
  },

  'knee-pain': {
    slug: 'knee-pain',
    menuLabel: 'Knee',
    name: 'Knee Pain',
    heroImage: img('1599058917212-d750089bc07e'),
    title: 'Get Back on Your Feet With Strong, Pain-Free Knees.',
    intro:
      'Your knees absorb a tremendous amount of force every day. Whether your pain comes from an injury, overuse, or arthritis, CORA can help you walk, climb, and run without holding back.',
    subheading: 'Built to Get You Moving',
    body:
      'Knee pain can sideline you from work, sport, and the activities you love. Our therapists target the root cause and rebuild the strength and stability your knees need to carry you through life.',
    symptoms: [
      'Pain around or behind the kneecap',
      'Swelling and stiffness',
      'Instability or buckling',
      'Clicking, popping, or grinding',
      'Difficulty fully bending or straightening',
      'Pain with stairs or squatting',
    ],
    conditionsTreated: [
      'ACL/MCL sprains and tears',
      'Meniscus tears',
      'Patellofemoral pain syndrome',
      'Tendinitis',
      'Osteoarthritis',
      'Bursitis',
      'Post-surgical recovery',
      'Total knee replacement',
    ],
    treatments: [
      'Therapeutic exercise',
      'Manual therapy',
      'Dry needling',
      'Bracing and taping',
      'Gait training',
      'Modalities (ice/heat, electrical stimulation)',
      'Strengthening and stability program',
      'Return to sport',
    ],
  },

  'ankle-pain': {
    slug: 'ankle-pain',
    menuLabel: 'Ankle',
    name: 'Ankle Pain',
    heroImage: img('1518611012118-696072aa579a'),
    title: 'Find Your Footing Again.',
    intro:
      'A rolled ankle or nagging pain can throw off your whole stride. CORA helps you regain the stability and strength to stand, walk, and play with confidence.',
    subheading: 'Steady on Your Feet',
    body:
      'Ankle injuries are easy to brush off, but untreated, they often lead to repeat sprains and chronic instability. Our therapists rebuild your balance and strength to keep you steady for good.',
    symptoms: [
      'Pain and swelling',
      'Bruising',
      'Instability or giving way',
      'Stiffness',
      'Difficulty bearing weight',
      'Reduced range of motion',
    ],
    conditionsTreated: [
      'Ankle sprains and strains',
      'Achilles tendinitis',
      'Fractures',
      'Chronic ankle instability',
      'Arthritis',
      'Post-surgical recovery',
      'Tendon injuries',
    ],
    treatments: [
      'Therapeutic exercise',
      'Balance and proprioception training',
      'Manual therapy',
      'Bracing and taping',
      'Gait training',
      'Modalities (ice/heat, ultrasound)',
      'Strengthening program',
      'Home exercise program',
    ],
  },

  'foot-pain': {
    slug: 'foot-pain',
    menuLabel: 'Foot',
    name: 'Foot Pain',
    heroImage: img('1576091160399-112ba8d25d1d'),
    title: 'Step Out of Foot Pain.',
    intro:
      'From heel pain to plantar fasciitis, foot problems can make every step a chore. CORA’s therapists treat the cause of your pain so you can get back on your feet comfortably.',
    subheading: 'A Strong Foundation',
    body:
      'Your feet are the foundation of nearly every movement. We assess your gait, footwear, and mechanics to relieve pain and prevent it from coming back.',
    symptoms: [
      'Heel or arch pain',
      'Pain that’s worse with first steps in the morning',
      'Swelling',
      'Burning or tingling',
      'Stiffness',
      'Pain with standing or walking',
    ],
    conditionsTreated: [
      'Plantar fasciitis',
      'Heel spurs',
      'Achilles tendinitis',
      'Bunions',
      'Stress fractures',
      'Flat feet',
      'Arthritis',
      'Post-surgical recovery',
    ],
    treatments: [
      'Manual therapy',
      'Dry needling',
      'Therapeutic exercise',
      'Orthotic and footwear guidance',
      'Taping',
      'Modalities (ice/heat, ultrasound)',
      'Stretching and strengthening',
      'Gait training',
    ],
  },

  'hip-pain': {
    slug: 'hip-pain',
    menuLabel: 'Hip',
    name: 'Hip Pain',
    heroImage: img('1571019613454-1cb2f99b2d8b'),
    title: 'Move Freely, Live Fully — Beat Hip Pain.',
    intro:
      'The hip is built for both stability and a wide range of motion. When it hurts, walking, sitting, and sleeping all suffer. CORA helps restore comfortable, confident movement.',
    subheading: 'Mobility You Can Count On',
    body:
      'Hip pain can stem from the joint itself or from the muscles and tendons around it. Our therapists identify the source and build a plan to relieve pain and restore the motion you need.',
    symptoms: [
      'Pain in the groin, outer hip, or buttock',
      'Stiffness',
      'Reduced range of motion',
      'Limping',
      'Pain with walking or stairs',
      'Discomfort lying on the affected side',
    ],
    conditionsTreated: [
      'Osteoarthritis',
      'Bursitis',
      'Labral tears',
      'Tendinitis',
      'Hip impingement',
      'Muscle strains',
      'Post-surgical recovery',
      'Total hip replacement',
    ],
    treatments: [
      'Therapeutic exercise',
      'Manual therapy',
      'Dry needling',
      'Gait training',
      'Modalities (ice/heat, electrical stimulation)',
      'Range of motion and flexibility',
      'Strengthening program',
      'Aquatic therapy',
    ],
  },

  'si-joint-dysfunction': {
    slug: 'si-joint-dysfunction',
    menuLabel: 'SI Joint Dysfunction',
    name: 'SI Joint Dysfunction',
    heroImage: img('1581009146145-b5ef050c2e1e'),
    title: 'Stabilize Your SI Joint, Settle Your Pain.',
    intro:
      'The sacroiliac (SI) joint connects your spine to your pelvis, and when it’s not moving correctly it can cause stubborn low back and hip pain. CORA helps restore proper movement and lasting relief.',
    subheading: 'Balance and Stability First',
    body:
      'SI joint dysfunction is often missed or mistaken for other low back problems. Our therapists assess the joint carefully and use targeted techniques to stabilize the pelvis and ease your pain.',
    symptoms: [
      'Lower back or buttock pain',
      'Pain radiating to the hip or thigh',
      'Pain with standing or climbing stairs',
      'Stiffness in the lower back and pelvis',
      'Instability when walking',
      'Pain with prolonged sitting',
    ],
    conditionsTreated: [
      'SI joint dysfunction',
      'Pelvic misalignment',
      'Pregnancy-related pelvic pain',
      'Post-traumatic injury',
      'Hypermobility',
      'Hypomobility',
    ],
    treatments: [
      'Manual therapy',
      'Joint mobilization',
      'Core and pelvic stabilization exercises',
      'Bracing',
      'Modalities (ice/heat, electrical stimulation)',
      'Postural education',
      'Strengthening program',
      'Home exercise program',
    ],
  },

  'leg-pain': {
    slug: 'leg-pain',
    menuLabel: 'Leg',
    name: 'Leg Pain',
    heroImage: img('1597764690523-15bea4c581c9'),
    title: 'Get Your Legs Back Under You.',
    intro:
      'Leg pain can come from the muscles, nerves, joints, or circulation — and it can make standing, walking, and exercising miserable. CORA pinpoints the cause and gets you moving again.',
    subheading: 'Strength From the Ground Up',
    body:
      'Whether it’s a strain, nerve irritation, or overuse injury, our therapists develop a plan to relieve your leg pain and rebuild the strength and endurance you need.',
    symptoms: [
      'Aching, cramping, or sharp pain',
      'Numbness or tingling',
      'Weakness',
      'Swelling',
      'Pain with walking or exercise',
      'Muscle tightness',
    ],
    conditionsTreated: [
      'Muscle strains',
      'Shin splints',
      'Sciatica',
      'Tendinitis',
      'Stress fractures',
      'Nerve entrapment',
      'Post-surgical recovery',
      'Circulation-related pain',
    ],
    treatments: [
      'Therapeutic exercise',
      'Manual therapy',
      'Dry needling',
      'Modalities (ice/heat, electrical stimulation)',
      'Stretching and flexibility',
      'Strengthening program',
      'Gait training',
      'Home exercise program',
    ],
  },

  'pregnancy-post-partum': {
    slug: 'pregnancy-post-partum',
    menuLabel: 'Pregnancy/Post-Partum',
    name: 'Pregnancy & Post-Partum',
    heroImage: img('1631217868264-e5b90bb7e133'),
    title: 'Feel Strong Through Pregnancy & Beyond.',
    intro:
      'Pregnancy and recovery bring big changes to your body. Specialized physical therapy can ease the aches, prepare you for delivery, and help you rebuild strength afterward.',
    subheading: 'Care for Every Stage',
    body:
      'From back and pelvic pain during pregnancy to core and pelvic floor recovery after delivery, our therapists provide safe, supportive care tailored to where you are in your journey.',
    symptoms: [
      'Low back and pelvic pain',
      'Pelvic floor weakness or pressure',
      'Abdominal separation (diastasis recti)',
      'Hip and SI joint pain',
      'Incontinence',
      'Difficulty returning to exercise',
    ],
    conditionsTreated: [
      'Pregnancy-related back and pelvic pain',
      'Diastasis recti',
      'Pelvic floor dysfunction',
      'SI joint dysfunction',
      'Post-cesarean recovery',
      'Postpartum weakness',
    ],
    treatments: [
      'Pelvic floor therapy',
      'Therapeutic exercise',
      'Manual therapy',
      'Core strengthening',
      'Posture and body mechanics education',
      'Breathing and relaxation techniques',
      'Safe return-to-exercise program',
      'Home exercise program',
    ],
  },

  incontinence: {
    slug: 'incontinence',
    menuLabel: 'Incontinence',
    name: 'Incontinence',
    heroImage: img('1576091160550-2173dba999ef'),
    title: 'Take Back Control — Discreet, Effective Care.',
    intro:
      'Incontinence is common, but it’s not something you have to live with. Physical therapy offers a proven, non-surgical way to strengthen the pelvic floor and regain control.',
    subheading: 'Private, Personalized Treatment',
    body:
      'Our specially trained therapists provide compassionate, confidential care. Together we’ll build a program to strengthen and coordinate the muscles that support your bladder so you can get back to life without worry.',
    symptoms: [
      'Leaking with coughing, sneezing, or laughing',
      'Sudden, strong urge to urinate',
      'Frequent trips to the bathroom',
      'Difficulty fully emptying the bladder',
      'Pelvic pressure or heaviness',
      'Disrupted sleep from nighttime urination',
    ],
    conditionsTreated: [
      'Stress incontinence',
      'Urge incontinence',
      'Mixed incontinence',
      'Pelvic floor weakness',
      'Post-surgical pelvic dysfunction',
      'Postpartum incontinence',
    ],
    treatments: [
      'Pelvic floor muscle training',
      'Biofeedback',
      'Bladder retraining',
      'Therapeutic exercise',
      'Manual therapy',
      'Education on diet and habits',
      'Core strengthening',
      'Home exercise program',
    ],
  },
}

export interface TreatMenuItem {
  label: string
  slug: string
}

// Ordered list used to build the "What We Treat" menu (preserves insertion order).
export const treatMenu: TreatMenuItem[] = Object.values(conditions).map((c) => ({
  label: c.menuLabel,
  slug: c.slug,
}))

export function getCondition(slug: string): Condition | null {
  return conditions[slug] ?? null
}
