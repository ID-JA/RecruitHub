import { ScrollArea } from '@mantine/core';
import React, { useState } from 'react';
import { jobData } from './jobData';
import { JobOfferCard } from './offer-card';
import { JobOfferPreviewCard } from './preview-card';

export interface JobCardProps {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string;
  onClick: (id: number) => void;
  companyLogo: string;
  jobType: string;
}

const AppliedJobs: React.FC = () => {
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr', // Adjusted grid columns
        gap: '18px'
      }}
    >
      <ScrollArea
        h={350}
        type='always'
        offsetScrollbars
        scrollbarSize={6}
        scrollHideDelay={500}
        mt='xs'
      >
        <div>{jobList}</div>
      </ScrollArea>
      <ScrollArea
        h={350}
        type='always'
        offsetScrollbars
        scrollbarSize={6}
        scrollHideDelay={500}
        mt='xs'
      >
        {/* TODO: pass job payload to preview component */}
        <div>{selectedJobDetails && <JobOfferPreviewCard />}</div>
      </ScrollArea>
    </div>
  );
};

export default AppliedJobs;
