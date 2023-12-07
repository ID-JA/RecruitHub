import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Card, Container, Tabs, Text, ScrollArea, Button, Grid, Group } from '@mantine/core';
import { TextInput, ActionIcon, rem } from '@mantine/core';
import {
  IconSearch,
  IconArrowRight,
  IconCheck,
  IconClock,
  IconBuilding,
  IconDeviceLaptop,
  IconBookmark,
  IconHeart
} from '@tabler/icons-react';
import classes from './DoubleHeader.module.css';
import { useState } from 'react';
import companyLogo1 from '../../assets/company1.webp';
import companyLogo2 from '../../assets/company2.webp';

// Sample job data
const jobData = [
  {
    id: 1,
    companyName: 'Beckman Coulter Diagnostics',
    jobTitle: 'Software Engineer I',
    location: 'West Sacramento, CA',
    companyDescription:
      'Beckman Coulter Diagnostics is proud to work alongside a community of six fellow Diagnostics Companies at Danaher. Together, we’re working at the pace of change to improve patient lives with diagnostic tools that address the world’s biggest health challenges.',
    jobDescription:
      ' The Software Engineer I for Beckman Coulter Diagnostics is responsible for design and development of new product software features and/or maintenance of existing product software features to meet the needs of Microbiology  Beckman Coulter, our vision is to relentlessly reimagine healthcare, one diagno sis at a time.You will be a part of the Software Engineering team and report to the Senior Manager of Software Engineering responsible for Microbiology software within a medical device system. If you thrive in a fast-paced role and want to work to build a world-class R&D organization—read In this role, you will have the opportunity  Work in cross-functional project teams on all phases of software development Perform and document software feasibility tasksDesign and implement software features and automated unit tests Investigate and correct software defects Drive software development tasks to meet project milestones and commitments',
    postedDate: 'Posted 2 days ago',
    jobType: 'Full-time',
    companySize: '5 000-10 000',
    companyLogo: companyLogo1
  },
  {
    id: 2,
    companyName: 'Innovative Designs Ltd.',
    jobTitle: 'UX/UI Designer',
    location: 'New York, NY',
    companyDescription:
      'Beckman Coulter Diagnostics is proud to work alongside a community of six fellow Diagnostics Companies at Danaher. Together, we’re working at the pace of change to improve patient lives with diagnostic tools that address the world’s biggest health challenges.',
    jobDescription:
      ' The Software Engineer I for Beckman Coulter Diagnostics is responsible for design and development of new product software features and/or maintenance of existing product software features to meet the needs of Microbiology  Beckman Coulter, our vision is to relentlessly reimagine healthcare, one diagno sis at a time.You will be a part of the Software Engineering team and report to the Senior Manager of Software Engineering responsible for Microbiology software within a medical device system. If you thrive in a fast-paced role and want to work to build a world-class R&D organization—read In this role, you will have the opportunity  Work in cross-functional project teams on all phases of software development Perform and document software feasibility tasksDesign and implement software features and automated unit tests Investigate and correct software defects Drive software development tasks to meet project milestones and commitments',
    postedDate: 'Posted 2 days ago',
    jobType: 'Contract',
    companySize: '5 000-10 000',
    companyLogo: companyLogo2
  },
  {
    id: 3,
    companyName: 'Innovative Designs Ltd. oziefhz oizh norg ',
    jobTitle: 'Product Marketing Manager Virtual and Pool games',
    location: 'New York, NY',
    companyDescription:
      'Beckman Coulter Diagnostics is proud to work alongside a community of six fellow Diagnostics Companies at Danaher. Together, we’re working at the pace of change to improve patient lives with diagnostic tools that address the world’s biggest health challenges.',
    jobDescription:
      ' The Software Engineer I for Beckman Coulter Diagnostics is responsible for design and development of new product software features and/or maintenance of existing product software features to meet the needs of Microbiology  Beckman Coulter, our vision is to relentlessly reimagine healthcare, one diagno sis at a time.You will be a part of the Software Engineering team and report to the Senior Manager of Software Engineering responsible for Microbiology software within a medical device system. If you thrive in a fast-paced role and want to work to build a world-class R&D organization—read In this role, you will have the opportunity  Work in cross-functional project teams on all phases of software development Perform and document software feasibility tasksDesign and implement software features and automated unit tests Investigate and correct software defects Drive software development tasks to meet project milestones and commitments',
    postedDate: 'Posted 2 days ago',
    jobType: 'Full-time',
    companySize: '5 000-10 000',
    companyLogo: companyLogo2
  },
  {
    id: 4,
    companyName: 'Innovative Designs Ltd.',
    jobTitle: 'UX/UI Designer',
    location: 'New York, NY',
    companyDescription:
      'Beckman Coulter Diagnostics is proud to work alongside a community of six fellow Diagnostics Companies at Danaher. Together, we’re working at the pace of change to improve patient lives with diagnostic tools that address the world’s biggest health challenges.',
    jobDescription:
      ' The Software Engineer I for Beckman Coulter Diagnostics is responsible for design and development of new product software features and/or maintenance of existing product software features to meet the needs of Microbiology  Beckman Coulter, our vision is to relentlessly reimagine healthcare, one diagno sis at a time.You will be a part of the Software Engineering team and report to the Senior Manager of Software Engineering responsible for Microbiology software within a medical device system. If you thrive in a fast-paced role and want to work to build a world-class R&D organization—read In this role, you will have the opportunity  Work in cross-functional project teams on all phases of software development Perform and document software feasibility tasksDesign and implement software features and automated unit tests Investigate and correct software defects Drive software development tasks to meet project milestones and commitments',
    postedDate: 'Posted 2 days ago',
    jobType: 'Full-time',
    companySize: '5 000-10 000',
    companyLogo: companyLogo2
  },
  {
    id: 5,
    companyName: 'Innovative Designs Ltd.',
    jobTitle: 'UX/UI Designer',
    location: 'New York, NY',
    companyDescription:
      'Beckman Coulter Diagnostics is proud to work alongside a community of six fellow Diagnostics Companies at Danaher. Together, we’re working at the pace of change to improve patient lives with diagnostic tools that address the world’s biggest health challenges.',
    jobDescription:
      ' The Software Engineer I for Beckman Coulter Diagnostics is responsible for design and development of new product software features and/or maintenance of existing product software features to meet the needs of Microbiology  Beckman Coulter, our vision is to relentlessly reimagine healthcare, one diagno sis at a time.You will be a part of the Software Engineering team and report to the Senior Manager of Software Engineering responsible for Microbiology software within a medical device system. If you thrive in a fast-paced role and want to work to build a world-class R&D organization—read In this role, you will have the opportunity  Work in cross-functional project teams on all phases of software development Perform and document software feasibility tasksDesign and implement software features and automated unit tests Investigate and correct software defects Drive software development tasks to meet project milestones and commitments',
    postedDate: 'Posted 2 days ago',
    jobType: 'Full-time',
    companySize: '5 000-10 000',
    companyLogo: companyLogo2
  }

  // Add more job data as needed
];

