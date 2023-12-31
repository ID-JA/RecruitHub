import { Grid, ActionIcon, Text, Paper, Box, Skeleton, Group, Stack } from '@mantine/core';
import { IconBookmark, IconDeviceLaptop } from '@tabler/icons-react';

export interface JobCardProps {
  offer: JobData;
  onSelect: (item: JobData) => void;
}

export interface JobData {
  id: number;
  title: string;
  description: string;
  company_name: string;
  requirements: string[];
  location: string;
  salary: string;
  status: string;
  created_at: string;
  updated_at: string;
  company_id: number;
  user_id: number;
  employmentType: string;
  showSalary: number;
  salaryCurrency: string;
  salaryTime: string;
  category: string[];
  motivation: string;
  aboutCompany: string;
  howToApply: string;
}

export function JobOfferCard({ onSelect, offer }: JobCardProps): JSX.Element {
  //  const isSelected: boolean = id === 0;
  const { id, company_name, title, location, employmentType } = offer;
  return (
    <Paper
      withBorder
      p='md'
      style={{
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => onSelect(offer)}
    >
      <ActionIcon
        variant='transparent'
        aria-label='Save'
        color='#53A8E6'
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px'
        }}
      >
        <IconBookmark style={{ width: '80%', height: '80%' }} stroke={2} />
      </ActionIcon>

      <Grid>
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
                  {title}
                </Text>
              </div>
            </div>
            <Text style={{ color: '#47494B', marginBottom: '2px', marginLeft: '14px' }}>
              {company_name}
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
              <Text style={{ color: '#76797C', marginLeft: '6px' }}>{employmentType}</Text>
            </div>
          </Box>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

export const OfferCardPlaceholder = () => {
  return (
    <Paper withBorder p='md'>
      <Group grow>
        <Skeleton height={64} maw={64} width={64} />
        <Stack>
          <Skeleton height={10} width='60%' />
          <Skeleton height={10} />
          <Skeleton height={10} />
        </Stack>
      </Group>
    </Paper>
  );
};
