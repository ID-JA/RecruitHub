import { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  Container,
  Input,
  Fieldset,
  FileInput,
  rem,
  Flex,
  Text
} from '@mantine/core';
import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { IconFileCv } from '@tabler/icons-react';
import { DateTimePicker } from '@mantine/dates';

export function ApplyJob() {
  const [active, setActive] = useState(4);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

  return (
    <Container>
      <Stepper active={active} onStepClick={(step) => setActive(step)}>
        <Stepper.Step label='First step' description='Personnal informations'>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '65px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <a href='/jobs-board'>
                  <Button
                    className='skip'
                    color='blue'
                    radius='md'
                    variant='transparent'
                    style={{ height: '26px' }}
                  >
                    Skip
                  </Button>
                </a>
              </Group>

              <Text style={{ fontSize: '24px', fontWeight: '500' }}>
                Add your contact information
              </Text>
              <Input.Wrapper label='First Name' required>
                <Input style={{ width: '320px' }} />
              </Input.Wrapper>

              <Input.Wrapper label='Last Name' required>
                <Input style={{ width: '320px' }} />
              </Input.Wrapper>

              <Input.Wrapper label='Email' required>
                <Input type='email' style={{ width: '320px' }} />
              </Input.Wrapper>

              <Input.Wrapper label='Contact Phone'>
                <Input type='tel' style={{ width: '320px' }} />
              </Input.Wrapper>

              <Input.Wrapper label='City'>
                <Input style={{ width: '320px' }} />
              </Input.Wrapper>
              <Group justify='center' mt='xl'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Step>

        <Stepper.Step label='Second step' description='Add a resume'>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '20px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <a href='/jobs-board'>
                  <Button
                    className='skip'
                    color='blue'
                    radius='md'
                    variant='transparent'
                    style={{ height: '26px' }}
                  >
                    Skip
                  </Button>
                </a>
              </Group>
              <Text style={{ fontSize: '24px', fontWeight: '500', paddingBottom: '18px' }}>
                Add a resume for the employer
              </Text>
              <FileInput
                clearable
                accept='application/pdf'
                placeholder='Upload your CV'
                rightSection={icon}
                rightSectionPointerEvents='none'
              />
              <Group justify='center' mt='xl'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Step>
        <Stepper.Step label='Third step' description='Education'>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '30px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <a href='/jobs-board'>
                  <Button
                    className='skip'
                    color='blue'
                    radius='md'
                    variant='transparent'
                    style={{ height: '26px' }}
                  >
                    Skip
                  </Button>
                </a>
              </Group>
              <Text style={{ fontSize: '24px', fontWeight: '500', paddingBottom: '18px' }}>
                Enter yout Education informations
              </Text>
              <Fieldset legend='Educationnal background'>
                <Input.Wrapper label='Degree' required>
                  <Input style={{ width: '320px' }} />
                </Input.Wrapper>

                <Input.Wrapper label='University / Institute' required>
                  <Input style={{ width: '320px' }} />
                </Input.Wrapper>

                <Input.Wrapper label='Location' required>
                  <Input style={{ width: '320px' }} />
                </Input.Wrapper>
                <DateTimePicker label='Start date' style={{ width: '320px' }} />
                <DateTimePicker label='End date' style={{ width: '320px' }} />
              </Fieldset>
              <Group justify='center' mt='xl'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Step>
        <Stepper.Step label='Fourth step' description='Experience'>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '20px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <a href='/jobs-board'>
                  <Button
                    className='skip'
                    color='blue'
                    radius='md'
                    variant='transparent'
                    style={{ height: '26px' }}
                  >
                    Skip
                  </Button>
                </a>
              </Group>
              <Text style={{ fontSize: '24px', fontWeight: '500', paddingBottom: '18px' }}>
                Enter a past job that shows relevant experience{' '}
              </Text>
              <Fieldset legend='Relevent experience'>
                <Input.Wrapper label='Job title'>
                  <Input style={{ width: '320px' }} />
                </Input.Wrapper>

                <Input.Wrapper label='Company'>
                  <Input style={{ width: '320px' }} />
                </Input.Wrapper>
              </Fieldset>

              <Group justify='center' mt='xl'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Submit your application</Button>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Step>
        <Stepper.Completed>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '20px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <a href='/jobs-board'>
                  <Button
                    className='skip'
                    color='blue'
                    radius='md'
                    variant='transparent'
                    style={{ height: '26px' }}
                  >
                    Skip
                  </Button>
                </a>
              </Group>
              <Group justify='center' mt='xl'>
                <Text
                  style={{
                    fontSize: '24px',
                    fontWeight: '500',
                    paddingRight: '5px',
                    paddingLeft: '10px'
                  }}
                >
                  You did it!
                </Text>
              </Group>
              <Group justify='center'>
                <Text
                  style={{
                    fontSize: '24px',
                    fontWeight: '500',
                    paddingBottom: '18px',
                    paddingRight: '5px',
                    paddingLeft: '10px'
                  }}
                >
                  Your application was sent.
                </Text>
              </Group>

              <Group justify='center' mt='xl'>
                <a href='/jobs-board'>
                  <Button onClick={nextStep} style={{ width: '120px' }}>
                    Finish{' '}
                  </Button>
                </a>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Completed>
      </Stepper>
    </Container>
  );
}

export const ApplyJobRoute = new Route({
  path: '/apply-job',
  component: ApplyJob,
  getParentRoute: () => defaultLayoutRoute
});
