import React, { useState } from 'react';
import { jobData } from './jobData';
import { JobOfferCard } from './offer-card';
import { JobOfferPreviewCard } from './preview-card';
import { Grid, Stack } from '@mantine/core';

export const ForYou: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(jobData[0]?.id || null);

  const handleJobCardClick = (id: number) => {
    setSelectedJob(id);
  };

  const jobList = jobData.map((job) => (
    <JobOfferCard key={job.id} {...job} onClick={handleJobCardClick} />
  ));

  const selectedJobDetails =
    selectedJob !== null ? jobData.find((job) => job.id === selectedJob) : null;

  return (
    <div>
      <Grid>
        <Grid.Col
          span={{
            md: 6,
            xs: 12
          }}
        >
          <Stack gap='md'>{jobList}</Stack>
          <div>{jobList}</div>
        </Grid.Col>
        <Grid.Col span={6} visibleFrom='md'>
          <div>
            {/* TODO: if offer is selected render the JobOfferPreviewCard otherwise render the JobOfferPreviewPlaceHolder */}
            {selectedJobDetails && <JobOfferPreviewCard />}{' '}
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ForYou;
