import { useFocusTrap, useHotkeys } from '@mantine/hooks';
import { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { RemoveScroll, Box, Paper, Flex, Title, ActionIcon, ScrollArea } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import classes from './base-modal.module.css';

function BaseModal({
  children,
  title,
  opened = false,
  actions,
  close
}: {
  children: ReactNode;
  actions: ReactNode;
  title: string;
  opened: boolean;
  close: () => void;
}) {
  const [scrollPosition, setScrollPosition] = useState({ top: 0, bottom: 0 });
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const focusTrapRef = useFocusTrap();

  useHotkeys([['escape', () => close()]]);

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
  return (
    <>
      {opened && (
        <RemoveScroll ref={focusTrapRef}>
          <Box role='presentation' className={classes.presentation}>
            <Paper bg='transparent' className={classes.paper}>
              <Box className={classes.dialog}>
                <Flex className={classes.dialogHeader}>
                  <Title order={3}>{title}</Title>
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
                  {children}
                </ScrollArea>
                {actions}
              </Box>
            </Paper>
          </Box>
        </RemoveScroll>
      )}
    </>
  );
}
export default BaseModal;
