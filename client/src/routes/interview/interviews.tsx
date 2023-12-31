import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../../layouts/portal-layout';
import { Anchor, Group, Loader, Table } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { axiosInstance } from '../../utils';
import { IconEye, IconEyeClosed, IconTrash } from '@tabler/icons-react';
import CreateInterviewModal from './create-interview-modal';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [interviewsLoading, setInterviewsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`/interviews`)
      .then((response) => {
        if (response.data.interviews) {
          setInterviews(response.data.interviews);
          setInterviewsLoading(false);
        }
      })
      .catch(() => {
        alert('Something went wrong');
        setInterviewsLoading(false);
      });
  }, []);

  // const isWithin15Minutes = (inputDate) => {
  //   const currentDate = new Date();
  //   const targetDate = new Date(inputDate);
  //   const timeDifferenceInMinutes = (targetDate.getTime() - currentDate.getTime()) / (1000 * 60);
  //   const isWithin15Minutes = timeDifferenceInMinutes >= 0 && timeDifferenceInMinutes <= 15;
  //   return isWithin15Minutes;
  // };

  const isFutureDate = (inputDate) => {
    const currentDate = new Date();
    const targetDate = new Date(inputDate);
    const isFuture = targetDate.getTime() > currentDate.getTime();
    return isFuture;
  };
  const handleDelete = async (jobId, applicationId, meetingId) => {
    setDeleteLoading((prevLoading) => ({ ...prevLoading, [applicationId]: true }));
    try {
      await axiosInstance.delete(`/interviews/delete/${meetingId}`);
      const updatedJobs = interviews.map((job) => {
        if (job.id === jobId) {
          const updatedApplications = job.applications.filter((app) => app.id !== applicationId);
          return { ...job, applications: updatedApplications };
        }
        return job;
      });
      setInterviews(updatedJobs);
    } catch (error) {
      console.error('Error deleting interview:', error);
      alert('Failed to delete interview');
    } finally {
      setDeleteLoading((prevLoading) => ({ ...prevLoading, [applicationId]: false }));
    }
  };
  return (
    <Fragment>
      <Group justify='space-between' my={'md'}>
        <h1>Interviews</h1>
        <CreateInterviewModal setInterviews={setInterviews} />
      </Group>
      <Table.ScrollContainer minWidth={500}>
        <Table withTableBorder withColumnBorders style={{ textAlign: 'center' }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Job</Table.Th>
              <Table.Th>Candidate</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Interview-Start-At</Table.Th>
              <Table.Th>Start the Room</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {interviewsLoading ? (
              <Table.Tr>
                <Table.Td colSpan={5} rowSpan={3}>
                  <Group justify='center'>
                    <Loader color='blue' size='lg' type='dots' />
                  </Group>
                </Table.Td>
              </Table.Tr>
            ) : interviews.length > 0 ? (
              interviews.map((job) => (
                <Fragment key={job.id}>
                  {job.applications.map((application, index) => (
                    <Table.Tr key={application.id}>
                      {index === 0 && (
                        <>
                          <Table.Td rowSpan={job.applications.length}>{job.title}</Table.Td>
                        </>
                      )}
                      <Table.Td>{application.candidate.name}</Table.Td>
                      <Table.Td>{application.meeting.duration}</Table.Td>
                      <Table.Td>{application.meeting.start_at}</Table.Td>
                      <Table.Td>
                        {isFutureDate(application.meeting.start_at) ? (
                          <Anchor target='_blank' href={application.meeting.start_url}>
                            <IconEye style={{ cursor: 'pointer' }} color='blue' size={20} />
                          </Anchor>
                        ) : (
                          <IconEyeClosed style={{ cursor: 'not-allowed' }} size={20} />
                        )}
                      </Table.Td>
                      <Table.Td>
                        {deleteLoading[application.id] ? (
                          <Loader color='pink' size='sm' />
                        ) : (
                          <IconTrash
                            onClick={() => {
                              handleDelete(job.id, application.id, application.meeting.meeting_id);
                            }}
                            style={{ cursor: 'pointer' }}
                            color='red'
                            size={18}
                          />
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Fragment>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5} rowSpan={2}>
                  <Group justify='center' fw={'bold'}>
                    You havn't received any applications for this job.
                  </Group>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Fragment>
  );
}

export const interviewsRoute = new Route({
  component: Interviews,
  path: 'interviews',
  getParentRoute: () => portalLayoutRoute
});
