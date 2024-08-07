/*
 * @Description: 翻页卡
 * @Author: jesseding
 * @Date: 2021-02-23 17:20:57
 * @Last Modified by:   jesseding
 * @Last Modified time: 2021-02-23 17:20:57
 */
import { useResponsive } from '@hooks';
import { ConfigContext } from '@publicComponents';
import classnames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Card from './Card';
import { useActivate } from '@tencent/syzs-react-activation';
import SwiperCard from './SwiperCard.less';
export default function SwiperItemCard(props) {
  const {
    title,
    description,
    classNames,
    step = 1,
    moreLink,
    children,
    itemSelector,
    pageButtonTop,
    style,
    movingSupplementWidth = 10,
    calculationGapWidth = 0,
    defaultIndex = 0
  } = props;
  const {
    getPrefixCls
  } = useContext(ConfigContext);
  const {
    rootWidth
  } = useResponsive();
  const prefixCls = getPrefixCls('swiper-item-card');
  const [isHover] = useState(true);
  const animateData = useRef({
    timerId: 0,
    startTime: 0,
    animateTime: 200,
    startOffset: 0,
    endOffset: 0
  });
  const domRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);
  const animate = () => {
    if (!domRef.current) return;
    const data = animateData.current;
    const diffTime = Date.now() - data.startTime;
    let p = (diffTime / data.animateTime) ** 1.65;
    if (p >= 1) {
      p = 1;
    } else {
      window.cancelAnimationFrame(animateData.current.timerId);
      animateData.current.timerId = window.requestAnimationFrame(animate);
    }
    const srollLeft = (data.endOffset - data.startOffset) * p + data.startOffset;
    const maxScrollLeft = domRef.current.scrollWidth - domRef.current.offsetWidth - calculationGapWidth;
    if (leftBtnRef.current && rightBtnRef.current) {
      rightBtnRef.current.style.display = srollLeft >= maxScrollLeft || !isHover ? 'none' : 'flex';
      leftBtnRef.current.style.display = srollLeft === 0 || !isHover ? 'none' : 'flex';
    }
    domRef.current.scrollLeft = srollLeft;
  };
  let curIndex = 0;
  let itemList = [];
  const changeIndex = index => {
    curIndex = index;
    if (curIndex < 0) {
      curIndex = 0;
    }
    if (curIndex > itemList.length - 1) {
      curIndex = Math.max(itemList.length - 1, 0);
    }
    if (domRef.current && itemList[curIndex]) {
      const item = itemList[curIndex];
      animateData.current.startTime = Date.now();
      animateData.current.startOffset = domRef.current.scrollLeft;
      animateData.current.endOffset = item.offsetLeft - movingSupplementWidth;
    }
    animate();
  };
  useEffect(() => {
    if (domRef.current) {
      itemList = Array.prototype.slice.call(domRef.current.querySelectorAll(itemSelector));
      changeIndex(defaultIndex);
    }
    return () => {
      window.cancelAnimationFrame(animateData.current.timerId);
    };
  });
  useEffect(() => {
    if (!style?.width) {
      changeIndex(defaultIndex);
    }
  }, [defaultIndex, rootWidth, style]);
  useActivate(() => {
    if (!style?.width) {
      changeIndex(defaultIndex);
    }
  });
  return <Card title={title} description={description} classNames={[prefixCls, getPrefixCls('swiper-card')].concat(classNames || [])} style={style} moreLink={moreLink}>
      <div ref={domRef} className={classnames([SwiperCard.movie])}>
        {children}
      </div>
      <button ref={leftBtnRef} className={classnames([SwiperCard.btn, SwiperCard.btn__pre])} data-comp_id="SwiperCard-Prev" style={{
      top: pageButtonTop ? `${pageButtonTop}px` : '50%'
    }} type="button" onClick={() => changeIndex(curIndex - step)} />

      <button ref={rightBtnRef} className={classnames([SwiperCard.btn, SwiperCard.btn__next])} data-comp_id="SwiperCard-Next" style={{
      top: pageButtonTop ? `${pageButtonTop}px` : '50%'
    }} type="button" onClick={() => changeIndex(curIndex + step)} />
    </Card>;
}