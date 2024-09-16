import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import SectionTitle from '@/shared-components/sectionTitle/SectionTitle';
import { useAppSelector } from '@/redux/hooks';

const FeaturedCars = () => {
  const featuredCars = useAppSelector(state=>state.cars.cars)

    return (
        <section className="pt-[7rem] px-5">
            <SectionTitle title='Featured Cars:' />
             <Swiper
              className="mySwiper"
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay,  Navigation]}
            >
         {featuredCars!.map((car,i) => ( <SwiperSlide key={i}><div  className="bg-white border shadow-lg rounded-lg overflow-hidden">
                <img src={'https://i.ibb.co.com/Fg1ZPV3/team-left.png'} alt={car.name} className="w-full h-[20rem] object-cover" />
                <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p className="text-gray-600 mb-2">{car.description}</p>
                    <p className="text-blue-500 font-bold">$ {car.pricePerHour}</p>
                    <Link to={`/car/${car._id}`} className="block mt-4 text-blue-500 hover:underline">
                        View Details
                    </Link>
                </div>
            </div></SwiperSlide>

            
        ))}
             </Swiper>
        </section>
    );
};

export default FeaturedCars;
