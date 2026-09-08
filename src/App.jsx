import { useEffect, useState } from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "ProofTrack",
    description:
      "An AI-assisted claim verification platform that analyzes claims against evidence collected from web sources.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "Google Gemini",
      "Web Scraping",
      "AI",
    ],
    image: "/prooftrack.png",
    github: "https://github.com/abhi1289-gif/ProofTracker",
    demo: "https://prooftrack-zeta.vercel.app/",
  },
  {
    number: "02",
    title: "FoodLoop",
    description:
      "A full-stack food redistribution platform connecting hotels, charities, and volunteers to reduce food waste.",
    tech: ["React", "Node.js", "Express", "MySQL", "REST API", "Vite"],
    image: "/foodloop.png",
    github: "https://github.com/abhi1289-gif/FoodLoop",
    demo: "https://food-loop-1ldg.vercel.app/",
  },
  {
    number: "03",
    title: "CampusConnect",
    description:
      "A full-stack academic collaboration platform for students to share resources, discuss subjects and communicate.",
    tech: ["React", "Node.js", "Express", "MySQL", "Socket.IO", "Vite"],
    image: "/campusconnect.png",
    github: "https://github.com/abhi1289-gif/CampusConnect",
    demo: "https://campus-connect-theta-seven.vercel.app/",
  },
];

const skills = [
  {
    title: "Languages",
    items: ["Java", "C++", "JavaScript", "Python"],
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Vite"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Socket.IO"],
  },
  {
    title: "Database",
    items: ["MySQL", "MongoDB"],
  },
  {
    title: "Core CS",
    items: [
      "Data Structures",
      "Algorithms",
      "DBMS",
      "Operating Systems",
      "OOP",
      "Computer Networks",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman"],
  },
];

const services = [
  {
    number: "01",
    title: "Full-Stack Development",
    text: "Building complete web applications with responsive interfaces, backend services, APIs and databases.",
  },
  {
    number: "02",
    title: "Problem Solving",
    text: "Strengthening Data Structures and Algorithms while turning complex problems into clean solutions.",
  },
  {
    number: "03",
    title: "AI & Modern Web",
    text: "Exploring AI-powered products and integrating modern technologies into practical applications.",
  },
];

