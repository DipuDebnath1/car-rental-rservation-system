import SectionTitle from '@/shared-components/sectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO', img: 'https://i.ibb.co.com/FD31Q4r/user.jpg' },
    { name: 'Jane Smith', role: 'COO', img: 'https://i.ibb.co.com/TLNKqt4/images.jpg' },
    { name: 'Emily Brown', role: 'Head of Sales', img: 'https://i.ibb.co.com/3Tm67Zz/images.jpg' },
  ];

  const fleetInfo = [
    { type: 'Economy Cars', description: 'Affordable and fuel-efficient cars for everyday use.' },
    { type: 'Luxury Cars', description: 'Premium vehicles for comfort and style.' },
    { type: 'SUVs', description: 'Spacious cars with powerful performance, perfect for families and off-road adventures.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <span className="text-2xl font-bold text-gray-800">FlexiCar</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Company History Section */}
      <section className="mt-10">
        <SectionTitle title='Our History' />
        <p className="text-gray-600">
          FlexiCar was founded in 2010 with the vision of providing affordable, reliable car rentals for everyone. 
          Over the past decade, we have grown to offer a wide variety of vehicles and services to cater to every 
          customer’s needs. Our mission is to make car rentals easy and accessible for all, while maintaining a commitment 
          to sustainability and excellent customer service.
        </p>
      </section>

      {/* Our Team Section */}
      <section className="mt-10">
      <SectionTitle title='Our Team' />
        <div className="flex flex-wrap space-x-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <img src={member.img} alt={member.name} className="rounded-full w-32 h-32 mb-4 mx-auto object-cover border-4"/>
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Fleet Section */}
      <section className="mt-10">
      <SectionTitle title='Our Fleet' />
        <div className="grid md:grid-cols-3 gap-6">
          {fleetInfo.map((fleet, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-2">{fleet.type}</h4>
              <p className="text-gray-600">{fleet.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values & Commitment Section */}
      <section className="mt-10">
      <SectionTitle title='Our Values & Commitment' />
        <p className="text-gray-600">
          At FlexiCar, we believe in putting our customers first. Our commitment to providing top-tier customer service 
          drives every decision we make. We are also dedicated to sustainable practices, ensuring that our fleet includes 
          eco-friendly options such as electric cars and hybrids. With 24/7 support, we are here to assist you whenever you need.
        </p>
      </section>

      {/* Contact Information Section */}
      <section className="mt-10">
      <SectionTitle title='Contact Us' />
        <p className="text-gray-600">We would love to hear from you! Feel free to reach out through any of the following methods:</p>
        <ul className="mt-4">
          <li>
            <span className="font-semibold">Phone:</span>  +880155454
          </li>
          <li>
            <span className="font-semibold">Email:</span> info@flexicar.com
          </li>
          <li>
            <span className="font-semibold">Address:</span> 123 Car Lane, Drive City, Thakurgaon 5100
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
