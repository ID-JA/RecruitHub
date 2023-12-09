import { ActionIcon, Button, Card, Grid, Group, ScrollArea, Text } from '@mantine/core';
import {
  IconBookmark,
  IconBuilding,
  IconCheck,
  IconClock,
  IconDeviceLaptop
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { jobData } from './jobData';

export interface JobCardProps {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string;
  onClick: (id: number) => void;
  companyLogo: string;
  jobType: string;
  isSaved: boolean; // New property
}

const ForYou: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(jobData[0]?.id || null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const handleJobCardClick = (id: number) => {
    setSelectedJob(id);
  };

  const handleBookmarkClick = () => {
    if (selectedJob !== null) {
      setSavedJobs((prevSavedJobs) => {
        const isJobSaved = prevSavedJobs.includes(selectedJob);
        if (isJobSaved) {
          return prevSavedJobs.filter((jobId) => jobId !== selectedJob);
        } else {
          return [...prevSavedJobs, selectedJob];
        }
      });
    }
  };

  const isJobSaved = selectedJob !== null && savedJobs.includes(selectedJob);

  const jobList = jobData.map((job) => (
    <JobCard
      key={job.id}
      {...job}
      onClick={handleJobCardClick}
      isSaved={savedJobs.includes(job.id)}
    />
  ));

  const selectedJobDetails =
    selectedJob !== null ? jobData.find((job) => job.id === selectedJob) : null;

  function JobCard({
    id,
    companyName,
    jobTitle,
    location,
    onClick,
    companyLogo,
    jobType
  }: JobCardProps): JSX.Element {
    const isSelected: boolean = id === selectedJob;

    return (
      <Card
        padding='md'
        style={{
          borderBottom: '0.5px solid #B6BBC4',
          cursor: 'pointer',
          borderLeft: isSelected ? '3px solid #B6BBC4' : '3px solid white',
          backgroundColor: isSelected ? '#EBF7FF' : 'white' // Background color based on isSelected
        }}
        onClick={() => onClick(id)}
      >
        <Grid>
          {/* Left Column: Image */}
          <Grid.Col
            span={3}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={`${companyName} logo`}
                style={{ width: '42px', height: '42px', borderRadius: '50%' }}
              />
            ) : (
              <div
                style={{
                  width: '50%',
                  height: '50%',
                  backgroundColor: '#ddd',
                  borderRadius: '50%'
                }}
              />
            )}
          </Grid.Col>

          {/* Right Column: Text */}
          <Grid.Col span={9}>
            <Card.Section>
              <Text
                size='lg'
                style={{
                  color: '#0A66C2',
                  fontWeight: 600,
                  marginLeft: '8px',
                  padding: '6px',
                  textDecoration: 'none', // Initial text decoration (no underline)
                  transition: 'text-decoration 0.3s' // Smooth transition for text-decoration changes
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline'; // Underline on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none'; // Remove underline on hover out
                }}
              >
                {jobTitle}
              </Text>
              <Text size='xs' style={{ color: '#47494B', marginBottom: '2px', marginLeft: '14px' }}>
                {companyName}
              </Text>
              <Text size='sm' style={{ color: '#47494B', marginBottom: '2px', marginLeft: '14px' }}>
                {location}
              </Text>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <IconDeviceLaptop size={16} style={{ color: '#76797C', marginLeft: '18px' }} />
                <Text size='xs' style={{ color: '#76797C', marginLeft: '6px' }}>
                  {jobType}
                </Text>
              </div>
            </Card.Section>
          </Grid.Col>
        </Grid>
      </Card>
    );
  }

  return (
    // Content of ForYouPanel
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr', // Adjusted grid columns
          gap: '18px'
        }}
      >
        <ScrollArea
          h={350}
          type='always'
          offsetScrollbars
          scrollbarSize={6}
          scrollHideDelay={500}
          mt='xs'
        >
          <div>{jobList}</div>
        </ScrollArea>
        <ScrollArea
          h={350}
          type='always'
          offsetScrollbars
          scrollbarSize={6}
          scrollHideDelay={500}
          mt='xs'
        >
          <div>
            {selectedJobDetails && (
              <Card
                shadow='sm'
                padding='md'
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
                      <ActionIcon
                        variant={isJobSaved ? 'filled' : 'outline'}
                        aria-label='Save'
                        color='#53A8E6'
                        onClick={handleBookmarkClick}
                      >
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
                    {selectedJobDetails.jobTitle}
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
                    <IconBuilding
                      size={16}
                      style={{ color: '#76797C', marginLeft: '30px', marginTop: '6px' }}
                    ></IconBuilding>
                    <Text
                      size='xs'
                      style={{ color: '#76797C', marginLeft: '6px', marginTop: '5px' }}
                    >
                      {selectedJobDetails.companySize}
                    </Text>
                  </div>
                </Card.Section>

                <Card.Section style={{ marginTop: '25px' }}>
                  <Text size='sm' style={{ marginLeft: '22px', marginRight: '22px' }}>
                    {' '}
                    {selectedJobDetails.companyDescription}
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
    </div>
  );
};

export default ForYou;