const navItems = [
  "home",
  "about",
  "services",
  "skills",
  "projects",
  "profiles",
  "journey",
  "contact",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [codingStats, setCodingStats] = useState({
    githubRepos: "8",
    githubStars: "7",
    leetcodeCpp: "417",
    leetcodeJava: "417",
    leetcodeRank: "76,444",
    leetcodeBadges: "4",
    updatedAt: ""
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((response) => {
        if (!response.ok) throw new Error("Stats request failed");
        return response.json();
      })
      .then((data) => setCodingStats(data))
      .catch(() => {
        // Keep the last known values above if the API is temporarily unavailable.
      });
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const top = section.offsetTop - 220;
        if (window.scrollY >= top) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">
      <div className="background-grid"></div>
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <header className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span>&lt;</span>A<span>/</span>
          <span>&gt;</span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={activeSection === item ? "active" : ""}
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            href="/resume.pdf"
            className="resume-button"
            target="_blank"
            rel="noreferrer"
          >
            Resume <span>↗</span>
          </a>
          <a href="#contact" className="nav-button">
            Let's Talk <span>↗</span>
          </a>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-content reveal">
            <div className="availability">
              <span></span>
              Available for opportunities
            </div>

            <p className="small-heading">HELLO, I'M</p>

            <h1>
              Abhishek
              <br />
              <span>Sonparote.</span>
            </h1>

            <h2>
              Engineering Science @ IIT Jodhpur{" "}
              <span>·</span> Developer
            </h2>

            <p className="hero-description">
              I build practical software, solve algorithmic problems, and
              explore modern web and AI technologies. I learn by building,
              experimenting, and turning ideas into working products.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="primary-button">
                View My Work <span>↗</span>
              </a>
              <a
                href="mailto:abhisheksonparote6@gmail.com"
                className="secondary-button"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf"
                className="secondary-button resume-hero-button"
                target="_blank"
                rel="noreferrer"
              >
                View Resume <span>↗</span>
              </a>
            </div>

            <div className="social-row">
              <a
                href="https://github.com/abhi1289-gif"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/abhishek-sonparote-868985377/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://leetcode.com/u/Abhishek_12_89/"
                target="_blank"
                rel="noreferrer"
              >
                LeetCode
              </a>
              <a
                href="https://www.geeksforgeeks.org/profile/abhisheksoe0gv"
                target="_blank"
                rel="noreferrer"
              >
                GFG
              </a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="orbit-dot"></div>

            <div className="code-card">
              <div className="window-bar">
                <span></span>
                <span></span>
                <span></span>
                <small>developer.js</small>
              </div>

              <div className="code-content">
                <p>
                  <span className="purple">const</span>{" "}
                  <span className="blue">developer</span> = {"{"}
                </p>
                <p className="indent">
                  name: <span className="green">"Abhishek"</span>,
                </p>
                <p className="indent">
                  role: <span className="green">"Developer"</span>,
                </p>
                <p className="indent">
                  focus: <span className="green">"Full-Stack"</span>,
                </p>
                <p className="indent">
                  learning: <span className="green">"Always"</span>,
                </p>
                <p className="indent">
                  coffee: <span className="orange">true</span>
                </p>
                <p>{"};"}</p>
                <p className="cursor-line">
                  <span>▌</span>
                </p>
              </div>
            </div>

            <div className="floating-label label-one">REACT</div>
            <div className="floating-label label-two">JAVA</div>
            <div className="floating-label label-three">AI</div>
          </div>

          <a href="#about" className="scroll-down">
            <span>Scroll to explore</span>
            ↓
          </a>
        </section>

        <section id="about" className="section about">
          <div className="section-heading reveal">
            <p>01 — ABOUT</p>
            <h2>
              A little bit
              <br />
              <span>about me.</span>
            </h2>
          </div>

          <div className="about-content">
            <div className="about-text reveal">
              <p className="large-text">
                I’m an Engineering Science student at IIT Jodhpur with a
                strong interest in software development, problem solving, and
                building useful products.
              </p>

              <p>
                I enjoy working across the stack — from designing responsive
                interfaces to building backend services, APIs and
                database-driven applications. My projects have given me
                hands-on experience with React, Node.js, Express, MySQL,
                real-time communication and AI-powered systems.
              </p>

              <p>
                Alongside development, I continuously work on Data Structures
                and Algorithms and strengthen my understanding of core
                Computer Science subjects. I believe building real projects
                is one of the best ways to turn concepts into practical
                engineering skills.
              </p>

              <div className="about-stats">
                <div>
                  <strong>03</strong>
                  <span>Projects</span>
                </div>
                <div>
                  <strong>IITJ</strong>
                  <span>Engineering Science</span>
                </div>
                <div>
                  <strong>2028</strong>
                  <span>Graduation</span>
                </div>
              </div>
            </div>

            <div className="about-card reveal">
              <div className="profile-placeholder">
                <div className="profile-circle">A</div>
                <div className="profile-ring"></div>
              </div>

              <div className="terminal">
                <div className="terminal-top">
                  <span>about-me.js</span>
                  <span>●</span>
                </div>
                <p>
                  <span className="purple">while</span> (
                  <span className="blue">learning</span>) {"{"}
                </p>
                <p className="indent">
                  <span className="blue">build</span>();
                </p>
                <p className="indent">
                  <span className="blue">fail</span>();
                </p>
                <p className="indent">
                  <span className="blue">learn</span>();
                </p>
                <p className="indent">
                  <span className="blue">repeat</span>();
                </p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section services">
          <div className="section-heading centered reveal">
            <p>02 — WHAT I DO</p>
            <h2>
              Build. Solve.
              <br />
              <span>Learn.</span>
            </h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card reveal" key={service.number}>
                <span className="service-number">{service.number}</span>
                <div className="service-icon">↗</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-heading centered reveal">
            <p>03 — SKILLS</p>
            <h2>
              What I
              <br />
              <span>work with.</span>
            </h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div className="skill-card reveal" key={skill.title}>
                <span className="skill-number">
                  0{index + 1}
                </span>
                <h3>{skill.title}</h3>
                <div className="skill-list">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="section-heading reveal">
            <p>04 — PROJECTS</p>
            <h2>
              Things I've
              <br />
              <span>built.</span>
            </h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.number}>
                <div className="project-top">
                  <span>{project.number}</span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                </div>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-preview"
                  aria-label={`Open ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                  />
                  <div className="preview-overlay">
                    <span>Open Live Demo ↗</span>
                  </div>
                </a>

                <div className="project-heading">
                  <h3>{project.title}</h3>
                  <span>WEB APP</span>
                </div>

                <p>{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    className="project-link"
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo <span>↗</span>
                  </a>
                  <a
                    className="project-source"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="profiles" className="section profiles">
          <div className="section-heading centered reveal">
            <p>05 — PROFILES</p>
            <h2>
              Find me
              <br />
              <span>online.</span>
            </h2>
          </div>

          <div className="profiles-grid">
            <a
              href="https://github.com/abhi1289-gif"
              target="_blank"
              rel="noreferrer"
              className="profile-card reveal"
            >
              <div className="profile-icon">GH</div>
              <div>
                <h3>GitHub</h3>
                <p>Projects & source code</p>
              </div>
              <span>↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/abhishek-sonparote-868985377/"
              target="_blank"
              rel="noreferrer"
              className="profile-card reveal"
            >
              <div className="profile-icon">in</div>
              <div>
                <h3>LinkedIn</h3>
                <p>Professional profile</p>
              </div>
              <span>↗</span>
            </a>

            <a
              href="https://leetcode.com/u/Abhishek_12_89/"
              target="_blank"
              rel="noreferrer"
              className="profile-card reveal"
            >
              <div className="profile-icon">&lt;/&gt;</div>
              <div>
                <h3>LeetCode</h3>
                <p>DSA & problem solving</p>
              </div>
              <span>↗</span>
            </a>

            <a
              href="https://www.geeksforgeeks.org/profile/abhisheksoe0gv"
              target="_blank"
              rel="noreferrer"
              className="profile-card reveal"
            >
              <div className="profile-icon">GFG</div>
              <div>
                <h3>GeeksForGeeks</h3>
                <p>Programming & DSA</p>
              </div>
              <span>↗</span>
            </a>
          </div>

          <div className="coding-stats-heading reveal">
            <span>LIVE SNAPSHOT</span>
            <p>Current coding activity across my public profiles.</p>
          </div>

          <div className="coding-stats-grid">
            <div className="coding-stat reveal">
              <span className="coding-stat-label">GITHUB</span>
              <strong>{codingStats.githubRepos}</strong>
              <p>Public repositories</p>
            </div>
            <div className="coding-stat reveal">
              <span className="coding-stat-label">GITHUB</span>
              <strong>{codingStats.githubStars}</strong>
              <p>Total repository stars</p>
            </div>
            <div className="coding-stat reveal">
              <span className="coding-stat-label">LEETCODE</span>
              <strong>{codingStats.leetcodeCpp}</strong>
              <p>C++ solutions</p>
            </div>
            <div className="coding-stat reveal">
              <span className="coding-stat-label">LEETCODE</span>
              <strong>{codingStats.leetcodeJava}</strong>
              <p>Java solutions</p>
            </div>
            <div className="coding-stat reveal">
              <span className="coding-stat-label">LEETCODE</span>
              <strong>{codingStats.leetcodeRank}</strong>
              <p>Current global rank</p>
            </div>
            <div className="coding-stat reveal">
              <span className="coding-stat-label">LEETCODE</span>
              <strong>{codingStats.leetcodeBadges}</strong>
              <p>Badges earned</p>
            </div>
          </div>

          <p className="stats-source-note">
            Stats are fetched automatically from GitHub and LeetCode.
            {codingStats.updatedAt && ` Last updated ${codingStats.updatedAt}.`}
          </p>
        </section>

        <section id="journey" className="section education">
          <div className="section-heading reveal">
            <p>06 — JOURNEY</p>
            <h2>
              My
              <br />
              <span>journey.</span>
            </h2>
          </div>

          <div className="timeline">
            <div className="timeline-item reveal">
              <div className="timeline-date">2024 — 2028</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-label">EDUCATION</span>
                <h3>B.Tech — Engineering Science</h3>
                <p>Indian Institute of Technology Jodhpur</p>
                <span>
                  Currently pursuing undergraduate studies with a focus on
                  programming, problem solving and computer science.
                </span>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date">2024 — Present</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-label">DEVELOPMENT</span>
                <h3>Developer Journey</h3>
                <p>
                  Software Development · DSA · Full-Stack Development · AI
                </p>
                <span>
                  Building projects and continuously expanding my engineering
                  skills.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-box reveal">
            <p className="contact-small">HAVE AN IDEA?</p>
            <h2>
              Let's build
              <br />
              <span>something.</span>
            </h2>
            <p>
              Whether it&apos;s a project, an opportunity, or simply a
              conversation about technology — I&apos;d love to hear from you.
            </p>
            <a
              href="mailto:abhisheksonparote6@gmail.com"
              className="primary-button"
            >
              Get In Touch <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">
          &lt;A /&gt;
        </div>

        <p>Designed & built by Abhishek Sonparote</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
