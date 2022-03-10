import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10%;
  color: gray;
`;

const Title = styled.span`
  margin-right: 30px;
`;

const RefreshButton = styled.button`
  margin-right: 20px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  background-color: #4CAF50;
  border: none;
  color: #FFFFFF;
  padding: 15px 32px;
  text-align: center;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingText = styled.div`
  font-size: 26px;
`;

const Email = styled.div`
  font-size: 12px;
  color: cornflowerblue;
`;

const LoadingContanier = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`;

interface IUser {
  email: string,
  title: string,
  first: string,
  last: string
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { results } } = await axios.get('https://randomuser.me/api');
      const { email, name: { title, first, last } } = results[0];
      setUser({ email, title, first, last });
      localStorage.setItem('user', JSON.stringify({ email, title, first, last }));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      {loading ?
        <LoadingContanier>
          <LoadingText>Loading</LoadingText>
          <PulseLoader size={5} color='gray' />
        </LoadingContanier> :
        <>
          <RefreshButton onClick={getData}>Refresh</RefreshButton>
          <InfoContainer>
            <Title>{user?.title} {user?.first} {user?.last} </Title>
            <Email>{user?.email}</Email>
          </InfoContainer>
        </>}
    </Container>
  );
}

export default App;
