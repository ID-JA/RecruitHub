import { useEffect } from 'react';
import { Route, useRouterState, useRouter } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Tabs, Container, Flex, Paper } from '@mantine/core';
import { EmployerForm } from './EmployerForm';
import { TalentForm } from './TalentForm';
import CompanyDetails from './company-details';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import CandidateDetail from './candidate-detail';

export interface IRecruiterInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
}

const signUpSchemaRecruiter = z
  .object({
    firstName: z.string().min(2, { message: 'First name should have at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name should have at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(6, { message: 'Password should have at least 6 characters' }),
    companyName: z.string().min(1, { message: 'Company name should have at least 1 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password should have at least 6 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

const companyDetailSchema = z.object({
  industry: z.string().min(2, { message: 'Industry should have at least 2 characters' }),
  website: z.string().url({ message: 'Please enter a valid website' }),
  location: z.string().min(2, { message: 'Location should have at least 2 characters' }),
  zip: z.string().min(2, { message: 'Zip code should have at least 2 characters' }),
  about: z.string().min(2, { message: 'About should have at least 2 characters' }),
  positionAtCompany: z.string().min(2, { message: 'Position should have at least 2 characters' })
});

const signUpCandidateSchema = z.object({
  fullName: z.string().min(2, { message: 'First name should have at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password should have at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password should have at least 6 characters' }),
  location: z.string().min(2, { message: 'Location should have at least 2 characters' })
});

const socialMediaSchema = z.object({
  linkedin: z.string().url(),
  twitter: z.string().url(),
  github: z.string().url()
  // Add more social media links as needed
});

const educationSchema = z.object({
  degree: z.string(),
  school: z.string(),
  year: z.number()
});

const experienceSchema = z.object({
  position: z.string(),
  company: z.string(),
  year: z.number()
});

const candidateDetailSchema = z.object({
  skills: z.array(z.string()),
  educations: z.array(educationSchema),
  bio: z.string(),
  specialist: z.string(), // You may want to refine this type
  experiences: z.array(experienceSchema),
  socialMedia: socialMediaSchema,
  location: z.string(),
  phoneNumber: z.string(),
  photo: z.string().url() // Assuming the photo is a URL
});

const recruiterInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  companyName: ''
};

const candidateCredentialsInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  location: ''
};

const useSignUpSchema = (
  state: 'candidate-details' | 'company-details' | 'employer-details' | 'candidate-credentials'
) => {
  switch (state) {
    case 'candidate-credentials':
      return {
        schema: signUpCandidateSchema,
        initialValues: candidateCredentialsInitialValues
      };
    case 'candidate-details':
      return {
        schema: signUpCandidateSchema.and(z.object({ candidateDetails: candidateDetailSchema })),
        initialValues: {
          ...candidateCredentialsInitialValues,
          candidateDetails: {
            educations: [],
            experiences: [],
            skills: [],
            socialMedia: {
              linkedin: '',
              twitter: '',
              github: ''
            }
          }
        }
      };
    case 'company-details':
      return {
        schema: signUpSchemaRecruiter.and(z.object({ companyDetails: companyDetailSchema })),
        initialValues: {
          ...recruiterInitialValues,
          companyDetails: {
            industry: '',
            website: '',
            location: '',
            zip: '',
            about: '',
            positionAtCompany: ''
          }
        }
      };
    default:
      return {
        schema: signUpSchemaRecruiter,
        initialValues: recruiterInitialValues
      };
  }
};

type TActiveStep =
  | 'candidate-details'
  | 'company-details'
  | 'employer-details'
  | 'candidate-credentials';

export function SignUp() {
  const router = useRouter();
  const state = useRouterState();
  const { schema, initialValues } = useSignUpSchema(router.state.location.hash as TActiveStep);
  const form = useForm({
    initialValues,
    validate: zodResolver(schema)
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent): string | undefined => {
      if (form.isDirty()) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form.isDirty()]);

  return (
    <Container size='lg' h='100vh'>
      <Flex justify='center' align='center' h='100%'>
        <Paper withBorder radius='md' w='100%' maw='500px' p='xl'>
          {state.location.hash === 'company-details' ? (
            <CompanyDetails form={form} />
          ) : state.location.hash === 'candidate-details' ? (
            <CandidateDetail />
          ) : (
            <Tabs
              keepMounted={false}
              value={state.location.hash as TActiveStep}
              defaultValue='employer-details'
              onChange={(value) => {
                router.history.push('/signup#' + value);
              }}
            >
              <Tabs.List grow>
                <Tabs.Tab value='candidate-credentials'>Talent</Tabs.Tab>
                <Tabs.Tab value='employer-details'>Employer</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='candidate-credentials'>
                <TalentForm form={form} />
              </Tabs.Panel>
              <Tabs.Panel value='employer-details'>
                <EmployerForm form={form} />
              </Tabs.Panel>
            </Tabs>
          )}
        </Paper>
      </Flex>
    </Container>
  );
}

export const signUpRoute = new Route({
  path: 'signup',
  component: SignUp,
  getParentRoute: () => defaultLayoutRoute
});
