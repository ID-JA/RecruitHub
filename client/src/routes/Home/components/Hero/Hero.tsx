import { Link } from '@tanstack/react-router';
import './Hero.css';
const Hero = () => {
  const tags = [
    'Equity',
    'Startup',
    'Remote only',
    'Vue.js',
    '$125K',
    'React',
    'Python',
    'Biotech',
    'Mentoriship',
    'WFH',
    '401K',
    'Social impact'
  ];
  let oldMarginLeft = 0;
  return (
    <div className='hero-container'>
      <h1 className='hero-title'>Employ your potential.</h1>
      <div className='hero-desc'>
        <p>
          Looking for a new role? Create a profile on Hired to connect directly with growing tech
          teams. Hiring? We're the go-to platform for sourcing the best tech talent out there.
        </p>
        <h3>Millions of vetted candidates</h3>
      </div>
      <div className='hero-buttons'>
        <Link to={'/login'} className='hero-button'>
          I'm a Jobseeker
        </Link>
        <Link to={'/login'} className='hero-button hero-hiring'>
          I'm Hiring
        </Link>
      </div>
      <div className='hero-quot-tags'>
        <div className='hero-quots'>
          <span className='quot'>"</span>
          <h2>This is what recruiting should look like.</h2>
          <b>Joseph G. Software Engineer</b>
        </div>
        <div className='hero-tags-container'>
          {tags.map((e, i) => {
            if (i % 2 != 0) {
              return (
                <div key={i} className='hero-tags'>
                  {e}
                </div>
              );
            } else {
              oldMarginLeft += 50;
              return (
                <>
                  <br />
                  <div key={i} className='hero-tags' style={{ marginLeft: `${oldMarginLeft}px` }}>
                    {e}
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
      <center>
        <div className='hero-footer'>10,000+ innovative companies</div>
      </center>
    </div>
  );
};

export default Hero;
