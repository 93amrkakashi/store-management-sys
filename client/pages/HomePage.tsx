import React from 'react';
import Layout from '../components/Layout';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';

const HomePage: React.FC = () => {
  return (
    <div>
      <SignIn />
      <br />
      <hr />
      <br />
      <SignUp />
    </div>
  )
};

export default HomePage;
