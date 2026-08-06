export const PROFILE = {
  name: 'Sigmund Godfrey M. Dela Cruz',
  firstName: 'Sigmund Godfrey',
  roles: [
    'Full Stack Web Developer',
    'Information Technology Specialist',
    'Database Designer',
    'AI-Assisted Developer',
  ],
  tagline: 'Building dynamic, user-centered web applications — with scalable systems, efficient databases, and AI-assisted development at the core.',
  location: 'Calamba, Laguna | Philippines',
  email: 'delacruzsigmund14@gmail.com',
  phone: '+63 952 480 1517',
  linkedin: 'https://www.linkedin.com/in/sigmund-godfrey-dela-cruz-a663ab352/',
  resumeDownload: '/api/resume/download',
  resumeView: '/api/resume/file',
  photo: '/assets/images/profile.jpg',
  statusPills: [
    { icon: 'fa-circle', label: 'SYSTEM ONLINE' },
    { icon: 'fa-code-branch', label: 'BRANCH: main' },
    { icon: 'fa-microchip', label: 'MODE: BUILD' },
  ],
  metrics: [
    { label: 'Builds', value: 'Web Apps & Databases', icon: 'fa-code' },
    { label: 'Interest', value: 'AI + Scalable Systems', icon: 'fa-brain' },
    { label: 'Status', value: 'Available', icon: 'fa-circle-check' },
  ],
}

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
]

export const MARQUEE_ITEMS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'PHP',
  'SQL',
  'Flask',
  'Django',
  'Flask-SQLAlchemy',
  'Tailwind CSS',
  'Pandas',
  'MySQL',
  'SQLite',
  'MSSQL',
  'Git',
  'GitHub',
  'Android Studio',
  'Figma',
]

export const ABOUT = {
  paragraphs: [
    'I am an Information Technology graduate with experience in Full-Stack Web Development, Database Management, and Software Development. I enjoy building dynamic web applications, designing efficient databases, and developing scalable solutions using modern technologies and AI-assisted development tools.',
    'I am a continuous learner who is passionate about improving technical skills and staying up to date with emerging technologies. While I enjoy diving deep into code, I also believe in working smart by leveraging AI tools to accelerate development, enhance software quality, and explore innovative solutions to complex problems.',
  ],
  education: [
    {
      logo: '/assets/images/letran.webp',
      school: 'Colegio de San Juan de Letran - Calamba',
      program: 'Bachelor of Science in Information Technology',
      years: '2022 - 2026',
      location: 'Calamba, Laguna',
    },
    {
      logo: '/assets/images/stjohn.png',
      school: 'St. John Colleges',
      program: 'Accountancy, Business and Management',
      years: '2020 - 2022',
      location: 'Calamba, Laguna',
    },
  ],
  stats: [
    { value: 5, suffix: '+', label: 'Projects Built', icon: 'fa-layer-group' },
    { value: 10, suffix: '', label: 'Certifications', icon: 'fa-award' },
    { value: 2, suffix: '', label: 'Internships', icon: 'fa-briefcase' },
    { value: 3, suffix: '+', label: 'Tech Domains', icon: 'fa-cubes' },
  ],
  whatIDo: [
    {
      icon: 'fa-globe',
      title: 'Full-Stack Development',
      desc: 'End-to-end web applications with clean, responsive front-ends and robust back-ends.',
    },
    {
      icon: 'fa-database',
      title: 'Database Design',
      desc: 'Efficient relational schemas, normalized data models, and secure query patterns.',
    },
    {
      icon: 'fa-robot',
      title: 'AI-Assisted Workflows',
      desc: 'Leveraging AI to accelerate builds, sharpen code quality, and solve complex problems.',
    },
  ],
}

