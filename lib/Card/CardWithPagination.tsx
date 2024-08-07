/*
 * @Author: yanxia@tencent.com
 * @Date: 2020-12-17 17:06:08
 * @LastEditTime: 2021-01-05 11:43:04
 * @LastEditors: yanxia@tencent.com
 * @Description: Description
 */
import { ConfigContext } from '@publicComponents';
import { _ } from '@tencent/syzs-market-utils';
import React, { useCallback, useContext, useRef, useState } from 'react';
import Slider from 'react-slick';
import Card from './Card';
import CardWithPagination from './CardWithPagination.less';
export const CardWithPagination = prop => {
  const {
    getPrefixCls
  } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('card-with-pagination');
  const {
    title,
    description,
    headSlot,
    classNames,
    moreLink,
    style,
    comp_id,
    MoreComps,
    children,
    moreCompList,
    sliderSettings,
    showCustomPagination
  } = prop;
  const [currentPage, setCurrentPage] = useState(1);
  const itemLength = React.Children.count(children);
  const sliderRef = useRef(null);
  const handlePaginationLeft = useCallback(_.throttle(() => {
    sliderRef.current?.slickPrev();
  }, 500), []);
  const handlePaginationRight = useCallback(_.throttle(() => {
    sliderRef.current?.slickNext();
  }, 500), []);
  const settings = useRef({
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    afterChange: current => {
      setCurrentPage(current + 1);
    },
    ...sliderSettings
  }).current;
  return <Card title={title} description={description} headSlot={headSlot} moreLink={moreLink} style={style} comp_id={comp_id} MoreComps={moreCompList ? moreCompList[currentPage - 1] : MoreComps} classNames={[prefixCls].concat(classNames || [])}>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
      {showCustomPagination && itemLength > 1 && <div className={CardWithPagination.pagination}>
          <div className={CardWithPagination.pagination-left} role="button" onClick={handlePaginationLeft} data-comp_id="paginationPrev" />
          <div className={CardWithPagination.pagination-num}>{currentPage}</div>
          <div className={CardWithPagination.pagination-right} role="button" onClick={handlePaginationRight} data-comp_id="paginationNext" />
        </div>}
    </Card>;
};