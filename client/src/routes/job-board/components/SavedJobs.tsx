import { useState } from 'react';

import { Grid, Stack } from '@mantine/core';
import './jobBoard.css';
import { JobData, JobOfferCard, OfferCardPlaceholder } from './offer-card';
import { JobOfferPreviewCard } from './preview-card';

export const SavedJobs = ({ isFetching, savedJobs }: { isFetching: boolean; savedJobs: any[] }) => {
  const [selectedItem, setSelectedItem] = useState<JobData | undefined>();

  const handleJobCardClick = (item: JobData) => {
    setSelectedItem(item);
  };

  const jobCardSkelton = Array.from({ length: 5 }).map((_, i) => <OfferCardPlaceholder key={i} />);

  return (
    <>
      <Grid>
        <Grid.Col
          span={{
            md: 4,
            xs: 12
          }}
        >
          <Stack gap='md'>
            {isFetching ? (
              jobCardSkelton
            ) : savedJobs.length === 0 ? (
              <div>No offers</div>
            ) : (
              savedJobs?.map((job: JobData) => (
                <JobOfferCard key={job.id} offer={job} onSelect={handleJobCardClick} />
              ))
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={8} visibleFrom='md'>
          <div
            style={{
              position: 'sticky',
              top: `${64 + 30}px`
            }}
          >
            <JobOfferPreviewCard selectedOffer={selectedItem} />
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default SavedJobs;
