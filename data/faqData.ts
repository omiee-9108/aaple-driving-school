export interface FAQItem {
  id: string;
  category: 'general' | 'license' | 'training' | 'documents' | 'vehicle_rto';
  categoryLabel: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    category: "license",
    categoryLabel: "License & RTO Rules",
    question: "What is the complete process to get a permanent Driving License in Miraj?",
    answer: "The process is 5 simple steps: (1) Apply for Learner's License (LL) with KYC documents on the Sarathi portal. (2) Clear the 15-question computerized road safety test to receive your digital LL. (3) Complete practical driving training during the mandatory 30-day waiting window. (4) Appear for the practical track test (H-track, 8-track, gradient start) at Miraj RTO ground with our dual-control car. (5) Pass the test and receive your official chip-embedded Smart Card DL dispatched to your address by India Post.",
  },
  {
    id: "faq-2",
    category: "license",
    categoryLabel: "License & RTO Rules",
    question: "What is the validity of a Learner's License (LL) and when can I apply for the permanent test?",
    answer: "A Learner's License is valid across India for 6 months (180 days) from the date of issuance. You are legally eligible to book and appear for your permanent driving test after completing 30 days from the LL issuance date.",
  },
  {
    id: "faq-3",
    category: "documents",
    categoryLabel: "Documents Required",
    question: "What documents are required to enroll for a driving license or car driving course?",
    answer: "You will need: (1) Proof of Identity & Age (Aadhaar Card, PAN Card, or 10th School Leaving Certificate/Passport), (2) Proof of Current Address (Aadhaar Card, Electricity Bill, or Registered Rent Agreement), (3) 4 recent passport size color photographs with white background, (4) Blood group report or self-declaration, and (5) Mobile number linked to Aadhaar for OTP verification.",
  },
  {
    id: "faq-4",
    category: "training",
    categoryLabel: "Driving Training & Batches",
    question: "Do you have dedicated lady instructors for female students in Miraj?",
    answer: "Yes, absolutely! We have certified, patient, and friendly female driving instructors available for lady students who prefer learning in a comfortable, supportive environment. We also offer special afternoon and weekend batch slots for homemakers and working women.",
  },
  {
    id: "faq-5",
    category: "training",
    categoryLabel: "Driving Training & Batches",
    question: "What are your daily training batch timings? Can I choose morning or evening slots?",
    answer: "We offer flexible training hours 7 days a week from 6:30 AM to 8:30 PM. Batches run throughout the day: Morning (6:30 AM – 10:00 AM), Afternoon (11:00 AM – 3:00 PM), and Evening (4:00 PM – 8:30 PM). You can select a fixed daily time slot that fits your schedule.",
  },
  {
    id: "faq-6",
    category: "training",
    categoryLabel: "Driving Training & Batches",
    question: "Are your training cars equipped with dual controls (dual brake and clutch)?",
    answer: "Yes, 100% of our training fleet (Maruti Swift, WagonR, Hyundai i10) is fitted with government-certified dual-control pedal systems. The instructor seated next to you has full auxiliary control over the clutch and brake pedals, ensuring total safety and preventing accidental collisions.",
  },
  {
    id: "faq-7",
    category: "training",
    categoryLabel: "Driving Training & Batches",
    question: "Do you offer doorstep pick-up and drop-off service in Miraj and Sangli?",
    answer: "Yes, we provide doorstep pick-up and drop-off across major residential areas in Miraj city (Shivaji Nagar, Gandhi Chowk, Station Road, Brahman Puri, Market Yard, Kupwad link road) for our comprehensive 4-wheeler training courses.",
  },
  {
    id: "faq-8",
    category: "license",
    categoryLabel: "License & RTO Rules",
    question: "My driving license expired over a year ago. Do I need to give the driving test again?",
    answer: "Under current Central Motor Vehicle Rules, if your driving license has expired for more than 1 year, the RTO portal mandates a practical driving competency test. Aaple Motor Driving School helps you prepare with mock track test sessions so you clear the RTO evaluation effortlessly.",
  },
  {
    id: "faq-9",
    category: "vehicle_rto",
    categoryLabel: "Vehicle RC & PUC",
    question: "How long does a vehicle RC transfer take, and do both buyer and seller need to visit the RTO?",
    answer: "With Aadhaar e-Sign verification on the Vahan portal, physical visits are generally not required for standard RC transfers. Typical processing time is 10 to 15 working days, after which the updated Smart Card RC is dispatched directly to the buyer's home address.",
  },
  {
    id: "faq-10",
    category: "vehicle_rto",
    categoryLabel: "Vehicle RC & PUC",
    question: "Can I get an instant online PUC certificate at your center in Miraj?",
    answer: "Yes! Our computerised PUC testing station is directly linked to the Central Ministry Parivahan database. Within 5 minutes of emission testing, your digital QR-code certificate is generated and instantly reflected in DigiLocker and mParivahan apps.",
  },
  {
    id: "faq-11",
    category: "vehicle_rto",
    categoryLabel: "Vehicle RC & PUC",
    question: "How does Choice Number / VIP number booking work for Sangli-Miraj (MH-10)?",
    answer: "We monitor live and upcoming MH-10 series releases on the Parivahan portal. Depending on your choice (e.g. 0001, 0009, 9999, 1111, 1212 or custom birthday digits), we assist you with bidding strategy, reserve price payment, and obtaining the official allotment letter to hand over to your car dealer.",
  },
];
