import React, { useState } from 'react';
import styles from './page.module.css';
import HomePage from '../components/HomePage';

const Home: React.FC = () => {
  return (
    <div className="">
      <main className="">
        <HomePage />
      </main>
    </div>
  );
};

export default Home;