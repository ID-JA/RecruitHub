import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';
import { Anchor, Group, Loader, Select, Table } from '@mantine/core';
import { axiosInstance } from '../utils';
import { Fragment, useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
// import { Avatar, Text, Button, Paper } from '@mantine/core';
import './candidate.css';
import { notifications } from '@mantine/notifications';

interface Candidate {
  name: string;
  // Add other candidate properties as needed
}

interface Application {
  id: string;
  candidate: Candidate;
  resume: string;
  cover_letter: string;
  status: string; // 'pending', 'accepted', 'rejected'
  created_at: string; // ISO date string
}

function Candidates() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  // const [hoveredUserId, setHoveredUserId] = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);
  // const {applicationId}=useParams()

  useEffect(() => {
    //replace that number 2 with applicationId
    axiosInstance
      .get(`/recruiter/received-applications/${2}`)
      .then((response) => {
        if (response.data.applications) {
          setApplications(response.data.applications.applications);
          setApplicationsLoading(false);
        }
      })
      .catch(() => {
        alert('something went wrong');
        setApplicationsLoading(false);
      });
  }, []);
  const handleStatus = async (e: any, id: any, name: any) => {
    setStatusLoading(id);

    await axiosInstance.post(`/recruiter/update-application/${id}`, { status: e });
    setStatusLoading(null);
    notifications.show({
      color: 'green',
      title: 'Success',
      message: `You have ${e + ' ' + name} successfully!`
    });
  };

  const handleDownload = (textContent: string) => {
    const blob = new Blob([textContent], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'cover-letter.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Fragment>
      <h1>Candidate</h1>
      <Table.ScrollContainer minWidth={500}>
        <Table highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Resume</Table.Th>
              <Table.Th>Cover-Letter</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Applied-At</Table.Th>
              {/* <Table.Th>Profile</Table.Th> */}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {applicationsLoading ? (
              <Table.Tr>
                <Table.Td colSpan={5} rowSpan={3}>
                  <Group justify='center'>
                    <Loader color='blue' size='lg' type='dots' />
                  </Group>
                </Table.Td>
              </Table.Tr>
            ) : applications.length > 0 ? (
              applications.map((application, i) => (
                <Table.Tr key={i}>
                  <Table.Td>{application.candidate.name}</Table.Td>
                  <Table.Td>
                    <Anchor
                      href={import.meta.env.VITE_BASE_URL + '/storage/' + application.resume}
                      download='downloaded_resume.pdf'
                    >
                      Resume
                    </Anchor>
                  </Table.Td>
                  <Table.Td>
                    <Anchor
                      onClick={() => {
                        handleDownload(application.cover_letter);
                      }}
                    >
                      Cover-Letter
                    </Anchor>
                  </Table.Td>
                  <Table.Td>
                    <Select
                      data={['pending', 'accepted', 'rejected']}
                      defaultValue={application.status}
                      w={140}
                      onChange={(e) => {
                        handleStatus(e, application.id, application.candidate.name);
                      }}
                      disabled={statusLoading == application.id}
                    />
                  </Table.Td>
                  <Table.Td>{formatDate(application.created_at)}</Table.Td>
                </Table.Tr>
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

export const candidatesRoute = new Route({
  component: Candidates,
  path: 'candidates',
  getParentRoute: () => portalLayoutRoute
});
