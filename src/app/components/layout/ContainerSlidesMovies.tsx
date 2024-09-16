"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "./Container";
import Slide from "../movie/Slide";
import { Movies } from "@/app/types/movieTypes";
import { MovieCast } from "@/app/types/castTypes";


interface ContainerSlidesMoviesProps {
  data: Movies | MovieCast ;
  title: string;
  showViewAll?:boolean;
  hrefShowAll?: string
}

const ContainerSlidesMovies: React.FC<ContainerSlidesMoviesProps> = ({
  data,
  title,
  showViewAll,
  hrefShowAll
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // No renderizar Swiper en el servidor


  const isMovies = 'results' in data;

  return (
    <section className="py-8">
      <Container>
        <div className="py-3 flex items-end justify-between">
          <div>
            <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] text-slate-900 sm:font-bold font-semibold border-b-2 border-slate-900 inline-block">
              {title}
            </h3>
          </div>
          {
            showViewAll &&( <Link href={hrefShowAll || '/'} className="sm:py-1 py-[2px] sm:text-[14px] xs:text-[12.75px] text-[12px] sm:px-4 px-3 rounded-full text-gray-700 hover:-translate-y-1 transition-all duration-300 border-r-gray-700 cursor-pointer">
              View all
            </Link>)
          }
         
        </div>

        <Swiper spaceBetween={5} slidesPerView={7}>
          {isMovies
            ? data?.results?.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Slide data={movie} />
                </SwiperSlide>
              ))
            : data?.cast?.map((castMember) => (
                <SwiperSlide key={castMember.id}>
                  <Slide data={castMember} />
                </SwiperSlide>
              ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default ContainerSlidesMovies;
