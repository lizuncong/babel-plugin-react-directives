/* eslint-disable no-param-reassign */
import { useResponsive, useWhyDidYouUpdate } from '@hooks';
import { ConfigContext } from '@publicComponents';
import { _ } from '@tencent/syzs-market-utils';
import classnames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import DropDownCard from './DropDownCard.less';
function DropDownCard(prop) {
  const {
    getPrefixCls
  } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('dropDownCard');
  const {
    title,
    step = 4,
    children,
    itemSelector,
    col = 5,
    ratio = 1
  } = prop;
  const {
    rootWidth,
    column,
    className
  } = useResponsive();
  const difference = col - 4;
  const domRef = useRef(null);
  const [show] = useState(true);
  const [, setHeight] = useState(0);
  useWhyDidYouUpdate('DropDownCard', {
    prop
  });
  useEffect(() => {
    if (!domRef.current) return;
    let itemList = [];
    itemList = Array.prototype.slice.call(domRef.current.querySelectorAll(itemSelector));
    itemList.forEach((item, index) => {
      const width = (rootWidth - 16 * (column + difference - 1)) / (column + difference);
      item.style.width = `${width}px`;
      item.style.height = `${width * ratio + 54}px`;
      if ((index + 1) % (column + difference) === 0) {
        item.style.marginRight = '0';
      } else item.style.marginRight = '16px';
    });
  }, [column, children]);
  useEffect(() => {
    if (!domRef.current) return;
    let itemList = [];
    itemList = Array.prototype.slice.call(domRef.current.querySelectorAll(itemSelector));
    const itemHeight = itemList[0].clientHeight;
    const num = Math.ceil(step / (column + difference));
    setHeight(num * (itemHeight + 16));
  }, [column, step]);

  // useEffect(() => {
  //   if (!domRef.current) return;
  //   domRef.current.style.height = !show ? '0px' : `${height}px`;
  // }, [show]);

  return <section className={classnames([[prefixCls, className], [prefixCls, className]])} style={{
    width: rootWidth
  }}>
      <div role="button" className={DropDownCard.title}>
        <div>
          {title}
        </div>
      </div>

      <div ref={domRef} className={classnames([[`${prefixCls}__block`, `${show ? '' : 'hide'}`], [`${prefixCls}__block`, `${show ? '' : 'hide'}`]])}>
        {children}
      </div>
    </section>;
}
export default React.memo(DropDownCard, (pre, next) => _.stringifyWithoutReact(pre) === _.stringifyWithoutReact(next));