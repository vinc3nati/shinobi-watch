import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { HomeBanner } from "./HomeBanner";

export const Home = ({ title }) => {
  useDocumentTitle(title);
  return (
    <>
      <section id="home">
        <header className="home-hero">
          <div className="text-overlay">
            <h1 className="text-primary">Relive Anime</h1>
            <p>Best and fun way to watch anime!</p>
            <Link to="/explore" className="btn tertiary">
              explore
            </Link>
          </div>
        </header>
        <main>
          <HomeBanner
            image="https://res.cloudinary.com/randomwave45/image/upload/v1650009612/naruto-g6c7a1d375_1920_wqr1rh.png"
            title="Naruto Exculsive content"
            description="Top naruto videos that will give you nostalgia"
            navigateTo="/explore/?type=thriller"
            reversed={false}
          />
          <HomeBanner
            image="https://res.cloudinary.com/randomwave45/image/upload/v1650022195/one_piece_2_jcjkvz.jpg"
            title="Intense Fight Scenes"
            description="Watch fights that changed the world"
            navigateTo="/explore/?type=action"
            reversed={true}
          />
          <HomeBanner
            image="https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg"
            title="Jokes you can't ignore"
            description="Watch funniest anime compilations"
            navigateTo="/explore/?type=comedy"
            reversed={false}
          />
          <HomeBanner
            image="https://res.cloudinary.com/randomwave45/image/upload/v1650022195/saitama_isaxm6.jpg"
            title="Power comparisons"
            description="Watch where your favourite character ranks."
            navigateTo="/explore/?type=comparison"
            reversed={true}
          />
        </main>
      </section>
      <Footer />
    </>
  );
};
