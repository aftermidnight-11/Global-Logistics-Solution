export type JobRole = {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
};

export const jobRoles: JobRole[] = [
  {
    id: 'ops-coordinator',
    title: 'Operations Coordinator',
    location: 'Dubai, UAE',
    type: 'Full-time',
    summary: 'Coordinate shipments, carriers and client updates across air and ocean desks.',
  },
  {
    id: 'customs-specialist',
    title: 'Customs Specialist',
    location: 'Singapore',
    type: 'Full-time',
    summary: 'Prepare accurate declarations and manage inspections for import clients.',
  },
  {
    id: 'project-cargo-lead',
    title: 'Project Cargo Lead',
    location: 'Dubai, UAE',
    type: 'Full-time',
    summary: 'Lead heavy lift moves including surveys, permits and vendor management.',
  },
];
