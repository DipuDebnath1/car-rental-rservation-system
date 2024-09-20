import SectionTitle from "@/shared-components/sectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
const testimonials = [
    {
        id: 1,
        name: 'Jane Doe',
        img: "https://i.ibb.co.com/FD31Q4r/user.jpg",
        review: 'The best car rental experience I’ve ever had! The process was smooth, and the customer service was excellent.',
        rating: 5, 
    },
    {
        id: 2,
        name: 'John Smith',
        img: "https://i.ibb.co.com/TLNKqt4/images.jpg",
        review: 'Wide selection of cars and very competitive prices. Highly recommend for anyone looking to rent a car.',
        rating: 4,
    },
    {
        id: 3,
        name: 'Emily Johnson',
        img: "https://i.ibb.co.com/3Tm67Zz/images.jpg",
        review: 'Exceptional service and support. The 24/7 availability made it so easy to get help when I needed it.',
        rating: 5,
    },
];

const CustomerTestimonials = () => {
    return (
        <section className="bg-white pb-[5rem]">
            <div className="container mx-auto px-4">
                <SectionTitle title="Customer Testimonials" />

                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    }
                  }}
                  modules={[EffectCoverflow, Pagination, Autoplay,  Navigation]}
                  className="mySwiper md:max-h-[15rem]"
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                >
        {
            testimonials.map((client,i)=>  <SwiperSlide key={i} className=''>
            <div className='flex gap-10 flex-col md:flex-row items-center'>
              <div className='md:w-[30%]'> 
                  <img src={client.img} className="rounded" />
              </div>
              <div className='md:w-[60%] text-start'>
                  <h3 className='text-2xl font-semibold'>{client.name}</h3>
                    <ul className='flex text-orange-600 mt-3 gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>

                    </ul>
                  <p className='text-lg mt-3'>{client.review}</p>
              </div>
            </div>
          </SwiperSlide>)
        }
             </Swiper>
            </div>
        </section>
    );
};

export default CustomerTestimonials;

