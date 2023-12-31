import { Paper, Title, Button, ActionIcon, ScrollArea, Text, Alert, Stack } from '@mantine/core';
import {
  IconClock,
  IconLocationExclamation,
  IconBuilding,
  IconBookmark
} from '@tabler/icons-react';
import { JobData } from './offer-card';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

export function JobOfferPreviewCard({ selectedOffer }: { selectedOffer: JobData | undefined }) {
  return selectedOffer ? (
    <>
      <Paper style={{ height: '100vh', position: 'relative' }} withBorder>
        <ScrollArea h={700} py='md' mx='md' mb='md'>
          <ActionIcon
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px'
            }}
            variant='subtle'
            size='xl'
            aria-label='Settings'
          >
            <IconBookmark style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <Title order={3} my='md'>
            {selectedOffer.title}
          </Title>
          <Stack ml='xl'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconClock size={20} style={{ color: '#76797C' }} />
              <Text c='gray'>{new Date(selectedOffer.created_at).toLocaleDateString()}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconLocationExclamation size={20} style={{ color: '#76797C' }} />
              <Text c='gray'>{selectedOffer.location}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconCurrencyDollar size={20} style={{ color: '#76797C' }} />
              <Text c='gray'>{selectedOffer.salary}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconBuilding size={20} style={{ color: '#76797C' }} />
              <Text c='gray'>{selectedOffer.company_name}</Text>
            </div>
          </Stack>
          <Link
            to='/apply-job/$jobId'
            params={{
              jobId: selectedOffer.id.toString()
            }}
          >
            <Button
              my='md'
              radius='sm'
              variant='gradient'
              gradient={{ from: 'blue', to: '#8FBBE7', deg: 90 }}
              type='submit'
              size='sm'
            >
              Apply now
            </Button>
          </Link>

          {selectedOffer?.motivation && <Alert title='Why us'>{selectedOffer?.motivation}</Alert>}
          <div
            style={{
              marginTop: '1rem',
              marginBottom: '1rem'
            }}
            dangerouslySetInnerHTML={{ __html: selectedOffer?.description }}
          />
          {selectedOffer?.howToApply && (
            <Alert title='How to apply'>{selectedOffer?.howToApply}</Alert>
          )}
        </ScrollArea>
      </Paper>
    </>
  ) : (
    <p>Select an item to preview</p>
  );
}