export const EXPERIENCE = [
  {
    logos: ['/assets/images/pnp.png', '/assets/images/maritime.png'],
    company: 'Philippine National Police - Maritime Group',
    role: 'Internship — Full Stack Web Developer',
    date: 'Feb - May 2026',
    location: 'Camp Crame, Quezon City',
    summary:
      'During my internship at the PNP Maritime Group, I contributed to the design, development, and implementation of the Maritime Vessel Inventory System (MVIS) and the PRS Memo Tracking System. I worked on both front-end and back-end development, helping create user-friendly interfaces, manage database operations, and implement system functionalities that improved the efficiency of vessel inventory management and memo tracking processes.',
    detail:
      'This experience strengthened my skills in full-stack web development, database management, system analysis, troubleshooting, and collaborative software development within a professional environment.',
    highlights: [
      'Co-developed MVIS — a nationwide vessel inventory & PMS tracking platform',
      'Built the PRS Memo Tracking System for internal memo distribution',
      'Managed database operations and system functionality implementation',
    ],
  },
  {
    logos: ['/assets/images/accenture.png'],
    company: 'Accenture Academy',
    role: 'Trainee',
    date: 'Feb - May 2026',
    location: 'Remote',
    summary:
      'Successfully completed Accenture\u2019s training program focused on modern software development and cloud technologies. The program covered AI-assisted development using GitHub Copilot, database management with SQL, application development using C# and ASP.NET Core, Azure Cloud services, and DevOps fundamentals.',
    detail:
      'Through hands-on exercises and practical learning activities, I gained experience in building and deploying applications, utilizing AI tools to enhance productivity, managing databases, and applying cloud and DevOps practices to support efficient software development workflows.',
    highlights: [
      'AI-assisted development with GitHub Copilot',
      'C# / ASP.NET Core application development',
      'Azure Cloud services & DevOps fundamentals',
    ],
  },
]

