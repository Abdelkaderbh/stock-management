import { Avatar, Flex, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import React, { useEffect ,useState} from 'react'
import { jwtDecode } from 'jwt-decode';


const Navbar = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.email);
    }
  }, []);

  return (
    <Flex align='center' justify='space-between'>
        <Typography.Title level={5} type='secondary'>
            Bonjour, {email}
        </Typography.Title>

        <Flex align='center' gap={"3rem"}>
            <Search placeholder='Chercher produits ...' allowClear />
        </Flex>
    </Flex>
  )
}

export default Navbar