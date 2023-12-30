import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Menu,
  Paper,
  Popover,
  Text,
  Title,
  rem
} from '@mantine/core';
import { axiosInstance, timeAgo } from '../../utils';
import { IconArchive, IconDots, IconTrash, IconUpload } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { TJobData, useAddEditJobOffer } from './create-job-modal';
import { modals } from '@mantine/modals';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';

const deleteJobOfferRequest = async (id: number) => {
  const response = await axiosInstance.delete(`/jobs/${id}`);
  return response.data;
};

function JobCard({ props }: { props: TJobData }) {
  const [opened, { open, close }] = useDisclosure();
  const { AddEditJobOfferModal, openAddEditJobOfferModal } = useAddEditJobOffer(props);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteJobOfferRequest,
    mutationKey: ['delete-job-offer'],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['my-jobs']
      });
      modals.close('delete-job-offer');
      showNotification({
        title: 'Job offer deleted',
        message: 'Job offer was successfully deleted',
        color: 'green'
      });
    },
    onError: (error) => {
      modals.close('delete-job-offer');
      showNotification({
        title: 'Job offer deletion failed',
        message: error.message,
        color: 'red'
      });
    }
  });
  const openDeleteModal = () =>
    modals.openConfirmModal({
      id: 'delete-job-offer',
      title: `Delete ${props.title} offer`,
      centered: true,
      children: <Text size='sm'>Are you sure you want to delete this job?</Text>,
      labels: { confirm: 'Delete job', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: async () => mutation.mutateAsync(props.id!)
    });

  return (
    <Paper radius='md' withBorder p='md' component='li'>
      <AddEditJobOfferModal />
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
                  {new Date(props.created_at!).toLocaleDateString('en-us', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
              </Popover.Dropdown>
            </Popover>

            <Text size='sm' fw={600} c='gray'>
              {props.company_id}
            </Text>
            <p style={{ margin: 0 }}>•</p>
            <Text size='sm' fw={400} c='gray'>
              {timeAgo(new Date(props.created_at!), { withAgo: true })}
            </Text>
          </Group>
        </div>
        <Group>
          <Badge variant='light' color={props.status === 'active' ? 'green' : 'orange'}>
            {props.status}
          </Badge>
          <Badge variant='light' color='gray'>
            1000
            <span style={{ marginLeft: '5px' }}>Candidates</span>
          </Badge>
          <Menu shadow='md' width={200}>
            <Menu.Target>
              <ActionIcon component='div' variant='subtle' color='gray.7' aria-label='more actions'>
                <IconDots style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {props.status === 'pending' && (
                <Menu.Item
                  key='post-new-job'
                  fw='bold'
                  color='green'
                  leftSection={<IconUpload style={{ width: rem(14), height: rem(14) }} />}
                >
                  Post
                </Menu.Item>
              )}
              <Menu.Item leftSection={<IconEdit size={18} />} onClick={openAddEditJobOfferModal}>
                Edit
              </Menu.Item>
              {props.status === 'active' && (
                <Menu.Item key='close-offer' leftSection={<IconArchive size={18} />}>
                  Close
                </Menu.Item>
              )}

              <Menu.Item
                onClick={openDeleteModal}
                color='red'
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              >
                Delete job
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Paper>
  );
}

export default JobCard;
