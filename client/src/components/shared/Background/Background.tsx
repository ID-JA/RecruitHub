import classes from './Background.module.css';

export const Background = () => {
  return (
    <div className={classes.root}>
      <div className={classes.before} />
      <div className={classes.after} />
      <div className={classes.content} />
    </div>
  );
};