export const PROJECTS = [
  {
    id: 'portify',
    title: 'Portify — A Multi-User Portfolio CMS',
    shortTitle: 'Portify',
    date: 'Aug 2026',
    category: 'SaaS · CMS',
    cover: '/projects/PORTIFY/1.png',
    gallery: Array.from({ length: 10 }, (_, i) => `/projects/PORTIFY/${i + 1}.png`),
    github: '',
    demo: 'https://port-ify.vercel.app',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS 4', 'Zod', 'Auth', 'RBAC'],
    description: [
      'Portify is a production-ready, no-code portfolio builder that lets anyone create and publish a personal site in minutes. Users sign up, pick a theme (Modern, Minimal, or Creative), and manage their content through a full dashboard CMS — profile info, projects with image uploads, skills, experience, education, and section ordering. Each user gets a live public portfolio at /portfolio/<username> with real-time view tracking, per-project analytics, a contact inbox, resume PDF export, and a preview mode to see changes before publishing. It also includes a landing page, email/password auth, an admin panel for moderation, and SEO metadata per user.',
      'I built the full-stack CRUD dashboard using server actions, validation, and optimistic-free forms; three fully responsive portfolio themes with animations; analytics (views over time, project counters) powered by Postgres; file uploads to Supabase Storage with RLS-secured folders; role-based access control (user/admin), route protection, and rate limiting. The app is deployed and configured for production on Vercel and Supabase, with CI/CD via GitHub.',
      'Through this project, I deepened my skills in full-stack development with Next.js and server actions, database design with PostgreSQL, authentication and authorization, cloud storage with RLS, and deploying multi-tenant SaaS applications to production.',
    ],
  },
  {
    id: 'mvis',
    title: 'Maritime Vessel Inventory System',
    shortTitle: 'Maritime Vessel Inventory System',
    date: 'April 2026',
    category: 'Enterprise Web App',
    cover: '/projects/MVIS/1.jpg',
    gallery: Array.from({ length: 8 }, (_, i) => `/projects/MVIS/${i + 1}.jpg`),
    tags: ['Full-Stack', 'Inventory', 'PMS Monitoring', 'Database Design', 'Reporting'],
    description: [
      'The Maritime Vessel Inventory System (MVIS) is a comprehensive inventory and maintenance management system developed during my internship at the Philippine National Police (PNP) Maritime Group. The system was designed to monitor and manage vessel parts, equipment, and Preventive Maintenance Services (PMS) across maritime units and regional offices nationwide.',
      'MVIS centralizes inventory records, streamlines asset tracking, and monitors maintenance schedules and repair activities to ensure operational readiness. The system provides accurate reporting and real-time visibility of vessel resources, enabling more efficient asset management, maintenance planning, and decision-making throughout the organization.',
      'Through this project, I gained valuable experience in full-stack web development, database design, system analysis, and the development of enterprise-level solutions that support large-scale operational processes.',
    ],
  },
  {
    id: 'memo',
    title: 'PRS Memo Tracking System',
    shortTitle: 'PRS Memo Tracking System',
    date: 'March 2026',
    category: 'Document Management',
    cover: '/projects/MEMO/1.jpg',
    gallery: Array.from({ length: 4 }, (_, i) => `/projects/MEMO/${i + 1}.jpg`),
    tags: ['Full-Stack', 'Document Tracking', 'Workflow', 'Database Management'],
    description: [
      'The PRS Memo Tracking System is a web-based document management and tracking solution developed for the Philippine National Police (PNP) Maritime Group. The system was designed to streamline the distribution, monitoring, and management of internal memoranda across departments and offices.',
      'By centralizing memo records and automating tracking processes, the system improves document visibility, enhances information accuracy, and enables efficient monitoring of memo status throughout its lifecycle. It helps reduce delays in communication, supports better workflow management, and ensures that important documents are properly tracked and accessible when needed.',
      'Through this project, I strengthened my skills in full-stack web development, database management, system design, and the development of solutions that improve organizational efficiency and document control processes.',
    ],
  },
  {
    id: 'capstone',
    title: 'AI-Driven Transaction Processing System for ISO Documentation',
    shortTitle: 'AI-Driven ISO Documentation System',
    date: 'Dec 2025',
    category: 'Capstone · AI Integration',
    cover: '/projects/CAPSTONE/Screenshot_2026-06-13_185847.png',
    gallery: [
      '/projects/CAPSTONE/Screenshot_2026-06-13_185847.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_185853.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_185858.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_185911.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_185924.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_185936.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_185950.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_185957.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_190003.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_190020.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_190026.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_190032.png',
      '/projects/CAPSTONE/Screenshot_2026-06-13_190040.png',
    ],
    tags: ['Python', 'Flask', 'AI Integration', 'RBAC', 'Digital Signatures', 'ISO 21001:2025'],
    description: [
      'This capstone project is a web-based transaction processing system designed to automate ISO 21001:2025 documentation workflows at Colegio de San Juan de Letran Calamba. The system streamlines document management processes by integrating role-based access control, secure electronic signatures, and AI-powered content evaluation features.',
      'The platform utilizes artificial intelligence to analyze document content, identify redundancies, and support compliance with ISO standards, helping improve document quality, consistency, and audit readiness. By digitizing and automating documentation workflows, the system enhances operational efficiency, reduces manual processing, and supports effective quality management practices across the institution.',
      'Through this project, I applied my skills in full-stack web development, database design, system analysis, artificial intelligence integration, and software engineering to develop a solution that addresses real-world organizational and compliance challenges.',
    ],
  },
  {
    id: 'kiosk',
    title: 'KIOSK Machine Project',
    shortTitle: 'KIOSK Machine',
    date: 'Dec 2024',
    category: 'Desktop Application',
    cover: '/projects/KIOSK/Screenshot_2026-06-13_032327.png',
    gallery: [
      '/projects/KIOSK/Screenshot_2026-06-13_032327.png',
      '/projects/KIOSK/Screenshot_2026-06-13_032336.png',
      '/projects/KIOSK/Screenshot_2026-06-13_032344.png',
      '/projects/KIOSK/Screenshot_2026-06-13_032354.png',
      '/projects/KIOSK/Screenshot_2026-06-13_032400.png',
      '/projects/KIOSK/Screenshot_2026-06-13_032409.png',
      '/projects/KIOSK/Screenshot_2026-06-13_032415.png',
    ],
    tags: ['Java', 'Java Swing', 'MySQL', 'GUI', 'Transactions'],
    description: [
      'The KIOSK Machine Project is an interactive self-service food ordering application developed using Java Swing and MySQL. The system was designed to provide customers with a convenient and efficient way to browse menu items, place orders, and complete transactions through an intuitive graphical user interface.',
      'The application integrates a database-driven architecture to manage menu information, customer orders, and transaction records, ensuring accurate and reliable data processing. By automating the ordering process, the system improves operational efficiency, reduces manual errors, and enhances the overall user experience.',
      'Through this project, I strengthened my skills in Java application development, graphical user interface (GUI) design, database management, and the implementation of transaction processing systems.',
    ],
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot App',
    shortTitle: 'AI Chatbot App',
    date: 'Sept 2023',
    category: 'Mobile · AI',
    cover: '/projects/CHATBOT/Screenshot_2026-06-13_211454.png',
    gallery: [
      '/projects/CHATBOT/Screenshot_2026-06-13_211454.png',
      '/projects/CHATBOT/Screenshot_2026-06-13_211520.png',
      '/projects/CHATBOT/Screenshot_2026-06-13_211603.png',
    ],
    tags: ['Android Studio', 'OpenAI GPT-4 API', 'NLP', 'Mobile UI'],
    description: [
      'The AI Chatbot App is an Android-based conversational application developed using Android Studio. It is integrated with the OpenAI GPT-4 API to deliver intelligent, context-aware, and human-like responses in real time.',
      'The application features a mobile-friendly interface that enables smooth user interaction and supports natural language processing (NLP) capabilities for answering queries, assisting users, and generating dynamic conversational outputs. By leveraging artificial intelligence, the chatbot enhances user engagement and provides instant, relevant responses to various inputs.',
      'Through this project, I gained hands-on experience in Android development, API integration, natural language processing, and building AI-powered mobile applications.',
    ],
  },
]

