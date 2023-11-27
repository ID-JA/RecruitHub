import './Banner.css';
import Earth from '../../../../assets/Home/earth.png';
import { Link } from '@tanstack/react-router';
const Banner = () => {
  return (
    <div className='banner-container'>
      <div className='banner-left'>
        <div>Work from anywhere</div>
        <div>Find your dream job, wherever you may be</div>
        <div>
          Flexibility is the key to happiness. Whether you’re remote, hybrid, or fully in-office,
          Hired will connect you directly with hiring managers at leading tech companies.
        </div>
        <Link to={'/'}>I'm a Jobseeker</Link>
      </div>
      <div className='banner-right'>
        <img src={Earth} alt='earth' />
      </div>
    </div>
  );
};

export default Banner;
