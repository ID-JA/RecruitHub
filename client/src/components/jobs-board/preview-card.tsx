import {
  Paper,
  Flex,
  Box,
  Title,
  Group,
  Button,
  ActionIcon,
  ScrollArea,
  Text
} from '@mantine/core';
import {
  IconClock,
  IconLocationExclamation,
  IconBuilding,
  IconBookmark
} from '@tabler/icons-react';

type JobDetails = {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string;
  companyDescription: string;
  jobDescription: string;
  postedDate: string;
  jobType: string;
  companySize: string;
  companyLogo: string;
};

export function JobOfferPreviewCard() {
  return (
    <Paper style={{ height: '100vh' }} withBorder>
      <Flex direction='column'>
        <Box
          p='lg'
          style={{
            borderBottom: '2px solid #00000014',
            boxShadow: '0 2px 4px #00000014',
            fontSize: '.875rem',
            fontWeight: '400',
            lineHeight: '20px'
          }}
        >
          <Title order={3} my='md'>
            Remote Freelance Full Stack Developer (Senior-level)
          </Title>
          <div
            style={{
              display: 'flex'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconClock size={20} style={{ color: '#76797C' }} />
              <Text c='gray'>{new Date().toLocaleDateString()}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconLocationExclamation
                size={20}
                style={{ color: '#76797C', marginLeft: '30px', marginTop: '6px' }}
              />
              <Text c='gray'>Casablanca</Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconBuilding
                size={20}
                style={{ color: '#76797C', marginLeft: '30px', marginTop: '6px' }}
              />
              <Text c='gray'>Google Inc</Text>
            </div>
          </div>
          <Group align='center' my='md'>
            <Button size='md'>Apply now</Button>
            <ActionIcon variant='light' c='gray' size='xl' aria-label='Settings'>
              <IconBookmark style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Box>
        <ScrollArea h={500} pt='md'>
          <Box mx='md' mb='md'>
            <Box>
              <Title order={3} fw={600}>
                Job details
              </Title>
            </Box>
            <div translate='no' className='tiptap ProseMirror' tabIndex={0} spellCheck='false'>
              <p>
                <strong>A propos de nous:</strong>
              </p>
              <p style={{ textAlign: 'start' }}>
                Nous sommes une plateforme collaborative qui vous permet d'organiser votre visite
                privée et personnalisée avec un guide local.
              </p>
              <p style={{ textAlign: 'start' }}>
                <strong>Description du poste :</strong>
              </p>
              <p style={{ textAlign: 'start' }}>
                Nous recherchons un développeur freelance Laravel PHP expérimenté pour rejoindre
                notre équipe dynamique. En tant que développeur freelance Laravel PHP, vous serez
                responsable du développement et de la maintenance d'applications web et
                d'automatisations pour un projet de 2 mois. Si vous êtes passionné par le
                développement web, que vous avez un sens aigu du détail et que vous avez à cœur de
                créer un code propre et efficace, nous voulons vous connaître.
              </p>
              <p style={{ textAlign: 'start' }}>
                <strong>Responsabilités :</strong>
              </p>
              <ul>
                <li>
                  <p>
                    Développer, tester, améliorer et déployer des applications web de haute qualité
                    en utilisant Laravel PHP
                  </p>
                </li>
                <li>
                  <p>
                    Collaborer avec l'équipe de direction pour définir, concevoir et livrer de
                    nouvelles fonctionnalités.
                  </p>
                </li>
                <li>
                  <p>Déboguer et optimiser le code en termes de performances et de sécurité.</p>
                </li>
                <li>
                  <p>
                    Se tenir au courant des tendances et des technologies de l'industrie pour
                    s'assurer que nos applications sont à la pointe de l'innovation.
                  </p>
                </li>
                <li>
                  <p>
                    Participer aux revues de code et fournir des commentaires constructifs aux
                    membres de l'équipe.
                  </p>
                </li>
              </ul>
              <p style={{ textAlign: 'start' }}>
                <strong>Exigences :</strong>
              </p>
              <ul>
                <li>
                  <p>
                    Être capable d'approfondir un environnement existant et d'améliorer les
                    fonctionnalités actuelles grâce à l'automatisation.
                  </p>
                </li>
                <li>
                  <p>
                    Forte compréhension du framework Laravel et du langage de programmation PHP (php
                    7)
                  </p>
                </li>
                <li>
                  <p>
                    Solide compréhension des technologies frontales, telles que JavaScript, HTML5,
                    CSS3, SASS
                  </p>
                </li>
                <li>
                  <p>
                    Expérience des bases de données relationnelles (MySQL) et de la conception de
                    bases de données
                  </p>
                </li>
                <li>
                  <p>Familiarité avec les systèmes de contrôle de version (GitHub)</p>
                </li>
                <li>
                  <p>
                    Excellentes compétences en matière de résolution de problèmes et de
                    communication
                  </p>
                </li>
                <li>
                  <p>Experience avec RESTful API development</p>
                </li>
                <li>
                  <p>Connaissance des frameworks frontaux (Vue.js 2.6)</p>
                </li>
                <li>
                  <p>Méthodologie Scrum / Agile</p>
                </li>
              </ul>
              <p style={{ textAlign: 'start' }}>
                <strong>Durée du projet : 2 Mois</strong>
              </p>
              <p style={{ textAlign: 'start' }}>
                <strong>Rémunération : 1500 euros / mois ( 3000 euros pour le projet )</strong>
              </p>
              <p style={{ textAlign: 'start' }}>
                <strong>Comment postuler :</strong>
              </p>
              <p style={{ textAlign: 'start' }}>
                Veuillez soumettre votre CV, ainsi que tout portfolio pertinent ou/et GitHub.
              </p>
              <p style={{ textAlign: 'start' }}>Job Type: Full-time</p>
              <p style={{ textAlign: 'start' }}>Salary: 15,000.00DH - 16,500.00DH per month</p>
              <p style={{ textAlign: 'start' }}>Application Question(s):</p>
              <ul>
                <li>
                  <p>PHP/LARAVEL experience</p>
                </li>
              </ul>
              <p style={{ textAlign: 'start' }}>Experience:</p>
              <ul>
                <li>
                  <p>IT: 5 years (Required)</p>
                </li>
              </ul>
              <p style={{ textAlign: 'start' }}>Language:</p>
              <ul>
                <li>
                  <p>French (Preferred)</p>
                </li>
                <li>
                  <p>English (Preferred)</p>
                </li>
              </ul>
            </div>
          </Box>
        </ScrollArea>
      </Flex>
    </Paper>
  );
}
