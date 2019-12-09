import React from 'react';

import style from './teaserSpider.module.css';

import { ReactComponent as Youtube } from '../../assets/icons/play.svg';

const TeaserSpider = () => {
  return (
    <div className={style.container}>
      <div className={style.web} />
      <a
        href="https://www.youtube.com/watch?v=FiytSAfOPzk"
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
        rel="noreferrer"
        className={style.content}
        title="Watch Aurora'20 Teaser on Youtube"
      >
        <Youtube />
      </a>
      <div className={style.left}>
        <div className={style.uno} style={{ width: '0px' }}>
          <div className={style.uno}>
            <div className={style.uno}>
              <div className={style.uno} />
            </div>
          </div>
        </div>
        <div className={style.dos} style={{ width: '0px' }}>
          <div className={style.dos}>
            <div className={style.dos}>
              <div className={style.dos} />
            </div>
          </div>
        </div>
        <div className={style.tres} style={{ width: '0px' }}>
          <div className={style.tres}>
            <div className={style.tres}>
              <div className={style.tres} />
            </div>
          </div>
        </div>
        <div className={style.cuatro} style={{ width: '0px' }}>
          <div className={style.cuatro}>
            <div className={style.cuatro}>
              <div className={style.cuatro} />
            </div>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.uno} style={{ width: '0px' }}>
          <div className={style.uno}>
            <div className={style.uno}>
              <div className={style.uno} />
            </div>
          </div>
        </div>
        <div className={style.dos} style={{ width: '0px' }}>
          <div className={style.dos}>
            <div className={style.dos}>
              <div className={style.dos} />
            </div>
          </div>
        </div>
        <div className={style.tres} style={{ width: '0px' }}>
          <div className={style.tres}>
            <div className={style.tres}>
              <div className={style.tres} />
            </div>
          </div>
        </div>
        <div className={style.cuatro} style={{ width: '0px' }}>
          <div className={style.cuatro}>
            <div className={style.cuatro}>
              <div className={style.cuatro} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeaserSpider;
