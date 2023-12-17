import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Flex,
  Button,
  Title,
  Checkbox,
  ScrollArea,
  Paper,
  Box,
  RemoveScroll,
  ActionIcon,
  Text,
  TextInput,
  Radio,
  Group,
  Stack,
  NumberInput,
  Select,
  Textarea,
  MultiSelect
} from '@mantine/core';

import { useDisclosure, useFocusTrap, useHotkeys } from '@mantine/hooks';
import { IconPlus, IconX } from '@tabler/icons-react';

import { TextEditor } from '../shared/text-editor';
import { useGeoLocation } from '../../hook/use-geolocation';
import { currencies, industries, salaryTimeFrame } from '../../data';

import classes from './CreateJobModal.module.css';

export default function CreateJobModal() {
  const [withRange, setWithRange] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  useHotkeys([['escape', () => close()]]);
  const { value, onInputChange, suggestions } = useGeoLocation();

  const [scrollPosition, setScrollPosition] = useState({ top: 0, bottom: 0 });

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (scrollableDivRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableDivRef.current;
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);
      setScrollPosition({ top: scrollTop, bottom: scrollBottom });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      handleScroll();
    };

    const scrollableDiv = scrollableDivRef.current;

    if (scrollableDiv) {
      handleScroll();

      scrollableDiv.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        scrollableDiv.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleScroll, scrollableDivRef, opened]);

  const focusTrapRef = useFocusTrap();

  return (
    <>
      {opened && (
        <RemoveScroll>
          <div ref={focusTrapRef}>
            <Box role='presentation' className={classes.presentation}>
              <Paper bg='transparent' className={classes.paper}>
                <section className={classes.dialog}>
                  <Flex className={classes.dialogHeader}>
                    <Title order={3}>Create job</Title>
                    <div>
                      <ActionIcon
                        onClick={close}
                        variant='subtle'
                        color='gray.7'
                        aria-label='Exit full screen'
                      >
                        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                      </ActionIcon>
                    </div>
                  </Flex>
                  <ScrollArea
                    viewportRef={scrollableDivRef}
                    type='always'
                    classNames={{
                      root: classes.scrollAreaRoot,
                      viewport: classes.scrollAreaViewport
                    }}
                    data-scroll={
                      scrollPosition.top > 0
                        ? scrollPosition.bottom > 0
                          ? 'both'
                          : 'top'
                        : scrollPosition.bottom > 0
                          ? 'bottom'
                          : ''
                    }
                  >
                    <Text c='gray' size='sm' px='md'>
                      Required fields are marked with an asterisk{' '}
                      <span style={{ color: 'var(--mantine-color-red-6' }}>*</span>
                    </Text>
                    <Stack mt='lg' px='xl'>
                      <TextInput
                        label='Job Title'
                        placeholder='e.g., Product Manager'
                        withAsterisk
                      />
                      <Select
                        searchable
                        label='Job Location'
                        placeholder='e.g., San Francisco, CA'
                        value={value}
                        onSearchChange={onInputChange}
                        data={suggestions.map((suggestion) => ({
                          value: suggestion.displayName,
                          label: suggestion.displayName
                        }))}
                        withAsterisk
                      />

                      <Radio.Group name='employmentType' label='Job type' withAsterisk>
                        <Group mt='xs'>
                          <Radio value='fullTime' label='Full Time' />
                          <Radio value='partTime' label='Part Time' />
                          <Radio value='contractor' label='Contractor' />
                          <Radio value='temporary' label='Temporary' />
                        </Group>
                      </Radio.Group>
                      <MultiSelect
                        label='Job Category'
                        placeholder='Pick value'
                        data={industries}
                        withAsterisk
                      />
                      <TextEditor content='' />
                      <div>
                        <Group align='end' grow>
                          <NumberInput label='Salary' placeholder='Enter Amount' withAsterisk />
                          <div>
                            <Button
                              styles={{
                                root: {
                                  display: !withRange ? 'inline-block' : 'none',
                                  visibility: !withRange ? 'visible' : 'hidden'
                                }
                              }}
                              onClick={() => setWithRange(true)}
                              variant='transparent'
                              leftSection={<IconPlus />}
                            >
                              Add Range
                            </Button>
                            <div
                              style={{
                                display: withRange ? 'flex' : 'none',
                                visibility: withRange ? 'visible' : 'hidden',
                                alignItems: 'center',
                                gap: '10px'
                              }}
                            >
                              <NumberInput
                                w='100%'
                                aria-label='Enter Max Amount'
                                placeholder='Enter Max Amount'
                                withAsterisk
                              />
                              <ActionIcon
                                variant='subtle'
                                color='blue.7'
                                aria-label='without range'
                                onClick={() => setWithRange(false)}
                              >
                                <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                              </ActionIcon>
                            </div>
                          </div>
                        </Group>
                        <Group align='end' grow mt='lg'>
                          <Select
                            aria-label='currency'
                            data={currencies}
                            defaultChecked
                            value='USD'
                          />
                          <Select
                            aria-label='salary time frame'
                            data={salaryTimeFrame}
                            defaultChecked
                            value='Annually'
                          />
                        </Group>
                        <Checkbox mt='md' label='Show salary to job seekers Recommended!' />
                      </div>
                      <Textarea label='Additional Application Instructions' autosize minRows={2} />
                      <Textarea
                        label='Why Work at This Company?'
                        maxLength={140}
                        minRows={5}
                        description='Give a one-line sales pitch for working at this company (140 characters max.). Note: editing this field will affect all jobs at this hiring company.'
                      />
                      <Textarea
                        label='Hiring Company Description'
                        maxLength={140}
                        minRows={5}
                        description='Note: editing this description will affect all jobs at this hiring company.'
                      />
                    </Stack>
                  </ScrollArea>
                  <Flex justify='space-between' align='center' direction='row' px='md' py='lg'>
                    <Checkbox label='Create another job' />
                    <Flex justify='flex-end' gap='md'>
                      <Button onClick={close} variant='transparent'>
                        Cancel
                      </Button>
                      <Button onClick={close} variant='outline'>
                        Draft
                      </Button>
                      <Button>Publish</Button>
                    </Flex>
                  </Flex>
                </section>
              </Paper>
            </Box>
          </div>
        </RemoveScroll>
      )}
      <Button onClick={open}>Create job</Button>
    </>
  );
}
