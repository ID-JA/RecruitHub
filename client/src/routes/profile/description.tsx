import { useState, useRef } from 'react';
import { Accordion, Avatar, Text, ActionIcon, Title } from '@mantine/core';
import { IconHourglassEmpty, IconCircleCheck, IconBell, IconCamera } from '@tabler/icons-react';
import profileImage from '../../assets/profile.webp';
export function DescriptionGrid() {
  //start of functionality
  const [avatarSrc, setAvatarSrc] = useState(profileImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    // Trigger click on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarSrc(reader.result);
        }
      };

      reader.readAsDataURL(selectedFile);
    } else {
      // Handle the case where the user cancels the file selection
      console.log('File selection canceled');
    }
  };

  //end of functionality

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          position: 'relative'
        }}
      >
        <Avatar src={avatarSrc} alt="it's me" size={140} />
        <label
          style={{
            marginTop: '-32px', // Adjust as needed
            marginLeft: '100px', // Adjust as needed
            cursor: 'pointer',
            position: 'absolute',
            bottom: '8px' // Adjust as needed
            // Adjust as needed
          }}
        >
          <ActionIcon
            color='#3366FF'
            variant='gradient'
            onClick={handleAvatarClick}
            aria-label='camera'
          >
            <IconCamera style={{ width: '16px', height: '16px' }} />
          </ActionIcon>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
      </div>

      <Title fw='700' ta='center' order={4}>
        Ouhsaine Omayma
      </Title>
      <Title fw='200' ta='center' order={5}>
        future web developer
      </Title>
      <div style={{ margin: '15px' }}>
        <Text ta='center' size='sm' lineClamp={2}>
          {' '}
          Join thousands of people who’ve found their dream job using Hired.
        </Text>
      </div>
      <Accordion variant='contained'>
        <Accordion.Item value='applied'>
          <Accordion.Control style={{ display: 'flex', alignItems: 'center' }}>
            <IconHourglassEmpty style={{ marginRight: '8px', marginBottom: '-5px' }} />
            Opportunities applied
          </Accordion.Control>
          <Accordion.Panel>you applied for ...</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value='won'>
          <Accordion.Control style={{ display: 'flex', alignItems: 'center' }}>
            <IconCircleCheck style={{ marginRight: '8px', marginBottom: '-5px' }} />
            Opportunities won
          </Accordion.Control>
          <Accordion.Panel> Opportunities won</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value='notifications'>
          <Accordion.Control style={{ display: 'flex', alignItems: 'center' }}>
            <IconBell style={{ marginRight: '8px', marginBottom: '-5px' }} />
            Notifications
          </Accordion.Control>
          <Accordion.Panel>notifications</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
