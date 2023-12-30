import React from 'react';
import { Card, Text, Button, Grid } from '@mantine/core';
import './Searchjob.css';

interface CardProps {
  job: {
    id: number;
    title: string;
    companylogo?: string;
    companyname: string;
    salary?: string;
    joblocation: string;
    postedat?: string;
  };
}

const SearchedCard: React.FC<CardProps> = ({ job }) => {
  return (
    <Card
      className='myCard'
      shadow='lg'
      radius='lg'
      style={{ height: '235px', position: 'relative' }}
    >
      <Grid>
        <Grid.Col span={3}>
          {job.companylogo ? (
            <img
              src={job.companylogo}
              alt={`${job.companyname} logo`}
              style={{ width: '38px', height: '38px', borderRadius: '20%' }}
            />
          ) : (
            <div
              style={{
                width: '42px',
                height: '42px',
                backgroundColor: 'white',
                display: 'flex',
                color: 'grey',
                fontSize: '14px',
                textAlign: 'center'
              }}
            >
              {job.companyname}
            </div>
          )}
        </Grid.Col>

        <Grid.Col span={12}>
          <Text style={{ fontSize: '18px', fontWeight: '500' }}>{job.title}</Text>
          <Text style={{ color: '#47494B', fontSize: '16px', marginBottom: '5px' }}>
            {job.companyname}
          </Text>

          <Text style={{ color: '#47494B', fontSize: '14px' }}>{job.joblocation}</Text>

          <Text style={{ color: '#47494B', fontSize: '14px' }}>{job.salary}</Text>

          <Text style={{ color: '#47494B', fontSize: '14px' }}>{job.postedat}</Text>
        </Grid.Col>

        <Grid.Col
          span={12}
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <a href='/apply-job'>
            <Button
              className='applyButton'
              color='blue'
              radius='md'
              variant='transparent'
              style={{ height: '26px' }}
            >
              Apply Now
            </Button>
          </a>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default SearchedCard;
