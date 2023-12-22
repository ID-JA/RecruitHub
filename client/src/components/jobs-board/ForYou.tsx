import React, { useState } from 'react';
import { jobData } from './jobData';
import { JobOfferCard } from './offer-card';
import { JobOfferPreviewCard } from './preview-card';

const ForYou: React.FC = () => {
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gap: '18px'
        }}
      >
        <div>{jobList}</div>
        {/* TODO: if offer is selected render the JobOfferPreviewCard otherwise render the JobOfferPreviewPlaceHolder */}
        <div>{selectedJobDetails && <JobOfferPreviewCard />}</div>
      </div>
    </div>
  );
};

export default ForYou;
