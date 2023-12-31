import { Link, Route, useNavigate } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  rem,
  Flex,
  PasswordInput
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { axiosInstance } from '../../utils';
import { useState } from 'react';


export function ResetPassword() {
  const [error,setError]=useState(null);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    password: '',
    code: '',
  });

  const handleInputChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleReset=async()=>{
    try {
      const response= await axiosInstance.post('/password/reset', {
        password
      }); 
      if(response){
        navigate({
          replace: true,
          to: '/reset-password'
        }); 
      }
      
    } catch (error) {
      if (error.response) {
          if (error.response.data.errors) {
          setError(error.response.data.errors.email)
        }
  
      } 
    }
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value)
    if(error!=null){
      setError(null)
    }
  }
  return (
    <Container h='100vh'>
      <Flex align='center' justify='center' h='100vh' maw='500px' m='auto' w='100%'>
        <Paper withBorder p={30} radius='md' w='100%'>
          <Title order={3} ta='center'>
            Reset Your Password
          </Title>
          <Text c='dimmed' fz='sm' ta='center'>
            Check the reset code in your email inobx.
          </Text>
          <TextInput 
            name='code'
            value={formData.code}
            onChange={handleInputChange}
            label='Enter reset code' 
            placeholder='code' 
            error={error}
            required 
          />
          <PasswordInput 
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            label='Enter Your New Password' 
            placeholder='password' 
            error={error}
            required 
          />
          <Group justify='space-between' mt='lg'>
            <Anchor c='dimmed' size='sm'>
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Link to='/login'>
                  <Text ml={5}>Back to the login page</Text>
                </Link>
              </Center>
            </Anchor>
            <Button onClick={handleReset}>Reset password</Button>
          </Group>
        </Paper>
      </Flex>
    </Container>
  );
}


export const resetPasswordRoute = new Route({
  path: 'reset-password',
  component: ResetPassword,
  getParentRoute: () => defaultLayoutRoute
});
