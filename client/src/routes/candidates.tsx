import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';
import { Anchor, Select, Table } from '@mantine/core';
import { axiosInstance } from '../utils';
import { Fragment, useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
// import { Avatar, Text, Button, Paper } from '@mantine/core';
import './candidate.css';
import { notifications } from '@mantine/notifications';

function Candidates() {
  const [applications, setApplications] = useState([]);
  // const [hoveredUserId, setHoveredUserId] = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);
  // const {applicationId}=useParams()

  useEffect(() => {
    ///replace that number 2 with applicationId
    axiosInstance.get(`/recruiter/received-applications/${2}`).then((response) => {
      console.log(response.data.applications.applications);
      setApplications(response.data.applications.applications);
    });
  }, []);
  const handleStatus = async (e, id, name) => {
    setStatusLoading(id);
    await axiosInstance.post(`/recruiter/accept-application/${id}`, { status: e });
    setStatusLoading(null);
    notifications.show({
      color: 'green',
      title: 'Success',
      message: `You have ${e + ' ' + name} successfully!`
    });
  };

  const handleDownload = (textContent) => {
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
            {applications.length > 0 &&
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
                  {/* <Table.Td 
        // style={{ position:'relative' }}
        >
          <div className='user-row'
          onMouseEnter={() => setHoveredUserId(application.id)}
          onMouseLeave={() => setHoveredUserId(null)}
          
          >hover me please</div>

            {hoveredUserId !== application.id && (
          <Paper
          style={{ position:'absolute' }}
           radius="md" withBorder p="lg" w={'100%'} bg="var(--mantine-color-body)">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              size={120}
              radius={120}
              mx="auto"
            />
            <Text ta="center" fz="lg" fw={500} mt="md">
              Jane Fingerlicker
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              jfingerlicker@me.io • Art director
            </Text>

            <Button variant="default" fullWidth mt="md">
              Send message
            </Button>
          </Paper>
         )}
        
        </Table.Td> */}
                </Table.Tr>
              ))}
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