interface JobCardProps {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string;
  onClick: (id: number) => void;
  companyLogo: string;
  jobType: string;
}

export function JobBoard() {
  const [selectedJob, setSelectedJob] = useState<number | null>(jobData[0]?.id || null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const handleJobCardClick = (id: number) => {
    setSelectedJob(id);
  };
  const jobList = jobData.map((job) => (
    <JobCard key={job.id} {...job} onClick={handleJobCardClick} />
  ));
  const selectedJobDetails =
    selectedJob !== null ? jobData.find((job) => job.id === selectedJob) : null;
  const handleSaveClick = () => {
    if (selectedJob !== null) {
      setSavedJobs((prevSavedJobs) => {
        const isJobSaved = prevSavedJobs.includes(selectedJob);
        if (isJobSaved) {
          // Remove from saved jobs
          return prevSavedJobs.filter((jobId) => jobId !== selectedJob);
        } else {
          // Add to saved jobs
          return [...prevSavedJobs, selectedJob];
        }
      });
    }
  };
  const isJobSaved = selectedJob !== null && savedJobs.includes(selectedJob);

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
    <Container className={classes.jobBoardContainer}>
      <TextInput
        radius='xl'
        size='s'
        placeholder='Find your perfect job'
        rightSectionWidth={90}
        style={{ marginBottom: '10px', width: '500px' }}
        leftSection={<IconSearch style={{ width: rem(22), height: rem(22) }} stroke={1.5} />}
        rightSection={
          <ActionIcon size={28} radius='xl' color='#53A8E6' variant='filled'>
            <IconArrowRight style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
          </ActionIcon>
        }
      />

      <Tabs defaultValue='appliedjobs' style={{ width: '100%', marginBottom: '20px' }}>
        <Tabs.List justify='center' style={{ marginBottom: '10px' }}>
          <Tabs.Tab value='foryou' style={{ fontWeight: 700 }}>
            For You
          </Tabs.Tab>
          <Tabs.Tab value='appliedjobs' style={{ fontWeight: 700 }}>
            Applied Jobs
          </Tabs.Tab>
          <Tabs.Tab value='savedjobs' style={{ fontWeight: 700 }}>
            Saved Jobs
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='foryou' style={{ width: '100%', marginTop: '8px' }}>
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
                            onClick={handleSaveClick}
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
                      <Text
                        size='sm'
                        style={{ color: '#47494B', fontWeight: 400, marginLeft: '22px' }}
                      >
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
        </Tabs.Panel>

        <Tabs.Panel value='appliedjobs'>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 5fr', // Adjusted grid columns
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
                    shadow='lg'
                    padding='md'
                    style={{
                      border: '0.5px solid #53A8E6',
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
                            onClick={handleSaveClick}
                          >
                            <IconHeart style={{ width: '70%', height: '70%' }} stroke={2} />
                          </ActionIcon>
                        </div>
                      </Group>

                      <Text
                        size='xl'
                        style={{ fontWeight: 645, marginLeft: '22px', marginTop: '-6px' }}
                      >
                        {selectedJobDetails.jobTitle}
                      </Text>
                      <Text
                        size='sm'
                        style={{ color: '#47494B', fontWeight: 400, marginLeft: '22px' }}
                      >
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
          </div>{' '}
        </Tabs.Panel>

        <Tabs.Panel value='savedjobs'>
          <p>This is the content for the 'Saved Jobs' tab.</p>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export const jobBoardRoute = new Route({
  path: 'jobBoard',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