export const SKILLS = {
  featured: [
    { icon: 'devicon-html5-plain colored', name: 'HTML' },
    { icon: 'devicon-css3-plain colored', name: 'CSS' },
    { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
    { icon: 'devicon-python-plain colored', name: 'Python' },
    { icon: 'devicon-java-plain colored', name: 'Java' },
    { icon: 'devicon-cplusplus-plain colored', name: 'C++' },
    { icon: 'devicon-php-plain colored', name: 'PHP' },
    { icon: 'fas fa-database', name: 'SQL' },
    { icon: 'devicon-flask-original', name: 'Flask' },
    { icon: 'devicon-django-plain colored', name: 'Django' },
    { icon: 'devicon-mysql-original colored', name: 'MySQL' },
    { icon: 'devicon-tailwindcss-original colored', name: 'Tailwind CSS' },
    { icon: 'devicon-react-original colored', name: 'ReactJS' },
    { icon: 'devicon-nextjs-original colored', name: 'Next.js' },
    { icon: 'devicon-nodejs-plain colored', name: 'Node.js' },
    { icon: 'devicon-git-plain colored', name: 'Git' },
  ],
  categories: [
    {
      icon: 'fa-code',
      title: 'Programming Languages',
      tags: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++', 'PHP', 'SQL'],
    },
    {
      icon: 'fa-cubes',
      title: 'Frameworks & Libraries',
      tags: ['ReactJS', 'Next.js', 'Node.js', 'Flask', 'Django', 'Flask-SQLAlchemy', 'Tailwind CSS', 'Pandas', 'Android SDK'],
    },
    {
      icon: 'fa-database',
      title: 'Databases',
      tags: ['MySQL', 'SQLite', 'Microsoft SQL Server (MSSQL)'],
    },
    {
      icon: 'fa-shield-halved',
      title: 'Security & Cryptography',
      tags: [
        'Authentication & Authorization',
        'Role-Based Access Control (RBAC)',
        'Data Encryption',
        'Password Hashing',
        'Digital Signatures',
        'Cryptography (Python)',
      ],
    },
    {
      icon: 'fa-file-lines',
      title: 'Document Processing',
      tags: ['PDF Generation & Manipulation', 'Digital PDF Signing'],
    },
    {
      icon: 'fa-cloud',
      title: 'Cloud & APIs',
      tags: [
        'RESTful API Development',
        'Secure File Storage Systems',
        'File Upload/Download via HTTP APIs',
      ],
    },
    {
      icon: 'fa-toolbox',
      title: 'Tools & Platforms',
      tags: ['Git', 'GitHub', 'Android Studio', 'VS Code', 'NetBeans', 'XAMPP', 'Figma'],
    },
    {
      icon: 'fa-laptop-code',
      title: 'Core Development',
      tags: ['Full-Stack Web Development', 'Database Design', 'Software Testing & Debugging'],
    },
    {
      icon: 'fa-robot',
      title: 'AI-Assisted Development',
      tags: ['Prompt Engineering', 'AI-Assisted Coding', 'AI Workflow Integration'],
    },
    {
      icon: 'fa-people-group',
      title: 'Soft Skills',
      tags: [
        'Problem-Solving',
        'Communication',
        'Teamwork',
        'Adaptability',
        'Continuous Learning',
        'Attention to Detail',
      ],
    },
  ],
}

export const CERTIFICATIONS = [
  {
    image: '/documents/cert/accenture-technology-academy.JPG',
    title: 'Accenture Technology Academy',
    issuer: 'Accenture',
    date: 'May 2026',
    viewable: true,
  },
  {
    image: '/documents/cert/it-specialist-device-configuration-and-management.png',
    title: 'Device Configuration and Management',
    issuer: 'Certiport',
    date: 'Jan 2026',
    verify: 'https://www.credly.com/badges/e505406c-1413-45e3-9204-7a3f22e3ec75/public_url',
  },
  {
    image: '/documents/cert/it-specialist-java.png',
    title: 'Java',
    issuer: 'Certiport',
    date: 'Jan 2025',
    verify: 'https://www.credly.com/badges/33faff6c-028b-4eb0-8631-7fa639348037/public_url',
  },
  {
    image: '/documents/cert/it-specialist-html5-application-development.png',
    title: 'HTML5 Application Development',
    issuer: 'Certiport',
    date: 'May 2024',
    verify: 'https://www.credly.com/badges/bbb50d97-9b9d-4537-ac94-b405835ab863/public_url',
  },
  {
    image: '/documents/cert/it-specialist-databases.png',
    title: 'Databases',
    issuer: 'Certiport',
    date: 'Jan 2024',
    verify: 'https://www.credly.com/badges/6056a54d-b5b7-4594-978d-4783d2434aa7/public_url',
  },
  {
    image: '/documents/cert/microsoft-office-specialist-excel-associate-office-2019.png',
    title: 'Microsoft Office Specialist: Excel Associate',
    issuer: 'Certiport',
    date: 'Jan 2023',
    verify: 'https://www.credly.com/badges/7af061f0-f35c-46a9-b778-18bfa08a8ead/public_url',
  },
  {
    image: '/documents/cert/introduction-to-data-science.png',
    title: 'Introduction to Data Science',
    issuer: 'Cisco',
    date: 'June 2026',
    verify: 'https://www.credly.com/badges/5d44b447-0262-445d-b6d6-9cb66c4109bb/public_url',
  },
  {
    image: '/documents/cert/data-science-essentials-with-python.png',
    title: 'Data Science Essentials With Python',
    issuer: 'Cisco',
    date: 'June 2026',
    verify: 'https://www.credly.com/badges/9bb3ca45-f153-4847-9e26-841f99ca40b6/public_url',
  },
  {
    image: '/documents/cert/data-analytics-essentials.png',
    title: 'Data Analytics Essentials',
    issuer: 'Cisco',
    date: 'June 2026',
    verify: 'https://www.credly.com/badges/6d9d8327-7d04-4d4f-8d44-701be94f4d40/public_url',
  },
  {
    image: '/documents/cert/python-essentials-1.1.png',
    title: 'Python Essentials I',
    issuer: 'Cisco',
    date: 'June 2026',
    verify: 'https://www.credly.com/badges/5ccea955-8bb1-4a15-9474-4dec021edf4d/public_url',
  },
  {
    image: '/documents/cert/python-essentials-2.png',
    title: 'Python Essentials II',
    issuer: 'Cisco',
    date: 'June 2026',
    verify: 'https://www.credly.com/badges/806e58a2-09c8-4f24-8e13-17fe7968e680/public_url',
  },
]

export const CONTACT = {
  intro: [
    "I'm currently open to full-time roles and freelance projects in Full-Stack Web Development and AI-assisted application development.",
    "If you're looking for a developer who enjoys building scalable systems, solving real-world problems, and working with modern technologies, feel free to reach out.",
  ],
  details: [
    {
      icon: 'fab fa-linkedin',
      label: 'LinkedIn',
      value: 'Sigmund Godfrey Dela Cruz',
      href: 'https://www.linkedin.com/in/sigmund-godfrey-dela-cruz-a663ab352/',
    },
    {
      icon: 'fas fa-envelope',
      label: 'Email',
      value: 'delacruzsigmund14@gmail.com',
      href: 'mailto:delacruzsigmund14@gmail.com',
    },
    {
      icon: 'fas fa-phone',
      label: 'Phone',
      value: '+63 952 480 1517',
      href: 'tel:+639524801517',
    },
    {
      icon: 'fas fa-map-marker-alt',
      label: 'Location',
      value: 'Calamba, Laguna | Philippines',
    },
  ],
}
