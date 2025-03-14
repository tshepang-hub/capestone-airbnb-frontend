import React from 'react';
import Banner from "../Banner/Banner"
import Discover from "../Discover/Discover";
import Footer from "../Footer/Footer";
import GiftCards from "../GiftCards/GiftCards";
import HostingQuestions from "../HostingQuestions/HostingQuestions";
import InspirationGetaways from "../InspirationGateway/InspirationGetaways";
import Navbar from "../Navbar/homeNav/Navbar"
import NextTrip from '../NextTrip/NextTrip';
import Search from "../Search/Search"
import "./Home.css";

const Home = () => {

  return (
    <div className="home-container">
      <header style={{ background: "black" }}>
        <Navbar />
        <Search />
        <Banner />
      </header>
      <main>
        <NextTrip />
        <Discover />
        <GiftCards />
        <HostingQuestions />
        <InspirationGetaways />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
