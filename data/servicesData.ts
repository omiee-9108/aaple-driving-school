export type ServiceCategory = 'license' | 'training' | 'vehicle_rto' | 'puc_choice';

export interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  marathiName: string;
  category: ServiceCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  badge?: string;
  isPopular?: boolean;
  estimatedTime: string;
  priceDisplay?: string;
  inclusions: string[];
  documentsRequired: string[];
  stepByStepProcess: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  benefits: string[];
  vehicleTypes?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: "new-driving-license",
    slug: "new-driving-license",
    name: "New Driving License (LL & DL)",
    marathiName: "नवीन ड्रायव्हिंग लायसन्स (शिकाऊ व पक्के)",
    category: "license",
    categoryLabel: "License Services",
    shortDescription: "Complete hassle-free assistance for Learner's License (LL) and Permanent Driving License (DL) with online Sarathi portal filing and track test prep in Miraj.",
    fullDescription: "Getting your official Driving License in Maharashtra has never been easier. Aaple Motor Driving School provides complete handholding from filing online application on the Sarathi Parivahan portal, conducting mock computer tests for Learner License (LL), biometrics slot booking at Miraj RTO, to rigorous ground test training on official RTO test tracks. We ensure 99%+ first-attempt passing rate with zero stress.",
    icon: "CreditCard",
    badge: "Most Requested",
    isPopular: true,
    estimatedTime: "30 to 45 Days (From LL to Smart Card DL)",
    priceDisplay: "Starts at ₹1,800 + Govt Fees",
    inclusions: [
      "Online Parivahan Form 2 & Form 4 filing & fee receipt generation",
      "Learner's License (LL) mock test questionnaire app access",
      "Medical Certificate (Form 1A) consultation by certified physician",
      "RTO Miraj biometric appointment assistance with dedicated agent support",
      "Official RTO track test vehicle arrangement for your final driving test",
      "Tracking & doorstep speed-post delivery of your official Smart Card DL",
    ],
    documentsRequired: [
      "Proof of Age (Aadhaar Card / PAN Card / 10th School Leaving Certificate)",
      "Proof of Address (Aadhaar Card / Electricity Bill / Ration Card)",
      "4 Recent Passport Size Photographs (White background)",
      "Blood Group Report / Declaration",
      "Valid Mobile Number linked with Aadhaar (for Aadhaar OTP authentication)",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Document Submission & LL Application",
        description: "Submit your KYC documents at our Miraj office or online via WhatsApp. We submit Form 2 on the Sarathi portal and generate your application number.",
      },
      {
        stepNumber: 2,
        title: "Learner License (LL) Test Clearance",
        description: "Practice our free Marathi/English road signs mock test. Pass the online LL test and receive your digital Learner License valid for 6 months across India.",
      },
      {
        stepNumber: 3,
        title: "Driving Training & 30-Day Mandatory Period",
        description: "Complete your practical driving sessions on our dual-control cars and master the Miraj RTO test track (H-track, 8-track, gradient start).",
      },
      {
        stepNumber: 4,
        title: "Permanent DL Slot Booking & Practical Test",
        description: "After 30 days of LL issuance, we book your practical driving test slot at Miraj RTO ground. Our instructor accompanies you with our test-ready vehicle.",
      },
      {
        stepNumber: 5,
        title: "RTO Approval & Smart Card DL Delivery",
        description: "Upon passing, the RTO officer approves your license. Your chip-embedded Smart Card Driving License is dispatched directly to your home address.",
      },
    ],
    benefits: [
      "100% genuine legal process directly linked with MoRTH Sarathi database",
      "Complete mock test training so you never fail the computerized signs test",
      "On-ground escort on the test day at Miraj RTO ground",
      "Zero hidden middleman charges — transparent receipts provided",
    ],
    faqs: [
      {
        question: "What is the minimum age for applying for a driving license in Miraj?",
        answer: "Minimum age for 2-wheeler without gear (up to 50cc) is 16 years (with parental consent). For Light Motor Vehicle (Car / 4-Wheeler) and geared 2-wheelers, the minimum age is 18 years. For commercial heavy transport vehicles, the minimum age is 20 years with 1 year LMV experience.",
      },
      {
        question: "How soon can I apply for the permanent license after getting Learner License?",
        answer: "You can apply for the permanent Driving License test after 30 days from the date of issuance of your Learner License and before 180 days (6 months).",
      },
    ],
  },
  {
    id: "renew-old-driving-license",
    slug: "renew-old-driving-license",
    name: "Renew Old Driving License",
    marathiName: "जुने ड्रायव्हिंग लायसन्स नूतनीकरण",
    category: "license",
    categoryLabel: "License Services",
    shortDescription: "Fast-track renewal for expired driving licenses, address changes, medical certificate Form 1A processing, and conversion of old paper/booklet licenses to Smart Cards.",
    fullDescription: "Is your driving license expired or approaching its 20-year or 40/50-year age renewal milestone? We handle all paperwork for expired driving licenses under Maharashtra RTO jurisdiction. Whether your license expired recently or more than a year ago, or you have an old manual booklet license that needs digital migration to the Sarathi database, our team resolves it swiftly with zero hassle.",
    icon: "RefreshCw",
    badge: "Fast Track",
    isPopular: true,
    estimatedTime: "7 to 15 Working Days",
    priceDisplay: "₹1,500 + Govt Fees",
    inclusions: [
      "Verification and digital extraction of old paper/smart card license data",
      "Filing of Form 9 online on Parivahan Sarathi portal",
      "Form 1A Medical Certificate clearance for applicants aged 40+ years",
      "Address change & biometric photo/signature update if required",
      "Conversion of vintage paper booklet licenses into modern Chip Smart Cards",
      "Handling of penalty/grace period calculations as per latest Motor Vehicle Rules",
    ],
    documentsRequired: [
      "Original Expired Driving License (or Copy/FIR if lost)",
      "Aadhaar Card (with updated address if updating address)",
      "3 Passport Size Photographs",
      "Form 1A Medical Certificate (arranged via authorized doctor for age 40+)",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "License Audit & Data Verification",
        description: "Bring your old license to our Miraj office or share photos on WhatsApp. We verify if your records exist on Sarathi or require manual entry.",
      },
      {
        stepNumber: 2,
        title: "Medical Fitness (Form 1A) Clearance",
        description: "For candidates over 40 years or transport drivers, we coordinate doctor sign-off on Form 1A with vision & fitness certification.",
      },
      {
        stepNumber: 3,
        title: "Online Application & Govt Fee Payment",
        description: "We submit the renewal application, upload documents, pay the official RTO fee, and generate your Sarathi acknowledgment.",
      },
      {
        stepNumber: 4,
        title: "Biometrics (If Required) & Dispatch",
        description: "If photo or signature update is needed, a quick 10-minute visit to Miraj RTO is scheduled. Your renewed Smart Card DL is dispatched to your address.",
      },
    ],
    benefits: [
      "Save high penalties by renewing within the valid grace period",
      "Legally certified to drive anywhere in India and abroad with updated smart card",
      "Seamless address update from old town to current Miraj address without hassle",
    ],
    faqs: [
      {
        question: "My license expired 2 years ago. Do I need to take the driving test again?",
        answer: "As per the Central Motor Vehicles Rules, if a driving license is expired for more than 1 year, you may need to undergo a practical driving re-test. We help you prepare for the re-test at Miraj RTO to pass without complications.",
      },
    ],
  },
  {
    id: "puc-certificate",
    slug: "puc-certificate",
    name: "PUC (Pollution Under Control) Certificate",
    marathiName: "पीयुसी (प्रदूषण नियंत्रण) प्रमाणपत्र",
    category: "puc_choice",
    categoryLabel: "Vehicle RTO & Testing",
    shortDescription: "Instant Parivahan-linked smoke and emission testing with digital QR-code PUC certificate generation for 2-wheelers, cars, auto-rickshaws, and commercial trucks in Miraj.",
    fullDescription: "Driving without a valid PUC certificate attracts a hefty penalty of ₹10,000 under Section 190(2) of the Motor Vehicles Act. At Aaple Motor Driving School's authorized emission testing center in Miraj, we provide computerized, camera-linked emission checks for all Petrol, Diesel, CNG, and LPG vehicles. Get your official QR-verified certificate uploaded directly to the mParivahan and DigiLocker servers within 5 minutes.",
    icon: "Gauge",
    badge: "Instant 5-Min Service",
    isPopular: true,
    estimatedTime: "5 to 10 Minutes",
    priceDisplay: "₹150 (2-Wheeler) | ₹200 (4-Wheeler)",
    inclusions: [
      "High-precision computerized multi-gas emission & smoke density testing",
      "Direct real-time sync with Central Government Parivahan Server",
      "QR-code authenticated digital printout + instant SMS delivery",
      "Instant reflection in DigiLocker and mParivahan mobile applications",
      "Free automated SMS / WhatsApp renewal reminder before expiry",
    ],
    documentsRequired: [
      "Vehicle RC Book (Physical Smart Card or DigiLocker RC)",
      "Vehicle present for exhaust sensor probe reading and live camera snap",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Vehicle Arrival & RC Scan",
        description: "Drive your vehicle to our Miraj center. Our technician scans your RC details directly into the Parivahan national portal.",
      },
      {
        stepNumber: 2,
        title: "Live Camera & Exhaust Gas Analysis",
        description: "The live high-definition camera captures your vehicle number plate while our certified sensor analyzes CO, HC, and smoke density.",
      },
      {
        stepNumber: 3,
        title: "Instant QR Certificate Generation",
        description: "Upon passing emission thresholds, the official MoRTH green certificate is printed and immediately available in your DigiLocker.",
      },
    ],
    benefits: [
      "Avoid heavy traffic police fines of up to ₹10,000",
      "Eco-friendly diagnostics to keep your engine fuel-efficient and healthy",
      "Valid all across Maharashtra and across all Indian states",
    ],
    faqs: [
      {
        question: "How long is a PUC certificate valid for a new BS6 car?",
        answer: "For newly purchased brand new vehicles, the factory PUC is valid for 1 year from registration. Subsequent BS4 and BS6 vehicles receive 1-year validity PUC certificates, whereas older vehicles generally receive 6-month validity.",
      },
    ],
  },
  {
    id: "2-wheeler-training",
    slug: "2-wheeler-training",
    name: "2-Wheeler Training (Geared & Non-Geared)",
    marathiName: "२-चाकी वाहन प्रशिक्षण (गिअर व विना-गिअर)",
    category: "training",
    categoryLabel: "Driving Training",
    shortDescription: "Master balance, throttle control, 8-figure tracks, and city road traffic on Honda Activa, Scooters, and Geared Motorcycles with patient, safety-first coaching.",
    fullDescription: "Gain unwavering two-wheeler confidence in Miraj with Aaple Motor Driving School. Whether you have never sat on a two-wheeler before or struggle with balance and heavy traffic, our step-by-step curriculum teaches you smooth acceleration, progressive braking, clutch-gear coordination, and low-speed tight turning on dedicated practice grounds before taking you onto Sangli-Miraj main roads.",
    icon: "Bike",
    badge: "Ladies Batch Available",
    isPopular: true,
    estimatedTime: "10 to 15 Days Practical Course",
    priceDisplay: "₹3,000",
    inclusions: [
      "Both Non-Geared (Scooty / Activa) and Geared (125cc-150cc bike) training",
      "Dedicated off-road private practice ground for initial balance & braking",
      "Specialized training for RTO Miraj official 8-shaped track test",
      "Defensive riding techniques, mirror usage, and blind spot awareness",
      "Pillion balance, slope stop-and-go without engine stalling",
      "Dedicated patient female instructors for lady riders",
    ],
    documentsRequired: [
      "Aadhaar Card copy",
      "2 Passport Size Photos",
      "Learner's License (We assist if you don't have one)",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Balance & Controls Orientation",
        description: "Understanding brake modulation, throttle sensitivity, foot balancing, and body posture on safe open ground.",
      },
      {
        stepNumber: 2,
        title: "Slow Speed Control & 8-Shape Track",
        description: "Mastering tight turns, Figure-8 track maneuvers, and emergency stopping without placing feet on ground.",
      },
      {
        stepNumber: 3,
        title: "Gear & Clutch Shifting (For Geared Bikes)",
        description: "Smooth upshifting, downshifting, rev matching, and half-clutch control on flyovers and steep gradients.",
      },
      {
        stepNumber: 4,
        title: "Real-World City & Highway Driving",
        description: "Navigating busy Miraj markets, roundabouts, Gandhi Chowk, night riding, and safe overtaking.",
      },
    ],
    benefits: [
      "Zero fear of falling with progressive dual-balance training method",
      "100% readiness for RTO 8-track test without putting feet down",
      "Flexible morning (6:30 AM) and evening batches",
    ],
    vehicleTypes: ["Honda Activa 6G (Non-geared)", "Hero Splendor / Honda Shine (Geared)"],
  },
  {
    id: "4-wheeler-training",
    slug: "4-wheeler-training",
    name: "4-Wheeler Training (Car Driving Course)",
    marathiName: "४-चाकी कार ड्रायव्हिंग प्रशिक्षण",
    category: "training",
    categoryLabel: "Driving Training",
    shortDescription: "Comprehensive car driving training on dual-control modern hatchbacks and sedans. Master clutch control, hill start, reverse parallel parking, and highway driving.",
    fullDescription: "Our flagship 4-Wheeler Car Driving course is designed to transform complete beginners into calm, confident, and defensive drivers. We utilize sanitized modern training cars equipped with dual controls (dual clutch & dual brake for the instructor). From day one in Miraj, you learn systematic cockpit checks, steering precision, mirror adjustment, clutch bite-point mastery, and tackling bumper-to-bumper traffic.",
    icon: "Car",
    badge: "Flagship Course",
    isPopular: true,
    estimatedTime: "15 to 21 Days (Customizable Batches)",
    priceDisplay: "₹4,000 (Includes Fuel)",
    inclusions: [
      "15 to 21 daily 1-on-1 practical driving sessions (30 to 45 mins/day)",
      "Dual-pedal safety vehicles (Maruti Swift, WagonR, Hyundai i10)",
      "Mastery of Miraj RTO test track (H-Track reverse, 8-Track, Hill-gradient stop)",
      "Crucial skills: Parallel parking, tight alley reversing, night driving & rain driving",
      "Doorstep pick and drop facility available across Miraj city areas",
      "Free basic mechanical knowledge (checking oil, coolant, tyre puncture change)",
      "Choice of morning, afternoon, evening, or weekend-only slots",
    ],
    documentsRequired: [
      "Aadhaar Card photocopy",
      "3 Passport Size Photographs",
      "Valid Learner's License (We process this prior to road sessions)",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Cockpit Drill & Foot Pedals Coordination",
        description: "Seat adjustment, mirror angles, ABC pedals (Accelerator, Brake, Clutch), gear lever familiarity, and steering 9-and-3 posture.",
      },
      {
        stepNumber: 2,
        title: "Bite-Point Clutch & Gear Progression",
        description: "Moving from 1st to 4th gear, engine braking, stopping smoothly, and reversing in straight lines on wide practice grounds.",
      },
      {
        stepNumber: 3,
        title: "RTO Ground Simulations & Parking Mastery",
        description: "Extensive drill on H-track reverse parking, 8-figure navigation, and hill-slope restart without rolling backward.",
      },
      {
        stepNumber: 4,
        title: "City Traffic & Sangli-Miraj Highway Driving",
        description: "Real-time navigation through busy bazaar roads, traffic signals, roundabouts, lane discipline, and high-speed highway etiquette.",
      },
      {
        stepNumber: 5,
        title: "RTO Final Driving Test & License Handover",
        description: "Take the official Miraj RTO driving test in our familiar school vehicle and pass with flying colors on the first attempt.",
      },
    ],
    benefits: [
      "Dual-control cars ensure 0% chance of collision or mishap during training",
      "Doorstep pick & drop saves valuable commute time for busy students & professionals",
      "Female instructors available for ladies preferring woman-led training",
    ],
    vehicleTypes: ["Maruti Suzuki Swift", "Maruti Suzuki WagonR", "Hyundai Grand i10"],
  },
  {
    id: "2-plus-4-wheeler-combo",
    slug: "2-plus-4-wheeler-combo",
    name: "2+4 Wheeler Combo Training (Car + Bike)",
    marathiName: "२+४ चाकी कम्प्लीट ड्रायव्हिंग पॅकेज (कार + बाईक)",
    category: "training",
    categoryLabel: "Driving Training",
    shortDescription: "Complete dual vehicle training package combining 4-wheeler car and 2-wheeler geared/non-geared training with RTO Miraj test track mastery.",
    fullDescription: "Get the best value and complete road mastery with our all-in-one 2-Wheeler + 4-Wheeler Combo Driving Course. Designed for beginners who want to master both two-wheelers (Honda Activa / Geared Motorcycle) and four-wheelers (Maruti Swift / WagonR / i10) simultaneously. Includes extensive practice on Miraj RTO 8-track, H-reverse track, hill starts, and city driving.",
    icon: "Car",
    badge: "Best Value Combo",
    isPopular: true,
    estimatedTime: "21 to 30 Days Practical Course",
    priceDisplay: "₹4,500 (Complete 2+4 Package)",
    inclusions: [
      "Complete 4-wheeler practical driving sessions on dual-pedal cars",
      "Complete 2-wheeler balance, throttle, and Figure-8 track training",
      "Simultaneous mock track drills at Miraj RTO ground for both classes",
      "Combined Parivahan Sarathi LL and DL test slot coordination",
      "Doorstep pickup available across Miraj city",
    ],
    documentsRequired: [
      "Proof of Age (Aadhaar Card / PAN Card / 10th LC)",
      "Proof of Address (Aadhaar Card / Electricity Bill)",
      "4 Recent Passport Size Photographs",
      "Valid Mobile Number for OTP Verification",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "LL Application (MCWG + LMV)",
        description: "We file the combined Learner License application for both Motorcycle with Gear and Light Motor Vehicle on Sarathi.",
      },
      {
        stepNumber: 2,
        title: "2-Wheeler Balancing & 8-Track",
        description: "Master low speed balancing, 8-figure turns, and emergency braking on Activa/geared bike.",
      },
      {
        stepNumber: 3,
        title: "4-Wheeler Dual-Control Road Sessions",
        description: "Learn clutch bite-point, gear shifting, hill start, and H-reverse bay on our dual-pedal cars.",
      },
      {
        stepNumber: 4,
        title: "Miraj RTO Final Test & Smart Card DL",
        description: "Appear for both practical tests on the official RTO track and receive your combo Smart Card Driving License.",
      },
    ],
    benefits: [
      "Save up to ₹2,500 compared to enrolling for both courses separately",
      "Dual license endorsement (MCWG + LMV) in a single RTO visit",
      "Flexible morning, afternoon, and evening batch slots",
    ],
    vehicleTypes: ["Maruti Suzuki Swift / WagonR", "Honda Activa 6G / Hero Splendor"],
  },
  {
    id: "heavy-vehicle-training",
    slug: "heavy-vehicle-training",
    name: "Heavy Vehicle Training (HMV / Transport DL)",
    marathiName: "अवजड वाहन प्रशिक्षण (ट्रक / बस / ट्रान्सपोर्ट)",
    category: "training",
    categoryLabel: "Driving Training",
    shortDescription: "Professional heavy commercial transport vehicle driving training for Trucks, Buses, and Multi-axle commercial vehicles with RTO badge endorsement.",
    fullDescription: "Launch a rewarding career in the commercial transport, logistics, and passenger bus sectors with our certified Heavy Motor Vehicle (HMV / TRANS) driving training in Miraj. We train students on full-size commercial trucks and buses, focusing on heavy diesel engine torque management, air brake dynamics, load center of gravity, reverse bay docking, and long-haul road safety compliance.",
    icon: "Truck",
    badge: "Commercial Career",
    isPopular: false,
    estimatedTime: "30 Days Practical & Theory Course",
    priceDisplay: "Starts at ₹8,500",
    inclusions: [
      "Commercial Truck & Bus practical training on dedicated heavy vehicle tracks",
      "Air-brake system operation and pneumatic pressure maintenance",
      "Heavy load reversing, trailer alignment, and loading dock maneuvering",
      "Hazardous cargo transportation safety rules and first-aid certification",
      "Assistance with Transport DL endorsement and Driver Badge from Miraj RTO",
    ],
    documentsRequired: [
      "Existing LMV (Car) Driving License with minimum 1-year validity",
      "Aadhaar Card and PAN Card",
      "Educational Proof (8th/10th Pass Certificate)",
      "Form 1A Medical Fitness Certificate",
      "Police Verification Clearance (For Public Badge)",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Eligibility Check & Transport LL Application",
        description: "Verify 1-year LMV vintage, file Transport Learner License application at Miraj RTO with Form 1A.",
      },
      {
        stepNumber: 2,
        title: "Pneumatic & Mechanical Systems Briefing",
        description: "Learn air brake dual-circuits, clutch booster mechanics, differential locks, and pre-trip inspection routines.",
      },
      {
        stepNumber: 3,
        title: "Heavy Track Drills & Highway Navigation",
        description: "Practice tight turns, hill climbing with heavy payload, reverse bay parking, and highway defensive driving.",
      },
      {
        stepNumber: 4,
        title: "RTO Miraj Heavy Vehicle Test & Badge Issuance",
        description: "Appear for the heavy transport practical test under RTO inspector supervision and get your HMV endorsement.",
      },
    ],
    benefits: [
      "High placement opportunity in MSRTC, logistics fleets, and private bus companies",
      "RTO authorized heavy training vehicle provided for the official test",
    ],
    vehicleTypes: ["Tata / Ashok Leyland Full-Size Commercial Training Bus & Heavy Truck"],
  },
  {
    id: "3-wheeler-training",
    slug: "3-wheeler-training",
    name: "3-Wheeler Training (Auto Rickshaw & Cargo 3W)",
    marathiName: "३-चाकी ऑटो रिक्षा व मालवाहू वाहन प्रशिक्षण",
    category: "training",
    categoryLabel: "Driving Training",
    shortDescription: "Certified 3-wheeler auto rickshaw and commercial goods carrier training. Learn handle bar maneuvering, reverse turning, meter operation, and permit rules.",
    fullDescription: "Aaple Motor Driving School offers comprehensive three-wheeler driving instruction for passenger auto rickshaws (Bajaj / Piaggio) and cargo 3-wheelers (Ape / Maxima). Our course is tailored for aspiring self-employed drivers and fleet operators in Miraj and Sangli, teaching safe narrow-street navigation, passenger safety, electronic fare meter compliance, and local RTO permit formalities.",
    icon: "CarTaxiFront",
    badge: "Self Employment",
    isPopular: false,
    estimatedTime: "10 to 15 Days",
    priceDisplay: "Starts at ₹3,000",
    inclusions: [
      "Handlebar steering control, clutch cable feel, and hand/foot brake coordination",
      "Narrow alley reversing, tight U-turns, and Miraj market maneuvering",
      "Passenger safety protocols, luggage weight balancing, and emergency stops",
      "Assistance with 3-Wheeler Transport License & Autorickshaw Driver Badge",
      "Advisory on RTO permit allotment and auto rickshaw loan schemes",
    ],
    documentsRequired: [
      "Aadhaar Card copy",
      "Proof of Age (18+ for private, 20+ for commercial)",
      "4 Passport Size Photos",
      "Medical Certificate Form 1A",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Controls & Balance Fundamentals",
        description: "Mastering hand gear shifting, twist throttle, foot brake, and hand-brake for 3-wheel stability.",
      },
      {
        stepNumber: 2,
        title: "Obstacle Course & Reverse Parking",
        description: "Navigating cones, tight reverse parking, and gradient restarts without engine cutoff.",
      },
      {
        stepNumber: 3,
        title: "Passenger Etiquette & Traffic Sessions",
        description: "Driving in Miraj city traffic with simulated passenger loads and understanding traffic signals.",
      },
      {
        stepNumber: 4,
        title: "Miraj RTO Passing & Badge Processing",
        description: "Clear the practical 3-wheeler test and obtain your commercial transport badge.",
      },
    ],
    benefits: [
      "Empowers individuals to start immediate self-employment as auto driver",
      "Guidance on government subsidies and auto rickshaw permit acquisition",
    ],
    vehicleTypes: ["Bajaj Compact Passenger Auto", "Piaggio Ape Cargo 3-Wheeler"],
  },
  {
    id: "rc-book-services",
    slug: "rc-book-services",
    name: "RC Book Services (Transfer, HP Cancel & Duplicate)",
    marathiName: "आरसी बुक सेवा (मालकी हस्तांतरण, बँक कर्ज रद्द, डुप्लिकेट)",
    category: "vehicle_rto",
    categoryLabel: "Vehicle RTO & Testing",
    shortDescription: "Complete vehicle Registration Certificate (RC) services including Ownership Transfer, Bank Loan Hypothecation Termination, Duplicate Smart RC, and State NOC.",
    fullDescription: "Avoid long queues and complicated documentation at the RTO office. Aaple Motor Driving School provides fast-track end-to-end processing for all vehicle Registration Certificate (RC) requirements for both 2-wheelers and 4-wheelers. Whether you bought/sold a pre-owned vehicle, finished your bank car loan, or lost your physical RC card, we prepare and execute all legal forms seamlessly.",
    icon: "FileText",
    badge: "All-in-One RTO",
    isPopular: true,
    estimatedTime: "7 to 20 Working Days",
    priceDisplay: "Starts at ₹1,500 + Govt Fees",
    inclusions: [
      "Vehicle Ownership Transfer (Form 29 & Form 30 preparation & online filing)",
      "Hypothecation Termination (Form 35 + Bank Loan NOC submission)",
      "Duplicate RC Smart Card processing (Form 26 + Police missing report)",
      "Inter-district & Inter-state No Objection Certificate (Form 28 NOC)",
      "Address correction in RC & Chassis/Engine pencil print verification",
    ],
    documentsRequired: [
      "Original RC Book / Smart Card (or FIR copy for duplicate RC)",
      "Seller & Buyer Aadhaar Card and PAN Card copies",
      "Valid Insurance Policy Certificate",
      "Valid PUC Certificate",
      "Bank Form 35 + NOC (for loan hypothecation removal)",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Documentation & Form Drafting",
        description: "We verify seller-buyer credentials, prepare Form 29/30/35/26, and take physical pencil impressions of the vehicle chassis number.",
      },
      {
        stepNumber: 2,
        title: "Parivahan Vahan Portal Submission",
        description: "Our RTO desk uploads your digital application, pays state treasury taxes, and secures an appointment slot.",
      },
      {
        stepNumber: 3,
        title: "RTO Miraj Scrutiny & Approval",
        description: "We represent your file before the Motor Vehicle Inspector (MVI) and Assistant RTO officer for clearance.",
      },
      {
        stepNumber: 4,
        title: "Smart Card RC Dispatched to Doorstep",
        description: "Your brand new chip-enabled Smart Card RC with updated details is safely delivered to your address.",
      },
    ],
    benefits: [
      "100% legal protection when selling vehicles — ensures buyer transfer is completed",
      "Clear your bank lien immediately upon loan closure to enable clean resale",
      "Zero visits to RTO required for most standard documentation flows",
    ],
    faqs: [
      {
        question: "Is buyer and seller physical presence mandatory at Miraj RTO for transfer?",
        answer: "With Aadhaar OTP e-Sign integration on Vahan, physical presence is generally not required for standard ownership transfers unless specifically summoned by the RTO officer for audit.",
      },
    ],
  },
  {
    id: "number-registration",
    slug: "number-registration",
    name: "Number Registration & Vehicle Passing",
    marathiName: "नवीन वाहन नंबर नोंदणी व पासिंग / फिटनेस",
    category: "vehicle_rto",
    categoryLabel: "Vehicle RTO & Testing",
    shortDescription: "Permanent RTO number plate registration, commercial vehicle annual fitness passing, Green Tax renewal, and High Security Registration Plate (HSRP) coordination.",
    fullDescription: "Ensure your vehicles are 100% road-legal and roadworthy. We assist new car/bike owners, commercial taxi operators, school buses, and goods carriers with seamless RTO registration, temporary to permanent conversion, annual vehicle fitness passing inspection at Miraj RTO ground, and mandatory HSRP laser-etched number plate installation.",
    icon: "Hash",
    badge: "RTO Compliance",
    isPopular: false,
    estimatedTime: "3 to 7 Working Days",
    priceDisplay: "Starts at ₹1,500 + Govt Taxes",
    inclusions: [
      "New vehicle temporary (CRTM) to permanent MH-10 registration",
      "Commercial vehicle annual Fitness Certificate (FC) inspection & renewal",
      "Payment of Maharashtra State Motor Vehicle Tax & Green Tax",
      "High Security Registration Plate (HSRP) booking & installation coordination",
      "Alteration in vehicle particulars (body type, seating capacity, CNG retrofit endorsement)",
    ],
    documentsRequired: [
      "Vehicle Sale Certificate (Form 21) & Road Worthiness Certificate (Form 22)",
      "Manufacturer Invoice & Valid Insurance Certificate",
      "Owner KYC (Aadhaar Card, PAN Card, Electricity Bill)",
      "Old Fitness Certificate & Tax Token (for commercial renewals)",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "File Preparation & Tax Assessment",
        description: "We audit dealer delivery documents, calculate exact state road taxes, and generate online Vahan challans.",
      },
      {
        stepNumber: 2,
        title: "Physical Vehicle Inspection at Miraj RTO",
        description: "For commercial vehicles or new passing, our team arranges the vehicle inspection on the official RTO track.",
      },
      {
        stepNumber: 3,
        title: "Permanent Number Allotment & HSRP Fitment",
        description: "Official MH-10 registration series number is allotted, followed by tamper-proof HSRP plate fitment.",
      },
    ],
    benefits: [
      "Prevents vehicle seizure and commercial license cancellation",
      "Smooth fitness renewal for auto-rickshaws, cabs, trucks, and school buses",
    ],
  },
  {
    id: "choice-number-booking",
    slug: "choice-number-booking",
    name: "Choice Number Booking (VIP / Fancy Numbers)",
    marathiName: "चॉईस नंबर बुकिंग (व्ही.आय.पी. / फॅन्सी नंबर)",
    category: "puc_choice",
    categoryLabel: "Vehicle RTO & Testing",
    shortDescription: "Consultation, catalogue exploration, and direct bidding assistance for VIP, Lucky, and Fancy vehicle registration numbers (e.g. 0001, 0007, 9999, 1111) for MH-10.",
    fullDescription: "Make your new car, SUV, or motorcycle stand out on the road with an exclusive VIP or numerology-aligned registration number. We provide complete consultancy and bidding support on the official MoRTH Fancy Number e-Auction portal for the Sangli-Miraj (MH-10) RTO series. From checking live series availability to bidding strategy and allotment orders, we handle every detail.",
    icon: "Sparkles",
    badge: "Exclusive VIP",
    isPopular: true,
    estimatedTime: "2 to 5 Days (As per RTO Series Window)",
    priceDisplay: "Consultation starts at ₹1,500 + Govt Fee",
    inclusions: [
      "Live availability lookup for current running & advance series in Miraj/Sangli (MH-10)",
      "Numerology & lucky number consultation as per your date of birth",
      "Registration & e-Auction bidding representation on Parivahan Fancy Number portal",
      "Preparation of Treasury Demand Drafts / Online RTO Fee payment challan",
      "Allotment letter generation for direct handover to your automobile dealership",
    ],
    documentsRequired: [
      "Booking Receipt / Delivery Challan of New Vehicle from Auto Dealer",
      "Owner Aadhaar Card & PAN Card",
      "Active Mobile Number for e-Auction OTP verification",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Number Selection & Availability Check",
        description: "Share your desired digits (e.g. 0001, 0007, 0009, 1212, 9999, or birthday). We check availability in current & advance MH-10 series.",
      },
      {
        stepNumber: 2,
        title: "Category Classification & Fee Determination",
        description: "Classify the number into Non-Auction Direct Allotment or e-Auction Category as per Maharashtra Transport Department notification.",
      },
      {
        stepNumber: 3,
        title: "Online Bidding / Direct Booking",
        description: "We lock the number on the Parivahan portal, deposit base reserve fee, and participate in bidding if required.",
      },
      {
        stepNumber: 4,
        title: "Allotment Letter Delivery to Showroom",
        description: "Receive the official RTO Allotment Order and submit it to your car showroom for immediate permanent number printing.",
      },
    ],
    benefits: [
      "Secure your dream VIP number before someone else reserves it",
      "100% legal RTO allotment with official government treasury receipt",
      "Avoid dealership confusion with direct expert handling",
    ],
    faqs: [
      {
        question: "Can I book a fancy number before purchasing my new vehicle?",
        answer: "Yes, you can reserve an available choice number by paying the prescribed government fee. The allotment letter is valid for 90 days, giving you ample time to complete your vehicle purchase and registration.",
      },
    ],
  },
];
