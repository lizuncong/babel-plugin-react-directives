/*
 * @Author: yanxia@tencent.com
 * @Date: 2020-12-17 17:06:08
 * @LastEditTime: 2021-01-05 11:43:04
 * @LastEditors: yanxia@tencent.com
 * @Description: Description
 */
import { ConfigContext } from '@publicComponents';
import { _ } from '@tencent/syzs-market-utils';
import React, { ReactNode, useCallback, useContext, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import Card, { ICard } from './Card';
import './CardWithPagination.less';

export interface ICardWithPagination extends ICard {
  moreCompList?: ReactNode[] | false;
  sliderSettings?: Settings;
  showCustomPagination?: boolean;
}

export const CardWithPagination: React.FC<ICardWithPagination> = (prop) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('card-with-pagination');

  const { title, description, headSlot, classNames, moreLink, style,
    comp_id, MoreComps, children, moreCompList, sliderSettings, showCustomPagination } = prop;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemLength = React.Children.count(children);

  const sliderRef = useRef<Slider>(null);

  const handlePaginationLeft = useCallback(_.throttle(() => {
    sliderRef.current?.slickPrev();
  }, 500), []);

  const handlePaginationRight = useCallback(_.throttle(() => {
    sliderRef.current?.slickNext();
  }, 500), []);

  const settings: Settings = useRef({
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    afterChange: (current: number) => {
      setCurrentPage(current + 1);
    },
    ...sliderSettings,
  }).current;

  return (
    <Card
      title={title}
      description={description}
      headSlot={headSlot}
      moreLink={moreLink}
      style={style}
      comp_id={comp_id}
      MoreComps={moreCompList ? moreCompList[currentPage - 1] : MoreComps}
      classNames={[prefixCls].concat(classNames || [])}
    >
      <Slider ref={sliderRef} {...settings}>
        { children }
      </Slider>
      { showCustomPagination && itemLength > 1 && (
        <div className="pagination">
          <div
            className="pagination-left"
            role="button"
            onClick={handlePaginationLeft}
            data-comp_id="paginationPrev"
          />
          <div className="pagination-num">{ currentPage }</div>
          <div
            className="pagination-right"
            role="button"
            onClick={handlePaginationRight}
            data-comp_id="paginationNext"
          />
        </div>
      )}
    </Card>
  );
};
