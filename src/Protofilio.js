import React, { useEffect, useState } from 'react';
import './index.css';

const Portfolio = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  // --- Scroll Effects ---
  useEffect(() => {
    const header = document.querySelector('.nav-header');
    let lastScrollTop = 0;

    const handleScrollHeader = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      lastScrollTop = scrollTop;
    };

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute("id");
          const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (entry.isIntersecting) {
            navLinks.forEach(link =>
              link.classList.remove("text-yellow-500", "font-extrabold")
            );
            navLink?.classList.add("text-yellow-500", "font-extrabold");
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section));

    const progressBar = document.getElementById("progress-bar");
    const updateProgressBar = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    };

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

    window.addEventListener("scroll", handleScrollHeader);
    window.addEventListener("scroll", updateProgressBar);
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", handleBackToTop);
      window.addEventListener("scroll", handleBackToTopVisibility);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollHeader);
      window.removeEventListener("scroll", updateProgressBar);
      if (backToTopBtn) {
        backToTopBtn.removeEventListener("click", handleBackToTop);
        window.removeEventListener("scroll", handleBackToTopVisibility);
      }
      observer.disconnect();
    };
  }, []);

  // --- Mobile Menu Toggle ---
  const toggleMobileMenu = () => {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div id="progress-bar" className="fixed top-0 left-0 h-1 bg-yellow-500 w-0 z-50 transition-all duration-300"></div>

      {/* Navigation Header */}
      <nav className="nav-header fixed top-0 left-0 w-full bg-gray-900 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-2 lg:space-x-4">
            <a href="#summary" className="nav-link text-white text-bold-animated">Summary</a>
            <a href="#education" className="nav-link text-white text-bold-animated">Education</a>
            <a href="#languages" className="nav-link text-white text-bold-animated">Languages</a>
            <a href="#skills" className="nav-link text-white text-bold-animated">Skills</a>
            <a href="#portfolio" className="nav-link text-white text-bold-animated">Portfolio</a>
            <a href="#achievements" className="nav-link text-white text-bold-animated">Achievements</a>
            <a href="#courses" className="nav-link text-white text-bold-animated">Courses</a>
            <a href="#find-me" className="nav-link text-white text-bold-animated">Find Me</a>
          </div>

          {/* Download CV Button */}
          <a
            href="/cv.pdf"
            download
            className="btn-animated bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-1 px-3 rounded-full transition-all duration-300 text-xs sm:text-sm whitespace-nowrap"
          >
            <i className="fas fa-file-download mr-1"></i>Download CV
          </a>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none ml-2">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden bg-gray-900 p-4 absolute top-16 left-0 w-full z-50 shadow-lg flex flex-col space-y-3">
          <a href="#summary" className="text-white block text-center py-2 hover:text-yellow-500">Summary</a>
          <a href="#education" className="text-white block text-center py-2 hover:text-yellow-500">Education</a>
          <a href="#languages" className="text-white block text-center py-2 hover:text-yellow-500">Languages</a>
          <a href="#skills" className="text-white block text-center py-2 hover:text-yellow-500">Skills</a>
          <a href="#portfolio" className="text-white block text-center py-2 hover:text-yellow-500">Portfolio</a>
          <a href="#achievements" className="text-white block text-center py-2 hover:text-yellow-500">Achievements</a>
          <a href="#courses" className="text-white block text-center py-2 hover:text-yellow-500">Courses</a>
          <a href="#find-me" className="text-white block text-center py-2 hover:text-yellow-500">Find Me</a>
        </div>
      </nav>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gray-800 text-white p-6 sm:p-8 rounded-lg shadow-2xl transform transition-all animate-fade-in-scale max-w-xs sm:max-w-sm w-full text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-yellow-400 mb-4">Welcome to My Portfolio</h2>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">I'm Mahmoud Ali — Frontend Developer & Software Engineer</p>
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-full transition-all duration-300 btn-animated text-sm sm:text-base"
            >
              Let's Start
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl">
        {/* Header */}
        <header className="text-center pb-12 pt-16" data-aos="fade-down">
          <img
            src="/photo_5814519046379521784_y.jpg"
            alt="Mahmoud Ali"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-yellow-500 object-cover transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-bold-animated text-yellow-500 mt-4">Mahmoud Ali Mahmoud Mohamed</h1>
          <p className="text-sm sm:text-base md:text-lg text-bold-animated text-gray-400 mt-2">Software Engineer</p>
          <button
            onClick={() => setShowContactModal(true)}
            className="mt-4 sm:mt-6 bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full btn-animated text-sm sm:text-base"
          >
            Contact Me
          </button>
          <div className="flex justify-center mt-4 space-x-4 sm:space-x-6">
            <a href="https://www.linkedin.com/in/mahmoud-ali-49673b262" className="text-gray-400 hover:text-yellow-500 text-xl icon-animated">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/genoo778" className="text-gray-400 hover:text-yellow-500 text-xl icon-animated">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </header>

        {/* Summary */}
        <section id="summary" className="mt-12 sm:mt-16" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Summary</h2>
          <p className="mt-4 sm:mt-6 text-gray-300 leading-relaxed text-justify text-sm sm:text-base">
            As a Front-End Developer, I specialize in building user interfaces using the React JavaScript library. My responsibilities include creating interactive and dynamic web applications, implementing reusable components, managing state effectively, and optimizing performance for a smooth user experience.
          </p>
        </section>

        {/* Education */}
        <section id="education" className="mt-12 sm:mt-16" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Education</h2>
          <div className="mt-4 sm:mt-6">
            <h5 className="text-sm sm:text-lg text-bold-animated font-semibold text-white">Bachelor of Science in Computer Science and Artificial Intelligence</h5>
            <p className="text-gray-400 text-xs sm:text-base">Helwan University | 09/2020 - 06/2024</p>
            <p className="text-gray-300 text-xs sm:text-sm mt-2">Graduated with Honors (Very Good grade)</p>
          </div>
        </section>

        {/* Languages */}
        <section id="languages" className="mt-12 sm:mt-16" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Languages</h2>
          <div className="mt-4 sm:mt-6">
            <p className="text-gray-300 text-bold-animated text-sm sm:text-base">English: Proficient</p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-12 sm:mt-16" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">My Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
            {["Bootstrap", "CSS", "GitHub", "HTML", "JavaScript", "JSX", "Node", "React", "Redux", "TypeScript", "Network basics", "Next"].map((skill, index) => (
              <div key={index} className="skill-card bg-gray-800 rounded-lg p-3 sm:p-4 text-center shadow-md card-animated" data-aos="zoom-in" data-aos-delay={index * 100}>
                <p className="text-gray-300 text-bold-animated font-medium text-xs sm:text-sm">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="mt-12 sm:mt-16" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-sm sm:text-lg text-bold-animated font-semibold text-white">Health Monitoring Website</h5>
              <p className="text-gray-400 text-xs sm:text-sm">02/2025 - 05/2025</p>
              <p className="text-gray-300 text-xs sm:text-sm mt-2">A web application to monitor health metrics.</p>
              <button className="mt-2 bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated text-xs sm:text-sm">
                More
              </button>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-sm sm:text-lg text-bold-animated font-semibold text-white">Elzhraa Helwan University Student Reservation</h5>
              <p className="text-gray-400 text-xs sm:text-sm">11/2023 - 06/2024</p>
              <p className="text-gray-300 text-xs sm:text-sm mt-2">A reservation system for students at Elzhraa Helwan University, streamlining booking processes.</p>
              <a href="https://github.com/genoo778/Elzhraa_Projectt" className="mt-2 inline-block bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated text-xs sm:text-sm">
                View Project
              </a>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-sm sm:text-lg text-bold-animated font-semibold text-white">Realtime Restaurant Booking System using React</h5>
              <p className="text-gray-400 text-xs sm:text-sm">01/2023 - 03/2023</p>
              <p className="text-gray-300 text-xs sm:text-sm mt-2">A real-time booking system for restaurants, built with React for seamless user interaction.</p>
              <button className="mt-2 bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated text-xs sm:text-sm">
                More
              </button>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-sm sm:text-lg text-bold-animated font-semibold text-white">E-commerce React Project</h5>
              <p className="text-gray-400 text-xs sm:text-sm">02/2022 - 04/2022</p>
              <p className="text-gray-300 text-xs sm:text-sm mt-2">An e-commerce platform built with React, featuring product listings, cart, and checkout functionality.</p>
              <a href="https://github.com/genoo778/E-commarce-React-Project" className="mt-2 inline-block bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated text-xs sm:text-sm">
                View Project
              </a>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-sm sm:text-lg text-bold-animated font-semibold text-white">Realtime Cinema Booking System with React</h5>
              <p className="text-gray-400 text-xs sm:text-sm">01/2021 - 03/2021</p>
              <p className="text-gray-300 text-xs sm:text-sm mt-2">A cinema seat booking system with real-time updates, developed using React.</p>
              <a href="https://github.com/genoo778/Real-Time-Cinema-Seats-panel-main" className="mt-2 inline-block bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated text-xs sm:text-sm">
                View Project
              </a>
            </div>
            <div className="project-card bg-gray-800 rounded-lg p-4 shadow-md card-animated" data-aos="zoom-in">
              <h5 className="text-sm sm:text-lg text-bold-animated font-semibold text-white">Front_SW_Proj_with_React - Various React Projects</h5>
              <p className="text-gray-400 text-xs sm:text-sm">01/2020 - 03/2020</p>
              <p className="text-gray-300 text-xs sm:text-sm mt-2">A collection of front-end projects built with React, showcasing various functionalities.</p>
              <a href="https://github.com/genoo778/Front_SW_Proj_with_React.git" className="mt-2 inline-block bg-yellow-500 text-gray-900 font-semibold py-1 px-3 rounded btn-animated text-xs sm:text-sm">
                View Project
              </a>
            </div>
          </div>
        </section>

        {/* Key Achievements */}
        <section id="achievements" className="mt-12 sm:mt-16" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Key Achievements</h2>
          <div className="mt-4 sm:mt-6 space-y-4">
            {[
              "Advanced Frontend Web Development using ReactJS",
              "ITI Certified Web Application",
              "Meta Certified Advanced React"
            ].map((achievement, index) => (
              <div key={index} className="flex items-start" data-aos="fade-right" data-aos-delay={index * 100}>
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4"></div>
                <p className="text-gray-300 text-bold-animated text-sm sm:text-base">{achievement}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Training / Courses */}
        <section id="courses" className="mt-12 sm:mt-16" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Training / Courses</h2>
          <div className="mt-4 sm:mt-6 space-y-4">
            {[
              "Meta Certified Advanced React",
              "Advanced Frontend Web Development using React JS",
              "ITI Certified Web Application using PHP",
              "An ITI Certified Web Application using PHP"
            ].map((course, index) => (
              <div key={index} className="flex items-start" data-aos="fade-right" data-aos-delay={index * 100}>
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4"></div>
                <p className="text-gray-300 text-bold-animated text-sm sm:text-base">{course}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Find Me Online */}
        <section id="find-me" className="mt-12 sm:mt-16" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl text-bold-animated font-bold text-yellow-500 border-b-2 border-yellow-500 inline-block pb-2">Find Me Online</h2>
          <div className="mt-4 sm:mt-6 space-y-3">
            <p className="text-gray-300 text-bold-animated flex items-center text-sm sm:text-base">
              <i className="fas fa-envelope mr-3 text-yellow-500 text-lg icon-animated"></i>
              Email: <a href="mailto:mansosw219@gmail.com" className="text-yellow-500 hover:underline ml-2 text-bold-animated">mansosw219@gmail.com</a>
            </p>
            <p className="text-gray-300 text-bold-animated flex items-center text-sm sm:text-base">
              <i className="fab fa-linkedin mr-3 text-yellow-500 text-lg icon-animated"></i>
              LinkedIn: <a href="https://www.linkedin.com/in/mahmoud-ali-49673b262" className="text-yellow-500 hover:underline ml-2 text-bold-animated">Mahmoud Ali</a>
            </p>
            <p className="text-gray-300 text-bold-animated flex items-center text-sm sm:text-base">
              <i className="fab fa-github mr-3 text-yellow-500 text-lg icon-animated"></i>
              GitHub: <a href="https://github.com/genoo778" className="text-yellow-500 hover:underline ml-2 text-bold-animated">genoo778</a>
            </p>
            <p className="text-gray-300 text-bold-animated flex items-center text-sm sm:text-base">
              <i className="fas fa-phone-alt mr-3 text-yellow-500 text-lg icon-animated"></i>
              Phone: <span className="ml-2 text-bold-animated">01008876825</span>
            </p>
            <p className="text-gray-300 text-bold-animated flex items-center text-sm sm:text-base">
              <i className="fas fa-map-marker-alt mr-3 text-yellow-500 text-lg icon-animated"></i>
              Location: <span className="ml-2 text-bold-animated">Cairo</span>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center text-gray-400 pb-8" data-aos="fade-up">
          <p className="text-xs sm:text-sm text-bold-animated">Thanks for Scrolling</p>
        </footer>

        {/* Back to Top Button */}
        <button id="backToTop" className="fixed bottom-6 right-6 bg-yellow-500 text-gray-900 rounded-full p-3 shadow-lg hidden transition-transform hover:scale-110 z-40">
          <i className="fas fa-arrow-up"></i>
        </button>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm w-full relative animate-fade-in-down">
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
              >
                &times;
              </button>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-yellow-500">Contact Information</h3>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
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
      </div>
    </div>
  );
};

export default Portfolio;