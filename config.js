/**
 * Portfolio Configuration
 * Central config for API endpoints and app settings
 */

const CONFIG = {
  // Backend API base URL - change for production
  API_BASE_URL: window.location.origin.includes('localhost')
    ? 'http://localhost:5000/api'
    : '/api',

  // Contact form endpoint
  CONTACT_ENDPOINT: '/contact',

  // Typewriter texts for hero section
  TYPEWRITER_TEXTS: [
    'ANSHIKA TOMAR',
    'SOFTWARE ENGINEER',
    'AI ENTHUSIAST',
    'WEB DEVELOPER',
  ],

  // Skills data - grouped by category
  SKILLS: {
    frontend: {
      title: 'Frontend',
      icon: '🖥️',
      skills: [
        { name: 'HTML', percentage: 90 },
        { name: 'CSS', percentage: 73 },
        { name: 'JavaScript', percentage: 74 },
        { name: 'React.js', percentage: 80 },
        { name: 'Next.js', percentage: 75 },
        { name: 'Tailwind CSS', percentage: 85 }
      ],
    },
    backend: {
      title: 'Backend & Languages',
      icon: '⚙️',
      skills: [
        { name: 'C Language', percentage: 83 },
        { name: 'C++', percentage: 60 },
        { name: 'Python', percentage: 85 },
        { name: 'Java', percentage: 90 },
        { name: 'Node.js', percentage: 80 },
        { name: 'Express.js', percentage: 72 },
        { name: 'REST API', percentage: 75 }
      ],
    },
    database: {
      title: 'Database',
      icon: '🗄️',
      skills: [
        { name: 'MySQL', percentage: 82 },
       
        { name: 'MongoDB', percentage: 80 }
      ],
    },
    Aiml: {
      title: 'AI / ML',
      icon: '🤖',
      skills: [
        { name: 'Python', percentage: 85 },
        { name: 'Pandas', percentage: 75 },
        { name: 'NumPy', percentage: 75 },
        { name: 'Scikit-Learn', percentage: 70 },
        { name: 'TensorFlow (Basic)', percentage: 65 }
      ]
    },
    tools: {
      title: 'Tools & Concepts',
      icon: '🛠️',
      skills: [
        { name: 'DSA', percentage: 78 },
        { name: 'OOPS', percentage: 74 },
        { name: 'Software Engineering', percentage: 85 },
        { name: 'OS', percentage: 80 },
        { name: 'Git & GitHub', percentage: 73 },
        { name: 'Docker(Basic)', percentage: 73 }
      ],
    },
  },
           
  // Projects data
  PROJECTS: [
    {
      title: "Elira – The Virtual Assistant",
      subtitle: "AI Voice Assistant with Bilingual Interaction",
      description: "Developed an AI-based virtual assistant supporting Hindi/English voice interaction with real-time conversational responses. Integrated OpenAI API, speech-to-text and text-to-speech achieving 1.5 sec response latency. Enhanced media search via Cloudinary and YouTube API.",
     image: "assests/project1.jpeg",
     category: ["web","desktop","backend"],
      
      tech: ["React", "Tailwind", "OpenAI API", "Cloudinary"],
      liveUrl: "https://elira-the-virtual-assistant.onrender.com/",
      githubUrl: "https://github.com/AnshikA3123/Elira-The-Virtual-Assistant",
      features: [
        "Bilingual Voice Support (Hindi/English)",
        "Real-time AI responses",
        "Speech-to-text & Text-to-speech integration",
        "Media search with Cloudinary",
        "Responsive UI with React"
      ]
      
    },
    
    {
      title: "AI DSA Chatbot Application",
      subtitle: "Full Stack AI Learning Assistant",
      description: "Built a full-stack web application that explains Data Structures and Algorithms using AI. Integrated Google Gemini API for intelligent responses. Implemented Node.js/Express backend and deployed frontend on GitHub Pages and backend on Render.",
      image: "assests/ai-Chatbot.jpeg",
      category: ["backend","web","desktop"],
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Gemini API"],
      liveUrl: "https://anshika3123.github.io/DSA-Instructor/",
      githubUrl: "https://github.com/AnshikA3123/DSA-Instructor",
      features: [
        "AI-powered DSA explanations",
        "Google Gemini API integration",
        "Node.js & Express backend",
        "Deployed on Render",
        "Responsive frontend"
      ]
      
    },
    {
      id: 1,
      title: 'Store Revenue & Stock Prediction System SYSMART',
      subtitle: 'Inspired by Walmart',
      description: 'Built a smart retail analytics system using machine learning to predict product stock levels, forecast revenue, and identify profitable inventory patterns. The model helps optimize stock management and increase overall profitability.',
      features: [
        'ML-based stock level prediction',
        'Revenue forecasting',
        'Inventory pattern analysis',
        'Profit optimization insights',
      ],
      
      image: 'https://cdn.prod.website-files.com/67e8162aa3aa62e0550fb01b/68441ede299086a78705e79e_d72d13ea-e724-4062-b195-647df8892870.jpg',
      tech: ['Machine Learning', 'Python', 'Data Analytics'],
      category: ['ml','backend'],
      liveUrl: 'https://github.com/AnshikA3123/project',
      githubUrl: 'https://github.com/AnshikA3123/project',
    },

    {
      id: 2,
      title: 'Hospital Management System',
      subtitle: 'OOPs-Based Desktop Application',
      description: 'A fully functional hospital management system built using core Object-Oriented Programming principles. The application streamlines hospital operations by managing patient records, department details, doctor and staff information, room allocation, appointments, and billing—all in a single integrated system.',
      features: [
        'Patient records management',
        'Department & staff tracking',
        'Room allocation system',
        'Appointments scheduling',
        'Billing integration',
      ],
      image: 'https://cdn.prod.website-files.com/67e8162aa3aa62e0550fb01b/684440c405639d4a437c9a1b_Screenshot%202025-06-07%20190732.jpg',
      tech: ['Java', 'OOP', 'Desktop App'],
      category: 'desktop',
      liveUrl: 'https://github.com/AnshikA3123/hospital-management-project',
      githubUrl: 'https://github.com/AnshikA3123/hospital-management-project',
    },

    {
      id: 3,
      title: 'Portfolio Website',
      subtitle: 'Full-Stack Developer Portfolio',
      description: 'A modern, responsive portfolio built with vanilla JavaScript, featuring smooth animations, dark/light mode, and a Node.js backend with MongoDB for contact form integration.',
      features: [
        'Responsive design',
        'Dark/Light mode',
        'Contact form with backend',
        'Admin panel for messages',
        'SEO optimized',
      ],
      image: 'https://cdn.prod.website-files.com/67e8162aa3aa62e0550fb01b/67e8c5a8b85d1d23576ab0b3_image-removebg-preview%20(1).png',
      tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
      category: 'desktop',
      liveUrl: window.location.origin,
      githubUrl: '#',
    },
  ],
}
