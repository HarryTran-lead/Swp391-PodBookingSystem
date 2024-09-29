import React from 'react';
import './About.css'; // Assuming you will style it with a separate CSS file

export default function About() {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Founder and CEO',
      description: 'With over 10 years of experience, John has been at the forefront of driving the company’s success.',
      img: 'path_to_john_image.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Operations Manager',
      description: 'Sarah ensures that daily operations run smoothly and oversees the staff to achieve the company’s goals.',
      img: 'path_to_sarah_image.jpg'
    },
    {
      name: 'David Lee',
      role: 'Sales and Marketing Director',
      description: 'David is responsible for managing the sales team and developing marketing strategies to boost revenue.',
      img: 'path_to_david_image.jpg'
    },
    {
      name: 'Emily Davis',
      role: 'Customer Experience Specialist',
      description: 'Emily makes sure that customers have a great experience by addressing their needs and feedback.',
      img: 'path_to_emily_image.jpg'
    },
    {
      name: 'Michael Robinson',
      role: 'Senior Product Designer',
      description: 'Michael leads the design team in crafting user-friendly and visually appealing products.',
      img: 'path_to_michael_image.jpg'
    },
    {
      name: 'Linda Martinez',
      role: 'Events and Administration Coordinator',
      description: 'Linda manages all events, meetings, and coordinates office resources for efficiency and productivity.',
      img: 'path_to_linda_image.jpg'
    },
  ];

  const faqItems = [
    { question: "What is a Meeting Space?", answer: "A meeting space is a designated area for professional gatherings, equipped with essential amenities." },
    { question: "How does a Meeting Space work?", answer: "A meeting space is rented on an hourly or daily basis depending on the customer’s needs." },
    { question: "What is included in my Meeting Space?", answer: "Your meeting space includes a desk, chairs, Wi-Fi, and access to basic office amenities." },
    { question: "What is the rate for Meeting Spaces?", answer: "The pricing for meeting spaces varies depending on size, location, and available features." },
    { question: "What is the minimum time for renting?", answer: "The minimum booking time for meeting spaces is one hour." },
    { question: "What is the maximum time for renting?", answer: "You can book a meeting space for a full day or up to several weeks depending on availability." },
  ];

  return (
    <div className="about-container">
      {/* Section: About Us */}
      <section className="about-us">
        <h2>The Team</h2>
        <p>Meet the people behind our company. Our team is committed to providing exceptional service and making your experience seamless.</p>
      </section>

      {/* Section: Team */}
      <div className="team-section">
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.img} alt={member.name} className="team-image" />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="description">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section: FAQ */}
      <div className="faq-section">
        <h3>Have a question about renting office space?</h3>
        <p>We're here to answer any of your questions. Click on the questions below to reveal the answers!</p>
        <div className="faq">
          {faqItems.map((faq, index) => (
            <div key={index} className="faq-item">
              <details>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
