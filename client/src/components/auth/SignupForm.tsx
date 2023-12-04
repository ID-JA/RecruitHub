import { Tabs } from '@mantine/core';
import classes from './SignupTabs.module.css';
import { EmployerForm } from './EmployerForm';
import { TalentForm } from './TalentForm';

export function SignUpForm() {
  return (
    <Tabs variant='unstyled' defaultValue='talent' classNames={classes}>
      <Tabs.List grow>
        <Tabs.Tab value='recruiter'>Recruiter</Tabs.Tab>
        <Tabs.Tab value='talent'>Talent</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='recruiter'>
        <EmployerForm />
      </Tabs.Panel>
      <Tabs.Panel value='talent'>
        <TalentForm />
      </Tabs.Panel>
    </Tabs>
  );
}
