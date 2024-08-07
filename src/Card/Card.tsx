import { useResponsive } from '@hooks';
import { ConfigContext } from '@publicComponents';
import classnames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Card.less';

export interface ICard {
  title?: string | ReactNode;
  description?: string;
  headSlot?: ReactNode;// 标题栏插槽
  children?: ReactNode;
  classNames?: string[];
  moreLink?: string;
  // 支持自定义响应式宽度
  style?: React.CSSProperties;
  comp_id?: string;
  MoreComps?: React.ReactNode;
}

export default function Card(prop: ICard) {
  const { getPrefixCls, l } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('card');
  const responsiveData = useResponsive();
  const { MoreComps, style, classNames, title, description, headSlot, moreLink, children } = prop;

  return (
    <section
      className={classnames([prefixCls, responsiveData.className].concat(classNames || ''))}
      style={style ? style : { width: responsiveData.rootWidth }}
      // data-comp_id={prop.title}
    >
      <h2>
        {title}
        {description && <span className="description">{description}</span>}
        {headSlot}
        {moreLink && (
          <Link
            className="btn__more"
            to={moreLink}
            data-comp_id="link_more"
          >
            {l('card.more')}
          </Link>
        )}
        {MoreComps && (<div className="btn__more">{MoreComps}</div>)}
      </h2>

      <div className={classnames([`${prefixCls}__block`])}>
        {children}
      </div>
    </section>
  );
}
