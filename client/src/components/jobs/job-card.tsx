import { ActionIcon, Avatar, Group, Paper, Popover, Text, Title } from '@mantine/core';
import { type JobProps } from '../../types';
import { timeAgo } from '../../utils';
import { IconDots } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function JobCard({ props }: { props: JobProps }) {
  const [opened, { open, close }] = useDisclosure();
  return (
    <Paper radius='md' withBorder p='md' component='li'>
      <Group justify='space-between' align='center'>
        <div>
          <Title
            order={5}
            fw={600}
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {props.title}
          </Title>
          <Group align='center' gap='xs'>
            <div
              style={{
                display: 'inline-flex',
                width: '1rem'
              }}
            >
              <img />
            </div>
            <Popover withArrow shadow='md' opened={opened}>
              <Popover.Target>
                <Avatar
                  size='sm'
                  draggable='false'
                  alt='created by jamal id aissa'
                  src='https://api.dicebear.com/7.x/personas/svg?seed=Lucky'
                  onMouseEnter={open}
                  onMouseLeave={close}
                />
              </Popover.Target>
              <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                <Avatar
                  size='lg'
                  draggable='false'
                  alt='created by jamal id aissa'
                  src='https://api.dicebear.com/7.x/personas/svg?seed=Lucky'
                />
                <Text fw={600} size='sm'>
                  Jamal Id Aissa
                </Text>
                <Text size='xs' c='gray'>
                  Created{' '}
                  {new Date(props.created).toLocaleDateString('en-us', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
              </Popover.Dropdown>
            </Popover>

            <Text size='sm' fw={600} c='gray'>
              {props.company}
            </Text>
            <p style={{ margin: 0 }}>•</p>
            <Text size='sm' fw={400} c='gray'>
              {timeAgo(new Date(props.created), { withAgo: true })}
            </Text>
          </Group>
        </div>
        <Group>
          <ActionIcon variant='subtle' color='gray.7' aria-label='Exit full screen'>
            <IconDots style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant='subtle' color='gray.7' aria-label='Exit full screen'>
            <IconDots style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant='subtle' color='gray.7' aria-label='Exit full screen'>
            <IconDots style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
}

export default JobCard;
