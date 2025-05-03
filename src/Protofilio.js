import React, { useEffect, useState } from 'react';
import './index.css';

const Portfolio = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  useEffect(() => {
    const header = document.querySelector('.nav-header');
    let lastScrollTop = 0;

    // Function to handle scroll for hiding/showing header
    const handleScrollHeader = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      lastScrollTop = scrollTop;
    };

    // Section Active Indicator
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute("id");
          const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("text-yellow-500", "font-extrabold"));
            navLink?.classList.add("text-yellow-500", "font-extrabold");
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section));

    // Progress Bar
    const progressBar = document.getElementById("progress-bar");

    const updateProgressBar = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    };

    // Back to Top Button
    const backToTopBtn = document.getElementById("backToTop");

    const handleBackToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToTopVisibility = () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove("hidden");
      } else {
        backToTopBtn.classList.add("hidden");
      }
    };

    // Add Event Listeners
    window.addEventListener("scroll", handleScrollHeader);
    window.addEventListener("scroll", updateProgressBar);
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", handleBackToTop);
      window.addEventListener("scroll", handleBackToTopVisibility);
    }

    // Clean up observers and event listeners
    return () => {
      window.removeEventListener("scroll", handleScrollHeader);
      window.removeEventListener("scroll", updateProgressBar);

      if (backToTopBtn) {
        backToTopBtn.removeEventListener("click", handleBackToTop);
        window.removeEventListener("scroll", handleBackToTopVisibility);
      }

      observer.disconnect(); // Stop observing sections
    };
  }, []



  );
  return (

    <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div id="progress-bar" className="fixed top-0 left-0 h-1 bg-yellow-500 w-0 z-50 transition-all duration-300"></div>

      {/* Navigation Header */}
      <nav className="nav-header fixed top-0 left-0 w-full bg-gray-900 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-center space-x-4 relative">
          <a href="#summary" className="nav-link text-white text-bold-animated">Summary</a>
          <a href="#education" className="nav-link text-white text-bold-animated">Education</a>
          <a href="#languages" className="nav-link text-white text-bold-animated">Languages</a>
          <a href="#skills" className="nav-link text-white text-bold-animated">Skills</a>
          <a href="#portfolio" className="nav-link text-white text-bold-animated">Portfolio</a>
          <a href="#achievements" className="nav-link text-white text-bold-animated">Achievements</a>
          <a href="#courses" className="nav-link text-white text-bold-animated">Courses</a>
          <a href="#find-me" className="nav-link text-white text-bold-animated">Find Me</a>
          <a
            href="/cv.pdf"
            download
            className="btn-animated bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-1 px-3 rounded-full transition-all duration-300 text-sm no-underline"
          >
            <i className="fas fa-file-download mr-1"></i>Download CV
          </a>
          <button id="backToTop" className="fixed bottom-6 right-6 ... hidden">
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </nav>
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-2xl transform transition-all animate-fade-in-scale max-w-sm w-full text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-400 mb-4">Welcome to My Portfolio</h2>
            <p className="text-gray-300 mb-6">I'm Mahmoud Ali — Frontend Developer & Software Engineer</p>
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-full transition-all duration-300 btn-animated"
            >
              Let's Start
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        {/* Header */}
        <header className="text-center pb-12 pt-16" data-aos="fade-down">
          <img
            src="/photo_5814519046379521784_y.jpg"
            alt="Mahmoud Ali"
            className="w-40 h-40 rounded-full mx-auto border-4 border-yellow-500 object-cover transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-4xl text-bold-animated text-yellow-500 mt-6">Mahmoud Ali Mahmoud Mohamed</h1>
          <p className="text-lg text-bold-animated text-gray-400 mt-2">Software Engineer</p>
          <button
            onClick={() => setShowContactModal(true)}
            className="mt-6 bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full btn-animated"
          >
            <span className="text-bold-animated">Contact Me</span>
          </button>
          <div className="flex justify-center mt-6 space-x-6">
            <a href="https://www.linkedin.com/in/mahmoud-ali-49673b262" className="text-gray-400 hover:text-yellow-500 text-xl icon-animated">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/genoo778" className="text-gray-400 hover:text-yellow-500 text-xl icon-animated">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </header>

        {/* Summary */}
        <section id="summary" className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Summary</h2>
          <p className="mt-6 text-gray-300 text-bold-animated leading-relaxed text-justify">
            As a Front-End Developer, I specialize in building user interfaces using the React JavaScript library. My responsibilities include creating interactive and dynamic web applications, implementing reusable components, managing state effectively, and optimizing performance for a smooth user experience. I also work with other technologies such as JSX, Redux for state management, and various React tools and libraries to develop robust and efficient front-end solutions. Additionally, I have a solid understanding of network fundamentals, which enhances my ability to build more efficient and connected applications.
          </p>
        </section>

        {/* Education */}
        <section id="education" className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Education</h2>
          <div className="mt-6">
            <h5 className="text-lg text-bold-animated font-semibold text-white">Bachelor of Science in Computer Science and Artificial Intelligence</h5>
            <p className="text-gray-400 text-bold-animated">Helwan University | 09/2020 - 06/2024</p>
            <p className="text-gray-300 text-bold-animated mt-2">Graduated with Honors (Very Good grade)</p>
          </div>
        </section>

        {/* Languages */}
        <section id="languages" className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Languages</h2>
          <div className="mt-6">
            <p className="text-gray-300 text-bold-animated">English: Proficient</p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">My Skills</h2>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {["Bootstrap", "CSS", "GitHub", "HTML", "JavaScript", "JSX", "Node", "React", "Redux", "TypeScript", "Network basics", "Next"].map((skill, index) => (
              <div key={index} className="skill-card bg-gray-800 rounded-lg p-4 text-center shadow-md card-animated" data-aos="zoom-in" data-aos-delay={index * 100}>
                <p className="text-gray-300 text-bold-animated font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects (Portfolio) */}

        {/* Projects (Portfolio) */}
        <section id="portfolio" className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Portfolio</h2>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-lg text-bold-animated font-semibold text-white">Health Monitoring Website</h5>
              <p className="text-gray-400 text-bold-animated text-sm">02/2025 - 05/2025</p>
              <p className="text-gray-300 text-bold-animated text-sm mt-2">A web application to monitor health metrics, allowing users to track vital signs and receive health insights.</p>
              <button className="mt-2 bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated">
                <span className="text-bold-animated">More</span>
              </button>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-lg text-bold-animated font-semibold text-white">Elzhraa Helwan University Student Reservation</h5>
              <p className="text-gray-400 text-bold-animated text-sm">11/2023 - 06/2024</p>
              <p className="text-gray-300 text-bold-animated text-sm mt-2">A reservation system for students at Elzhraa Helwan University, streamlining booking processes.</p>
              <a href="https://github.com/genoo778/Elzhraa_Projectt" className="mt-2 inline-block bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated">
                <span className="text-bold-animated">View Project</span>
              </a>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-lg text-bold-animated font-semibold text-white">Realtime Restaurant Booking System using React</h5>
              <p className="text-gray-400 text-bold-animated text-sm">01/2023 - 03/2023</p>
              <p className="text-gray-300 text-bold-animated text-sm mt-2">A real-time booking system for restaurants, built with React for seamless user interaction.</p>
              <button className="mt-2 bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated">
                <span className="text-bold-animated">More</span>
              </button>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-lg text-bold-animated font-semibold text-white">E-commerce React Project</h5>
              <p className="text-gray-400 text-bold-animated text-sm">02/2022 - 04/2022</p>
              <p className="text-gray-300 text-bold-animated text-sm mt-2">An e-commerce platform built with React, featuring product listings, cart, and checkout functionality.</p>
              <a href="https://github.com/genoo778/E-commarce-React-Project" className="mt-2 inline-block bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated">
                <span className="text-bold-animated">View Project</span>
              </a>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-lg text-bold-animated font-semibold text-white">Realtime Cinema Booking System with React</h5>
              <p className="text-gray-400 text-bold-animated text-sm">01/2021 - 03/2021</p>
              <p className="text-gray-300 text-bold-animated text-sm mt-2">A cinema seat booking system with real-time updates, developed using React.</p>
              <a href="https://github.com/genoo778/Real-Time-Cinema-Seats-panel-main" className="mt-2 inline-block bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated">
                <span className="text-bold-animated">View Project</span>
              </a>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-lg text-bold-animated font-bold text-white">Front_SW_Proj_with_React - Various React Projects</h5>
              <p className="text-gray-400 text-bold-animated text-sm">01/2020 - 03/2020</p>
              <p className="text-gray-300 text-bold-animated text-sm mt-2">A collection of front-end projects built with React, showcasing various functionalities.</p>
              <a href="https://github.com/genoo778/Front_SW_Proj_with_React.git" className="mt-2 inline-block bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated">
                <span className="text-bold-animated">View Project</span>
              </a>
            </div>
          </div>
        </section>


        {/* Key Achievements */}
        <section id="achievements" className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Key Achievements</h2>
          <div className="mt-6 space-y-4">
            {["Advanced Frontend Web Development using ReactJS", "ITI Certified Web Application", "Meta Certified Advanced React"].map((achievement, index) => (
              <div key={index} className="flex items-start" data-aos="fade-right" data-aos-delay={index * 100}>
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4"></div>
                <p className="text-gray-300 text-bold-animated">{achievement}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Training / Courses */}
        <section id="courses" className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Training / Courses</h2>
          <div className="mt-6 space-y-4">
            {["Meta Certified Advanced React", "Advanced Frontend Web Development using React JS", "ITI Certified Web Application using PHP", "An ITI Certified Web Application using PHP"].map((course, index) => (
              <div key={index} className="flex items-start" data-aos="fade-right" data-aos-delay={index * 100}>
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4"></div>
                <p className="text-gray-300 text-bold-animated">{course}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Find Me Online */}
        <section id="find-me" className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Find Me Online</h2>
          <div className="mt-6 space-y-4">
            <p className="text-gray-300 text-bold-animated flex items-center" data-aos="fade-right">
              <i className="fas fa-envelope mr-3 text-yellow-500 text-lg icon-animated"></i>
              Email: <a href="mailto:mansosw219@gmail.com" className="text-yellow-500 hover:underline ml-2 text-bold-animated">mansosw219@gmail.com</a>
            </p>
            <p className="text-gray-300 text-bold-animated flex items-center" data-aos="fade-right">
              <i className="fab fa-linkedin mr-3 text-yellow-500 text-lg icon-animated"></i>
              LinkedIn: <a href="https://www.linkedin.com/in/mahmoud-ali-49673b262" className="text-yellow-500 hover:underline ml-2 text-bold-animated">Mahmoud Ali</a>
            </p>
            <p className="text-gray-300 text-bold-animated flex items-center" data-aos="fade-right">
              <i className="fab fa-github mr-3 text-yellow-500 text-lg icon-animated"></i>
              GitHub: <a href="https://github.com/genoo778" className="text-yellow-500 hover:underline ml-2 text-bold-animated">genoo778</a>
            </p>
            <p className="text-gray-300 text-bold-animated flex items-center" data-aos="fade-right">
              <i className="fas fa-map-marker-alt mr-3 text-yellow-500 text-lg icon-animated"></i>
              Phone:    <span className="text-bold-animated">01008876825</span>
            </p>
            <p className="text-gray-300 text-bold-animated flex items-center" data-aos="fade-right">
              <i className="fas fa-map-marker-alt mr-3 text-yellow-500 text-lg icon-animated"></i>
              Location:    <span className="text-bold-animated">Cairo</span>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 pb-8" data-aos="fade-up">
          <p className="text-sm text-bold-animated">Thanks for Scrolling</p>
        </footer>
        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full relative animate-fade-in-down">
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4 text-yellow-500">Contact Information</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-3 text-yellow-500"></i>
                  <span>01008876825</span>
                </li>
                <li className="flex items-center">
                  <i className="fab fa-whatsapp mr-3 text-green-500"></i>
                  <a href="https://wa.me/201008876825" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="fab fa-facebook mr-3 text-blue-500"></i>
                  <a href="https://facebook.com/MahmoudAli" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* Back to Top Button */}
        <button id="backToTop" className="fixed bottom-6 right-6 bg-yellow-500 text-gray-900 rounded-full p-3 shadow-lg hidden transition-transform hover:scale-110 z-40">
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
};

export default Portfolio;