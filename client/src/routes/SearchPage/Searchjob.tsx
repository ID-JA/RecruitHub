import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Container, Grid, Title, Input, CloseButton, Button } from '@mantine/core';
import { IconCurrentLocation, IconSearch } from '@tabler/icons-react';
import './Searchjob.css';
import image from './images/searchjob.jpg';
import SearchedCard from './SearchedJobCard';
import google from './images/google.png';
import microsoft from './images/microsoft.png';
import alten from './images/alten.png';
import capgemini from './images/capgemini.webp';
import { useState } from 'react';
import { CheckIcon, Combobox, Group, InputBase, useCombobox } from '@mantine/core';

const timeOptions = ['Date posted', 'Last day', 'Last week', 'Last month'];

export const Searchjob = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  // Fake data for demonstration
  const fakeJobs = [
    {
      id: 1,
      companylogo: google,
      title: 'Frontend Developer',
      companyname: 'ABC Company',
      salary: '$80,000 - $100,000',
      joblocation: 'City A',
      postedat: '2020'
    },
    {
      id: 2,
      companylogo: microsoft,
      title: 'Backend Developer',
      companyname: 'ABC Company',
      salary: '$80,000 - $100,000',
      joblocation: 'City B'
    },
    {
      id: 3,
      companylogo: capgemini,
      title: 'UI/UX Designer',
      companyname: 'ABC Company',
      salary: '$80,000 - $100,000',
      joblocation: 'City C'
    },
    {
      id: 4,
      companylogo: alten,
      title: 'Data Scientist',
      companyname: 'ABC Company',
      salary: '$80,000 - $100,000',
      joblocation: 'City D'
    },
    {
      id: 1,
      companylogo: google,
      title: 'Frontend Developer',
      companyname: 'ABC Company',
      joblocation: 'City A'
    },
    {
      id: 2,
      companylogo: microsoft,
      title: 'Backend Developer',
      companyname: 'ABC Company',
      joblocation: 'City B'
    },
    {
      id: 3,
      companylogo: alten,
      title: 'UI/UX Designer',
      companyname: 'ABC Company',
      joblocation: 'City C'
    },
    {
      id: 4,
      companylogo: capgemini,
      title: 'Data Scientist',
      companyname: 'ABC Company',
      joblocation: 'City D'
    }
    // Add more fake data as needed
  ];

  const [jobs] = useState(fakeJobs);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    }
  });

  const [selectedTime, setSelectedTime] = useState<string>('Date posted');

  const options = timeOptions.map((option) => (
    <Combobox.Option value={option} key={option} active={option === selectedTime}>
      <Group gap='xs'>
        {option === selectedTime && <CheckIcon size={8} />}
        <span>{option}</span>
      </Group>
    </Combobox.Option>
  ));
  return (
    <Container>
      {/*-----------------------------
                 Hero
      -----------------------------*/}
      <section className='heroS' id='heroS'>
        <Container>
          <Grid>
            <Grid.Col span={6}>
              <div style={{ marginBottom: '36px', maxWidth: '800px' }}>
                <Title className='heroS-title'>
                  Find a job that suits <br></br>your interest & skills.
                </Title>

                <Group gap='xs'>
                  <Input
                    leftSection={<IconSearch size={16} />}
                    placeholder='Job title, keyword...'
                    value={value1}
                    onChange={(event) => setValue1(event.currentTarget.value)}
                    rightSectionPointerEvents='all'
                    mt='md'
                    rightSection={
                      <CloseButton
                        aria-label='Clear input'
                        onClick={() => setValue1('')}
                        style={{ display: value1 ? undefined : 'none' }}
                      />
                    }
                    style={{ width: '360px', marginBottom: '-15px' }}
                  />
                  <Input
                    leftSection={<IconCurrentLocation size={16} />}
                    placeholder='Your Location'
                    value={value2}
                    onChange={(event) => setValue2(event.currentTarget.value)}
                    rightSectionPointerEvents='all'
                    mt='md'
                    rightSection={
                      <CloseButton
                        aria-label='Clear input'
                        onClick={() => setValue2('')}
                        style={{ display: value2 ? undefined : 'none' }}
                      />
                    }
                    style={{ width: '360px' }}
                  />
                  <Button
                    radius='sm'
                    variant='gradient'
                    gradient={{ from: 'blue', to: '#8FBBE7', deg: 90 }}
                    type='submit'
                    size='sm'
                    style={{ width: '90px', marginTop: '0px' }}
                  >
                    Search
                  </Button>
                  <Combobox
                    size='xs'
                    store={combobox}
                    resetSelectionOnOptionHover
                    withinPortal={false}
                    onOptionSubmit={(val) => {
                      setSelectedTime(val);
                      combobox.updateSelectedOptionIndex('active');
                    }}
                  >
                    <Combobox.Target targetType='button'>
                      <InputBase
                        component='button'
                        type='button'
                        pointer
                        rightSection={<Combobox.Chevron />}
                        rightSectionPointerEvents='none'
                        onClick={() => combobox.toggleDropdown()}
                        style={{ width: '130px' }}
                      >
                        {selectedTime || <span>Pick time</span>}
                      </InputBase>
                    </Combobox.Target>

                    <Combobox.Dropdown>
                      <Combobox.Options>{options}</Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
                </Group>
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div>
                <figure className='img'>
                  <img src={image} alt='Image' />
                </figure>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </section>
      {/*-----------------------------
                 Results
      -----------------------------*/}
      <section className='results'>
        <Container>
          <Grid>
            {jobs.map((job) => (
              <Grid.Col span={3} key={job.id}>
                <SearchedCard job={job} />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </section>
    </Container>
  );
};

export const SearchjobRoute = new Route({
  path: 'search-job',
  component: Searchjob,
  getParentRoute: () => defaultLayoutRoute
});
