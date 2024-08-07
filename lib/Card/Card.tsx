import { useResponsive } from '@hooks';
import { ConfigContext } from '@publicComponents';
import classnames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card.less';
export default function Card(prop) {
  const {
    getPrefixCls,
    l
  } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('card');
  const responsiveData = useResponsive();
  const {
    MoreComps,
    style,
    classNames,
    title,
    description,
    headSlot,
    moreLink,
    children
  } = prop;
  return <section className={classnames([prefixCls, responsiveData.className].concat(classNames || ''))} style={style ? style : {
    width: responsiveData.rootWidth
  }}
  // data-comp_id={prop.title}
  >
      <h2>
        {title}
        {description && <span className={Card.description}>{description}</span>}
        {headSlot}
        {moreLink && <Link className={Card.btn__more} to={moreLink} data-comp_id="link_more">
            {l('card.more')}
          </Link>}
        {MoreComps && <div className={Card.btn__more}>{MoreComps}</div>}
      </h2>

      <div className={classnames([[`${prefixCls}__block`]])}>
        {children}
      </div>
    </section>;
}