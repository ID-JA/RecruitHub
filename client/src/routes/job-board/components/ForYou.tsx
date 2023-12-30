import React, { useState } from 'react';
import { jobData } from './jobData';
import { JobOfferCard } from './JobOfferCard';
import { ActionIcon, Button, Card, Group, ScrollArea, Text } from '@mantine/core';
import './jobBoard.css';
import {
  IconBookmark,
  IconCheck,
  IconClock,
  IconCreditCard,
  IconDeviceLaptop
} from '@tabler/icons-react';

export const ForYou: React.FC = () => {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(jobData[0]?.id || null);
  const handleJobCardClick = (id: number) => {
    setSelectedJobId(id);
    setError(null);
  };

  const [error, setError] = useState<string | null>(null);

  const jobList = jobData.map((job) => (
    <JobOfferCard
      key={job.id}
      {...job}
      onClick={handleJobCardClick}
      isSelected={selectedJobId === job.id}
    />
  ));

  const selectedJobDetails =
    selectedJobId !== null ? jobData.find((job) => job.id === selectedJobId) : null;

  return (
    <section className='displaydiv'>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gap: '16px'
        }}
      >
        <ScrollArea h={350} type='always' offsetScrollbars scrollbarSize={6} scrollHideDelay={500}>
          <div>{jobList}</div>
        </ScrollArea>

        <ScrollArea h={350} type='always' offsetScrollbars scrollbarSize={6} scrollHideDelay={500}>
          <div>
            {/*------------------------
              if job is selected 
      ----------------------*/}
            {error && <div>Error: {error}</div>}
            {selectedJobDetails && !error && (
              <Card
                shadow='sm'
                style={{
                  borderRadius: '8px',
                  border: '0.5px solid #B6BBC4',
                  marginTop: '8px'
                }}
              >
                <Card.Section>
                  <Group
                    justify='space-between'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '22px',
                      marginTop: '18px',
                      marginRight: '18px',
                      paddingBottom: '10px'
                    }}
                  >
                    <Text size='sm' style={{ fontWeight: 400 }}>
                      {selectedJobDetails.companyName}
                    </Text>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <ActionIcon variant='outline' aria-label='Save' color='#53A8E6'>
                        <IconBookmark style={{ width: '70%', height: '70%' }} stroke={2} />
                      </ActionIcon>
                      <Button
                        leftSection={<IconCheck size={18} />}
                        radius='md'
                        variant='gradient'
                        gradient={{ from: '#5CB8E6', to: 'blue', deg: 90 }}
                        style={{
                          marginLeft: '8px', // Adjust the spacing between Text and the Button
                          fontWeight: 700,
                          height: '30px'
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </Group>

                  <Text
                    size='xl'
                    style={{ fontWeight: 645, marginLeft: '22px', marginTop: '-6px' }}
                  >
                    {selectedJobDetails.title}
                  </Text>
                  <Text size='sm' style={{ color: '#47494B', fontWeight: 400, marginLeft: '22px' }}>
                    {selectedJobDetails.location}
                  </Text>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <IconClock
                      size={16}
                      style={{ color: '#76797C', marginLeft: '30px', marginTop: '6px' }}
                    ></IconClock>
                    <Text
                      size='xs'
                      style={{ color: '#76797C', marginLeft: '6px', marginTop: '5px' }}
                    >
                      {selectedJobDetails.postedDate}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <IconDeviceLaptop
                      size={16}
                      style={{ color: '#76797C', marginLeft: '30px', marginTop: '6px' }}
                    ></IconDeviceLaptop>
                    <Text
                      size='xs'
                      style={{ color: '#76797C', marginLeft: '6px', marginTop: '5px' }}
                    >
                      {selectedJobDetails.jobType}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <IconCreditCard
                      size={16}
                      style={{ color: '#76797C', marginLeft: '30px', marginTop: '6px' }}
                    ></IconCreditCard>
                    <Text
                      size='xs'
                      style={{ color: '#76797C', marginLeft: '6px', marginTop: '5px' }}
                    >
                      {selectedJobDetails.salary}
                    </Text>
                  </div>
                </Card.Section>

                <Card.Section style={{ marginTop: '25px' }}>
                  <Text size='sm' style={{ marginLeft: '22px', marginRight: '22px' }}>
                    {' '}
                    {selectedJobDetails.aboutCompany}
                  </Text>
                  <Text size='sm' style={{ marginLeft: '22px' }}>
                    {' '}
                    <br></br>
                  </Text>
                </Card.Section>

                <Card.Section>
                  <Text size='sm' style={{ marginLeft: '22px', marginRight: '22px' }}>
                    {selectedJobDetails.jobDescription}
                  </Text>
                </Card.Section>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};
export default ForYou;
