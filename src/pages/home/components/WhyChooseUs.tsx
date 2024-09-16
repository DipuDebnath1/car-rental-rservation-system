import SectionTitle from "@/shared-components/sectionTitle/SectionTitle";

const WhyChooseUs = () => {
    const features = [
        {
            title: 'Best Prices',
            description: 'We offer competitive pricing to ensure you get the best deals on all car rentals.',
            icon: '💵', 
        },
        {
            title: 'Wide Selection',
            description: 'Choose from a wide range of vehicles, including luxury, electric, and budget-friendly cars.',
            icon: '🚗',
        },
        {
            title: '24/7 Support',
            description: 'Our customer service team is available 24/7 to assist you with any questions or concerns.',
            icon: '🕐',
        },
    ];

    return (
        <section className="py-[7rem]">
            <div className="container mx-auto px-4 ">
                <SectionTitle title="Why Chose Us" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-50 border shadow-lg p-6 rounded-lg">
                            <div className="text-5xl mb-4">{feature.icon}</div> {/* Replace with actual icon if needed */}
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
