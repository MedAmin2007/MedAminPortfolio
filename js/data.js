// All content lives here. Placeholders are marked [PLACEHOLDER] or "Example".
window.SITE = {
  profile: {
    name: 'Mohamed Amin',
    status: 'First-year student',
    location: 'Tunisia',
    school: 'ISSAT Mahdia',
    schoolUrl: 'https://issatmh.rnu.tn/',
    track: 'SITC — Systèmes Intelligents, Télécommunications et Cybersécurité',
    email: 'your.email@example.com',                       // [PLACEHOLDER]
    github: 'https://github.com/your-username',            // [PLACEHOLDER]
    linkedin: 'https://linkedin.com/in/your-username'      // [PLACEHOLDER]
  },

  terminal: [
    ['whoami', 'mohamed-amin'],
    ['cat education.txt', 'Licence TIC · SITC · ISSAT Mahdia (2026–2030)'],
    ['cat focus.txt', 'cybersecurity · networks · embedded · IoT · AI'],
    ['cat status.txt', 'learning, building, documenting']
  ],

  knowledgeMap: [
    ['Cybersecurity', 'The direction'], ['Networks', 'TCP/IP, routing'], ['Telecommunications', 'Transmission, mobile, fiber'],
    ['Programming', 'C, Python, web'], ['Computer Systems', 'OS, Linux'], ['Embedded Systems', 'Microcontrollers'],
    ['IoT', 'Connected devices'], ['Cloud', 'Services, containers'], ['Artificial Intelligence', 'ML, deep learning']
  ],

  years: [
    ['2026', 'Licence SITC — Year 1', 'Mathematics, C, Python, electronics, physics and operating systems.'],
    ['2027', 'Programming, systems, networks', 'Advanced programming, databases, data transmission, signal processing, VHDL.'],
    ['2028', 'Cybersecurity, AI, IoT, cloud', 'Cryptography, security fundamentals, machine learning, microcontrollers, routing.'],
    ['2029', 'Advanced security, telecom, PFE', 'Ethical hacking, next-generation networks, fiber optics, blockchain, final project.'],
    ['2030', 'Graduation', 'Licence completed; next step is a Master\'s degree abroad.']
  ],

  semesters: [
    { id: 'S1', groups: [['Mathematics', ['Analyse 1', 'Algèbre 1']], ['Physics', ['Optique géométrique et instruments', 'Électrostatique et magnétostatique']], ['Programming', ['Algorithmique et programmation (C)', 'Atelier de programmation (Python)']], ['Electronics & logic', ['Électronique numérique', 'Circuits électriques']], ['Transversal', ['Étudier à l\'université', 'Français professionnel', 'Outils IA académiques']]] },
    { id: 'S2', groups: [['Mathematics', ['Analyse 2', 'Algèbre 2']], ['Physics', ['Semi-conducteurs et composants', 'Électromagnétisme']], ['Programming & systems', ['Programmation avancée', 'Systèmes d\'exploitation']], ['Electronics', ['Électronique analogique', 'Fonctions électroniques numériques']], ['Transversal', ['Apprendre à apprendre', 'Français professionnel', 'Anglais']]] },
    { id: 'S3', groups: [['Web & data', ['Bases de données', 'Atelier Web et applications']], ['Networks', ['Généralités sur les réseaux', 'Transmission de données']], ['Sensors & communication', ['Réseaux de capteurs', 'Systèmes de transmission']], ['Signal processing', ['Traitement et analyse d\'image', 'Traitement du signal']], ['Digital systems', ['Codage', 'Initiation VHDL']]] },
    { id: 'S4', groups: [['Cloud', ['Cloud computing', 'Co-conception']], ['Artificial intelligence', ['Machine learning', 'Deep learning']], ['Embedded systems', ['Microprocesseurs et microcontrôleurs']], ['Cybersecurity', ['Principes de cryptographie', 'Fondements de la cybersécurité']], ['Advanced networks', ['Routage et administration des réseaux', 'Protocoles de communication']]] },
    { id: 'S5', groups: [['Systems', ['Architecture et programmation des systèmes', 'Développement mobile']], ['Connected systems & data', ['Architecture IoT', 'Ordonnancement des systèmes distribués']], ['High-speed networks', ['Réseaux mobiles de nouvelle génération', 'Transmission par fibre optique']], ['Advanced security', ['Blockchain', 'Hacking éthique et tests d\'intrusion']], ['Digital transformation', ['Transformation numérique']]] },
    { id: 'S6', groups: [['Final year project', ['Projet de fin d\'études (30 ECTS)']]] }
  ],

  cyberAreas: [
    ['Network Security', 'Firewalls, segmentation, secure protocols.'], ['Linux Security', 'Hardening, permissions, logs.'],
    ['Cryptography', 'Foundations before applications.'], ['Ethical Hacking', 'Authorized, isolated labs only.'],
    ['Penetration Testing', 'Methodology and reporting.'], ['Security Monitoring', 'Logging, detection, SOC concepts.'],
    ['Secure Systems', 'Secure-by-design software.'], ['IoT Security', 'Constrained devices and firmware.'],
    ['Cloud Security', 'Identity, isolation, configuration.']
  ],
  cyberFlow: [['Users & devices', 'Endpoints'], ['Network controls', 'Firewall, segmentation'], ['Hardened systems', 'Linux, patching'], ['Monitoring', 'Logs, alerts'], ['Response', 'Analysis, lessons']],

  netTopics: ['Computer Networks', 'TCP/IP', 'Routing', 'Network Administration', 'Data Transmission', 'Wireless Networks', 'Fiber Optics', 'Mobile Networks', 'Telecommunications'],
  topology: {
    nodes: [
      { id: 'net', label: 'Internet', x: 28, y: 8, text: 'The public network. Everything leaving the local network passes through the gateway.' },
      { id: 'mob', label: 'Mobile network', x: 74, y: 8, text: 'Cellular access (4G/5G): another path to the same services, studied in next-generation networks.' },
      { id: 'rt', label: 'Router', x: 50, y: 30, text: 'Forwards packets between networks using routing tables; the natural place for firewall rules and NAT.' },
      { id: 'sw', label: 'Switch', x: 24, y: 56, text: 'Connects wired devices inside one network (layer 2) and can separate traffic with VLANs.' },
      { id: 'ap', label: 'Wi-Fi AP', x: 76, y: 56, text: 'Wireless access point bridging radio clients to the wired network.' },
      { id: 'srv', label: 'Server', x: 12, y: 84, text: 'Hosts services. Good practice: minimal open ports, updates, logging.' },
      { id: 'pc', label: 'Laptop', x: 40, y: 84, text: 'A client device on the wired network.' },
      { id: 'iot', label: 'IoT node', x: 76, y: 84, text: 'A sensor device (e.g. ESP32) on Wi-Fi, sending data to a server.' }
    ],
    edges: [['net', 'rt'], ['mob', 'rt'], ['rt', 'sw'], ['rt', 'ap'], ['sw', 'srv'], ['sw', 'pc'], ['ap', 'iot']]
  },

  iotFlow: [['Sensor', 'Measures'], ['Microcontroller', 'ESP32, Arduino'], ['Network', 'Wi-Fi, MQTT'], ['Server / Cloud', 'Processing'], ['Database', 'Storage'], ['Dashboard', 'Visualisation']],
  hardware: ['ESP32', 'Arduino', 'Raspberry Pi', 'Sensors', 'Microcontrollers', 'Embedded Linux', 'Connected systems'],

  labFlow: [['Attacker VM', 'Isolated'], ['Virtual network', 'Host-only'], ['Linux server', 'Target (own)'], ['Windows machine', 'Target (own)'], ['Logging', 'Collect events'], ['SIEM', 'Analyse']],
  labTools: ['Kali Linux', 'Ubuntu Server', 'VirtualBox', 'Docker', 'Wireshark', 'Git', 'GitHub'],

  projectCats: ['All', 'Cybersecurity', 'Networking', 'Programming', 'Embedded', 'IoT', 'Web', 'AI'],
  projects: [
    { name: 'Personal portfolio website', cat: 'Web', status: 'In Progress', example: false, desc: 'This site: plain HTML, CSS and JavaScript, built to be easy to maintain.', tech: ['HTML', 'CSS', 'JavaScript'], github: '', demo: '', docs: '' },
    { name: 'Home network lab', cat: 'Networking', status: 'Planned', example: true, desc: 'Virtual machines on an isolated network to practise addressing, routing and packet analysis.', tech: ['VirtualBox', 'Linux', 'Wireshark'], github: '', demo: '', docs: '' },
    { name: 'Secure sensor node', cat: 'IoT', status: 'Planned', example: true, desc: 'ESP32 sending sensor data to a small server, with authentication and encrypted transport.', tech: ['ESP32', 'C/C++', 'MQTT'], github: '', demo: '', docs: '' },
    { name: 'Linux hardening notes', cat: 'Cybersecurity', status: 'Planned', example: true, desc: 'A documented checklist for securing a fresh Ubuntu Server inside the lab.', tech: ['Linux', 'Bash'], github: '', demo: '', docs: '' },
    { name: 'Student management app', cat: 'Programming', status: 'Planned', example: true, desc: 'A small database-backed web application with input validation.', tech: ['PHP', 'SQL'], github: '', demo: '', docs: '' },
    { name: 'Sensor data classifier', cat: 'AI', status: 'Planned', example: true, desc: 'A first machine-learning experiment on sensor readings.', tech: ['Python'], github: '', demo: '', docs: '' },
    { name: 'Microcontroller blink-to-bus', cat: 'Embedded', status: 'Planned', example: true, desc: 'From LED blink to reading sensors over I2C/SPI, documented step by step.', tech: ['Arduino', 'C'], github: '', demo: '', docs: '' }
  ],

  levels: ['Learning', 'Working Knowledge', 'Academic Knowledge', 'Project Experience', 'Advanced'],
  // Level = index in `levels`. Kept conservative on purpose; edit when evidence changes.
  skills: [
    ['Programming', [['C', 0], ['Python', 1], ['JavaScript', 3], ['PHP', 1], ['SQL', 1]]],
    ['Web', [['HTML', 3], ['CSS', 3], ['JavaScript', 3], ['React', 1]]],
    ['Systems', [['Linux', 0], ['Operating Systems', 0], ['Virtual Machines', 0], ['Docker', 0]]],
    ['Networks', [['TCP/IP', 0], ['Routing', 0], ['Network Administration', 0], ['Telecommunications', 0]]],
    ['Cybersecurity', [['Cryptography', 0], ['Network Security', 0], ['Ethical Hacking', 0], ['Security Fundamentals', 0]]],
    ['Hardware', [['Arduino', 0], ['ESP32', 0], ['Raspberry Pi', 0], ['Microcontrollers', 0]]],
    ['AI', [['Machine Learning', 0], ['Deep Learning', 0]]]
  ],

  roadmap: [
    ['2026–2027', 'Foundation', ['Mathematics', 'C', 'Python', 'Linux', 'Electronics', 'Algorithms']],
    ['2027–2028', 'Systems & Networks', ['Operating Systems', 'Advanced Programming', 'Databases', 'Networks', 'Data Transmission']],
    ['2028–2029', 'Security & Intelligent Systems', ['Cryptography', 'Cybersecurity', 'Machine Learning', 'Deep Learning', 'IoT', 'Cloud']],
    ['2029–2030', 'Advanced Engineering', ['Ethical Hacking', 'Penetration Testing', 'Advanced Networks', 'Blockchain', 'Distributed Systems', 'PFE']]
  ],

  achievements: ['University projects', 'GitHub projects', 'CTF participation', 'Networking certifications', 'Cybersecurity certifications', 'Hackathons', 'Internships', 'Research projects'],

  goals: [
    ['Short term', 'Build strong foundations in programming, mathematics, Linux, networks and systems.'],
    ['Medium term', 'Develop cybersecurity, networking, IoT and cloud projects, and document them publicly.'],
    ['Long term', 'Become a cybersecurity / systems / network engineer and pursue advanced studies internationally.']
  ]
};
