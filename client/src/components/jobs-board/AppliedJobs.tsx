import { ActionIcon, Button, Card, Checkbox, Grid, Group, ScrollArea, Text } from '@mantine/core';
import { IconBuilding, IconClock, IconDeviceLaptop, IconHeart } from '@tabler/icons-react';
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
}

const AppliedJobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(jobData[0]?.id || null);

  const handleJobCardClick = (id: number) => {
    setSelectedJob(id);
  };

  const jobList = jobData.map((job) => (
    <JobCard key={job.id} {...job} onClick={handleJobCardClick} />
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
          borderRadius: '0%',
          borderBottom: '0.5px solid #53A8E6',
          cursor: 'pointer',
          borderLeft: isSelected ? '3px solid #A5D2F2' : '3px solid white',
          backgroundColor: isSelected ? '#F5FBFF' : 'white' // Background color based on isSelected
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
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <div style={{ flex: 9 }}>
                  <Text
                    size='lg'
                    style={{
                      color: '#0A66C2',
                      fontWeight: 600,
                      marginLeft: '8px',
                      padding: '6px',
                      textDecoration: 'none',
                      transition: 'text-decoration 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {jobTitle}
                  </Text>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <ActionIcon variant='transparent' aria-label='Save' color='#53A8E6'>
                    <IconHeart style={{ width: '80%', height: '80%' }} stroke={2} />
                  </ActionIcon>{' '}
                </div>
              </div>
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
          <div>{selectedJobDetails && <JobPreview jobDetails={selectedJobDetails} />}</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AppliedJobs;

type JobDetails = {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string;
  companyDescription: string;
  jobDescription: string;
  postedDate: string;
  jobType: string;
  companySize: string;
  companyLogo: string;
};

function JobPreview({ jobDetails }: { jobDetails: JobDetails | null }): JSX.Element | null {
  if (!jobDetails) {
    return null;
  }

  return (
    <Card
      shadow='sm'
      padding='md'
      style={{
        border: '0.5px solid #B6BBC4',
        marginTop: '8px'
      }}
    >
      <Card.Section
        style={{
          paddingBottom: '16px'
        }}
      >
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
            {jobDetails.companyName}
          </Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              leftSection={<IconHeart size={18} />}
              radius='md'
              variant='outline'
              gradient={{ from: '#5CB8E6', to: 'blue', deg: 90 }}
              style={{
                marginLeft: '8px', // Adjust the spacing between Text and the Button
                fontWeight: 700,
                height: '30px'
              }}
            >
              Save
            </Button>
          </div>
        </Group>

        <Text size='xl' style={{ fontWeight: 645, marginLeft: '22px', marginTop: '-6px' }}>
          {jobDetails.jobTitle}
        </Text>
        <Text size='sm' style={{ color: '#47494B', fontWeight: 400, marginLeft: '22px' }}>
          {jobDetails.location}
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
          <Text size='xs' style={{ color: '#76797C', marginLeft: '6px', marginTop: '5px' }}>
            {jobDetails.postedDate}
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
          <Text size='xs' style={{ color: '#76797C', marginLeft: '6px', marginTop: '5px' }}>
            {jobDetails.jobType}
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
          <Text size='xs' style={{ color: '#76797C', marginLeft: '6px', marginTop: '5px' }}>
            {jobDetails.companySize}
          </Text>
        </div>
      </Card.Section>

      <Card.Section
        style={{
          paddingTop: '10px',
          paddingBottom: '16px'
        }}
      >
        <Text size='sm' style={{ fontWeight: 600, marginLeft: '28px', marginBottom: '20px' }}>
          Job Status
        </Text>
        <Text size='sm' style={{ marginLeft: '36px', marginRight: '22px' }}>
          {' '}
          <Grid>
            <Grid.Col span={4}>
              <Checkbox defaultChecked label='Applied' size='xs' />
            </Grid.Col>
            <Grid.Col span={4}>
              <Checkbox defaultChecked label='Interviewing' size='xs' />
            </Grid.Col>
            <Grid.Col span={4}>
              <Checkbox defaultChecked label='Landed job' size='xs' />
            </Grid.Col>
          </Grid>
        </Text>
      </Card.Section>

      <Card.Section style={{ marginTop: '16px' }}>
        <Text size='sm' style={{ marginLeft: '22px', marginRight: '22px' }}>
          {' '}
          {jobDetails.companyDescription}
        </Text>
        <Text size='sm' style={{ marginLeft: '22px' }}>
          {' '}
          <br></br>
        </Text>
      </Card.Section>

      <Card.Section>
        <Text size='sm' style={{ marginLeft: '22px', marginRight: '22px' }}>
          {jobDetails.jobDescription}
        </Text>
      </Card.Section>
    </Card>
  );
}
