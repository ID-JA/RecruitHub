import { Link } from '@tanstack/react-router';
import './Categorie.css';
import { Fragment } from 'react';

const Categorie = () => {
  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile App Developer',
    'DevOps Engineer',
    'Quality Assurance (QA) Engineer',
    'UI/UX Designer',
    'Product Manager',
    'Data Scientist',
    'Machine Learning Engineer',
    'Cloud Solutions Architect',
    'Security Engineer',
    'Database Administrator',
    'Systems Analyst',
    'Technical Writer'
  ];
  const specialties = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript Developer',
    'React Developer',
    'Angular Developer',
    'Vue.js Developer',
    'Node.js Developer',
    'iOS Developer',
    'Android Developer',
    'Python Developer',
    'Java Developer',
    'Ruby on Rails Developer',
    'PHP Developer',
    'Network Security Engineer',
    'Database Administrator',
    'Systems Analyst',
    'Technical Writer'
  ];
  const subarraySize = Math.ceil(specialties.length / 3);
  const specialtiesArray1 = specialties.slice(0, subarraySize);
  const specialtiesArray2 = specialties.slice(subarraySize, subarraySize * 2);
  const specialtiesArray3 = specialties.slice(subarraySize * 2);
  return (
    <div className='categorie-container'>
      <div className='categorie-roles'>
        <div className='categorie-title'>Roles</div>
        {roles.map((e, i) => (
          <Fragment key={i}>
            <Link className='categories-item' to={'/login'} key={i}>
              {e}
            </Link>
            <br />
          </Fragment>
        ))}
      </div>
      <div className='categorie-speicalies'>
        <div className='categorie-title'>Specialies</div>
        <div className='categorie-speicalies-list'>
          <div>
            {specialtiesArray1 &&
              specialtiesArray1.map((e, i) => (
                <Fragment key={i}>
                  <Link className='categories-item' to={'/login'} key={i}>
                    {e}
                  </Link>
                  <br />
                </Fragment>
              ))}
          </div>
          <div>
            {specialtiesArray2 &&
              specialtiesArray2.map((e, i) => (
                <Fragment key={i}>
                  <Link className='categories-item' to={'/login'} key={i}>
                    {e}
                  </Link>
                  <br />
                </Fragment>
              ))}
          </div>
          <div>
            {specialtiesArray3 &&
              specialtiesArray3.map((e, i) => (
                <Fragment key={i}>
                  <Link className='categories-item' to={'/login'} key={i}>
                    {e}
                  </Link>
                  <br />
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorie;
