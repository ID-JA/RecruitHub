import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../../layouts/portal-layout';
import { Button,  Container, Grid,  PasswordInput, TagsInput, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { notifications } from '@mantine/notifications';
import { TSettingData } from '../../types';
import { useAuthStore } from '../../store';

const schema = z.object({ 
  password: z.string(),
  name: z.string(),
  email: z.string(),
  experience: z.array(z.string().min(1)),
  website: z.string(),
  industry: z.string(),
  about: z.string(),
  location: z.string(),
  zip: z.string()
});
function Settings() {
  const {user} = useAuthStore();
  const [loading,setLoading]=useState(true)
  const mutation = useMutation({
    mutationFn: async (data: TSettingData) => {
      const response = await axiosInstance.post('/recruiter/update-profile', data);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green'
      });
    },
    onError: (error) => {
      console.log(
        '🚀 ~ file: settings.tsx:45 ~ updateProfile ~ error:',
        error
      );
    }
  });
  const form = useForm<TSettingData>({
    validate: zodResolver(schema),
    initialValues: {
      password: "",
      name: "",
      email: "",
      experience: [],
      website: "",
      industry: "",
      about: "",
      location: "",
      zip:"",
    }
  });
  useEffect(()=>{
    if(user!==null){
      form.setFieldValue('name', user.name);
      form.setFieldValue('email', user.email);
      form.setFieldValue('experience', user.profile.experience);
      form.setFieldValue('website', user.profile.website);
      form.setFieldValue('industry', user.profile.industry);
      form.setFieldValue('about', user.profile.about);
      form.setFieldValue('location', user.profile.location);
      form.setFieldValue('zip', user.profile.zip);
      setLoading(false)
    }
  },[user])


  return (
    <>
      
      <form>
        <Container my="md">
        <Title  my='md'>
            Settings
        </Title>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 12 }}>
              <TextInput
                label='Name'
                placeholder='Enter new name'
                withAsterisk
                disabled={loading}
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 6 }}>
              <TextInput
                label='Email'
                placeholder='Enter new email'
                withAsterisk
                disabled={loading}
                {...form.getInputProps('email')}
              />  
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 6 }}>
              <PasswordInput
                label='Password'
                placeholder='Enter new password'
                withAsterisk
                disabled={loading}
                {...form.getInputProps('password')}       
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12 }}>
            <TagsInput
                label='Experience'
                placeholder='Enter new experiences'
                withAsterisk
                disabled={loading}
                {...form.getInputProps('experience')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:  6}}>
            <TextInput
                label='Website'
                placeholder='Enter new website'
                withAsterisk
                disabled={loading}
                {...form.getInputProps('website')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:  6}}>
            <TextInput
                label='Industry'
                placeholder='Enter new industry'
                withAsterisk
                disabled={loading}
                {...form.getInputProps('industry')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:  6}}>
            <TextInput
                label='Location'
                placeholder='Enter new location'
                withAsterisk
                disabled={loading}
                {...form.getInputProps('location')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:  6}}>
              <TextInput
                  label='Zip'
                  placeholder='Enter new Zip'
                  withAsterisk
                  disabled={loading}
                  {...form.getInputProps('zip')}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:  12}}>
            <TextInput
                label='About You'
                placeholder='Tell us more about you'
                withAsterisk
                disabled={loading}
                {...form.getInputProps('about')}
              />  
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:  6}}>
              <Button
                disabled={loading}
                onClick={form.onSubmit((values) => {
                  mutation.mutate({
                    ...values,
                    status: 'active'
                  });
                })}
                loading={mutation.isPending}
                type='submit'
              >
                Update
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </form>

    </>
  );
}

export const settingsRoute = new Route({
  component: Settings,
  path: 'settings',
  getParentRoute: () => portalLayoutRoute
});
