import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '@mantine/tiptap/styles.css';

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
  Textarea
} from '@mantine/core';
import { useDisclosure, useFocusTrap, useHotkeys } from '@mantine/hooks';
import classes from './CreateJobModal.module.css';
import { IconPlus, IconX } from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

export default function CreateJobModal() {
  const [withRange, setWithRange] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  useHotkeys([['escape', () => close()]]);

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

    if (scrollableDivRef.current) {
      handleScroll();

      scrollableDivRef.current.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        scrollableDivRef.current?.removeEventListener('scroll', handleScroll);
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
            <Box
              role='presentation'
              style={{
                position: 'fixed',
                zIndex: '500',
                inset: '0px',
                backgroundColor: 'var(--ds-blanket, rgba(9, 30, 66, 0.54))',
                overflowY: 'auto',
                pointerEvents: 'initial'
              }}
            >
              <Paper bg='transparent' className={classes.paper}>
                <section className={classes.dialog}>
                  <ModalHeader handleClose={close} />
                  <ScrollArea
                    viewportRef={scrollableDivRef}
                    type='always'
                    styles={{
                      viewport: {
                        padding: '20px 0px'
                      },
                      root: {
                        borderTop:
                          scrollPosition.top > 0 ? 'solid 1px #ccc' : 'solid 1px transparent',
                        borderBottom:
                          scrollPosition.bottom > 0 ? 'solid 1px #ccc' : 'solid 1px transparent'
                      }
                    }}
                  >
                    <Text c='gray' size='sm' px='md'>
                      Required fields are marked with an asterisk{' '}
                      <span style={{ color: 'var(--mantine-color-red-6' }}>*</span>
                    </Text>
                    <Stack mt='lg' px='xl'>
                      <TextInput label='Job Title' placeholder='e.g., Product Manager' />
                      <TextInput label='Job Location' />

                      <TextInput label='Job Title' placeholder='Job Title' />
                      <Radio.Group name='employmentType' label='Job type' withAsterisk>
                        <Group mt='xs'>
                          <Radio value='fullTime' label='Full Time' />
                          <Radio value='partTime' label='Part Time' />
                          <Radio value='contractor' label='Contractor' />
                          <Radio value='temporary' label='Temporary' />
                        </Group>
                      </Radio.Group>
                      <Demo />
                      <div>
                        <Group align='end' grow>
                          <NumberInput label='Salary' placeholder='Enter Amount' />
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
                              <span>~</span>
                              <NumberInput w='100%' placeholder='Enter Max Amount' />
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
                            placeholder='Pick value'
                            data={['React', 'Angular', 'Vue', 'Svelte']}
                          />

                          <Select
                            aria-label='salary time frame'
                            placeholder='Pick value'
                            data={['React', 'Angular', 'Vue', 'Svelte']}
                          />
                        </Group>
                        <Checkbox mt='md' label='Show salary to job seekers Recommended!' />
                      </div>
                      <Textarea label='Additional Application Instructions' />
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
                      <Button onClick={close} variant='outlined'>
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

function ModalHeader({ handleClose }: { handleClose: () => void }) {
  return (
    <Flex className={classes.dialogHeader}>
      <Title order={3}>Create job</Title>
      <div>
        <ActionIcon
          onClick={handleClose}
          variant='subtle'
          color='gray.7'
          aria-label='Exit full screen'
        >
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </div>
    </Flex>
  );
}

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

function Demo() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
