import { Grid, ActionIcon, Text, Paper, Box } from '@mantine/core';
import { IconBookmark, IconDeviceLaptop } from '@tabler/icons-react';

export interface JobCardProps {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string;
  onClick: (id: number) => void;
  companyLogo: string;
  jobType: string;
}

export function JobOfferCard({
  id,
  companyName,
  jobTitle,
  location,
  onClick,
  companyLogo,
  jobType
}: JobCardProps): JSX.Element {
  //  const isSelected: boolean = id === 0;

  return (
    <Paper
      withBorder
      p='md'
      style={{
        cursor: 'pointer'
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
          <Box>
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
                  <IconBookmark style={{ width: '80%', height: '80%' }} stroke={2} />
                </ActionIcon>{' '}
              </div>
            </div>
            <Text style={{ color: '#47494B', marginBottom: '2px', marginLeft: '14px' }}>
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
              <IconDeviceLaptop size={20} style={{ color: '#76797C', marginLeft: '18px' }} />
              <Text style={{ color: '#76797C', marginLeft: '6px' }}>{jobType}</Text>
            </div>
          </Box>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
