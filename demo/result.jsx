/*
 * @Description: 懒加载图片, 先拿高斯模糊的图片，拉到指定位置再用真实图片, 体积减少5倍
 * @Author: kadenwang@tencent.com
 * @Date: 2020-06-04 10:44:37
 * @LastEditors: yanxia@tencent.com
 * @LastEditTime: 2021-11-29 20:33:42
 */

/**
 * 组件文档: https://github.com/Aljullu/react-lazy-load-image-component#readme
 * 腾讯云数据万象文档: https://cloud.tencent.com/document/product/460/36545
 */

import { haloReport } from '@tencent/syzs-market-report';
import { normalizeImageLink } from '@utils';
import React, { useEffect, useRef } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
export interface ILazyImg extends LazyLoadImageProps {
  wrapperdivheight100?: boolean;
  wrapperdivstyle?: React.CSSProperties;
  noWrapper?: boolean;
}
const match = /Chrome\/(\d+)/.exec(window.navigator.userAgent);
const isChromeVersionSmallerThan77 = match?.groups && +match.groups[1] >= 77;
const LazyImg: React.FC<ILazyImg> = (props: ILazyImg) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const {
    src = '',
    wrapperdivheight100 = false,
    wrapperdivstyle = {},
    visibleByDefault,
    noWrapper,
    ...restProps
  } = props;
  let newSrc = src;
  useEffect(() => {
    if (!src) {
      window.aegis?.info(`没有图片src字端: props: ${JSON.stringify(props)} haloReport: ${JSON.stringify(haloReport.getReportEventData(domRef.current))}`);
    }
  }, [props, src]);
  newSrc = normalizeImageLink(newSrc);
  const newProps: LazyLoadImageProps = {
    effect: 'opacity',
    ...restProps,
    ...{
      style: {
        minHeight: '1px',
        ...restProps.style
      },
      src: newSrc,
      // 低版本浏览器可能存在问题 等升级到 77 再打开
      visibleByDefault: visibleByDefault ? visibleByDefault : isChromeVersionSmallerThan77
    }
  };
  if (noWrapper) {
    return <LazyLoadImage {...newProps} />;
  }
  return <div ref={domRef} className="lazyimg" style={{
    height: wrapperdivheight100 ? '100%' : 'unset',
    ...wrapperdivstyle
  }}>
      <LazyLoadImage {...newProps} />
    </div>;
};
export default React.memo(LazyImg, (pre, next) => JSON.stringify(pre) === JSON.stringify(next));