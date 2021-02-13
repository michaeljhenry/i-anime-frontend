import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

const AnimeCarousel = () => {
  const animeArray = [
    {
      title: "Naruto",
      image: "/images/naruto-team-7.jpg",
      mal_id: 20,
    },
    {
      title: "Attack on Titan",
      image: "/images/attack-on-titan.jpg",
      mal_id: 16498,
    },
    {
      title: "Jujutsu Kaisen",
      image: "/images/jujutsu-kaisen.jpg",
      mal_id: 40748,
    },
    {
      title: "YuYu Hakusho",
      image: "/images/yuyu-hakusho.jpg",
      mal_id: 392,
    },
    {
      title: "Haikyuu",
      image: "/images/haikyuu.jpg",
      mal_id: 20583,
    },
  ];
  return (
    <Carousel pause="hover">
      {animeArray.map((anime) => (
        <Carousel.Item key={anime.title}>
          <Link to={`/animedetails/${anime.mal_id}`}>
            <Image src={anime.image} alt={anime.title} fluid />
            <Carousel.Caption className="carousel-caption">
              <h1>{anime.title}</h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AnimeCarousel;
