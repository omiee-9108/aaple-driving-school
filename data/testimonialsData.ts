export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  serviceUsed: string;
  comment: string;
  avatarPlaceholder: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Pooja Kulkarni",
    role: "Software Engineer",
    location: "Gandhi Chowk, Miraj",
    rating: 5,
    date: "2 weeks ago",
    serviceUsed: "4-Wheeler Training & License",
    comment: "I was extremely nervous about driving a car in Miraj traffic, but the lady instructor at Aaple Motor Driving School was so patient! Within 15 days, my fear vanished. The practice on the Miraj RTO ground helped me pass the H-track and 8-track test on the very first try. Highly recommend to all women learners in Miraj!",
    avatarPlaceholder: "PK",
  },
  {
    id: "test-2",
    name: "Dr. Sachin Patil",
    role: "Medical Practitioner",
    location: "Civil Hospital Road, Miraj",
    rating: 5,
    date: "1 month ago",
    serviceUsed: "Renew Old Driving License & Form 1A",
    comment: "My driving license had expired over a year ago and I had zero time to visit the RTO office due to hospital duties. The team at Aaple Motor Driving School arranged the Form 1A medical verification and handled the entire Sarathi renewal online. I received my new Smart Card DL at my clinic within 10 days.",
    avatarPlaceholder: "SP",
  },
  {
    id: "test-3",
    name: "Aniket Shinde",
    role: "College Student (Willingdon College)",
    location: "Sangli-Miraj Road",
    rating: 5,
    date: "3 weeks ago",
    serviceUsed: "New Driving License (2W & 4W)",
    comment: "Best driving school in Sangli-Miraj district! Their online mock test app made the computer LL test super easy (scored 15/15). The dual-control Maruti Swift training cars are well-maintained and instructors teach real defensive driving tricks. Got my permanent Smart Card DL without paying any extra middleman fee.",
    avatarPlaceholder: "AS",
  },
  {
    id: "test-4",
    name: "Sunita Deshmukh",
    role: "Homemaker",
    location: "Shivaji Nagar, Miraj",
    rating: 5,
    date: "1 month ago",
    serviceUsed: "2-Wheeler Training (Activa)",
    comment: "At the age of 42, I finally learned how to ride a scooty thanks to Aaple Driving School. They provided flexible afternoon batch timings and special ground training for balance and braking. Now I comfortably drop my kids to school every day. Truly grateful!",
    avatarPlaceholder: "SD",
  },
  {
    id: "test-5",
    name: "Vikram Jadhav",
    role: "Business Owner",
    location: "Kupwad MIDC, Miraj",
    rating: 5,
    date: "2 months ago",
    serviceUsed: "RC Book Transfer & Choice Number",
    comment: "Bought a pre-owned Creta and also wanted a lucky choice number (9999) for my new car. Aaple Motor Driving School handled the RC ownership transfer from Kolhapur RTO to Miraj MH-10 and secured my choice number smoothly. Professional, prompt, and trustworthy.",
    avatarPlaceholder: "VJ",
  },
  {
    id: "test-6",
    name: "Mahesh Gaikwad",
    role: "Commercial Driver",
    location: "Station Road, Miraj",
    rating: 5,
    date: "2 months ago",
    serviceUsed: "Heavy Vehicle (HMV) Training",
    comment: "I completed my heavy vehicle commercial bus training here. The instructors have 20+ years of road experience and teach practical air-brake handling and steep gradient control. Cleared the RTO transport badge test smoothly and got a job at a logistics company immediately.",
    avatarPlaceholder: "MG",
  },
];
