import { Text, Title, Button, Image } from '@mantine/core';
import image from '../../../../assets/Home/earth.svg';
import classes from './Banner.module.css';
import { Link } from '@tanstack/react-router';

function Banner() {
  return (
    <div style={{ margin: '100px 0px' }} className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Work from anywhere!</Title>
        <Text fw={500} fz='lg' mb={5}>
          Find your dream job, wherever you may be
        </Text>
        <Text fz='sm' c='dimmed'>
          Flexibility is the key to happiness. Whether you’re remote, hybrid, or fully in-office,
          Hired will connect you directly with hiring managers at leading tech companies.
        </Text>

        <div className={classes.controls}>
          <Link to={'/'}>
            <Button className={classes.control}>I'm a Jobseeker</Button>
          </Link>
        </div>
      </div>
      <Image src={image} className={classes.image} />
    </div>
  );
}
export default Banner;
