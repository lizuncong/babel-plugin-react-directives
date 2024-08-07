import clsname from 'classnames';
import SwiperCard from './SwiperCard.less';
export default function SwiperItemCard() {
  const cls = clsname([SwiperCard.btn, SwiperCard.btn_sml]);
  console.log('test');
  return <Card classNames={[prefixCls, getPrefixCls('swiper-card')].concat(classNames || [])}>
      <span //data-comp_id=link_more
    //data-com_name="link_more_name" 
    className={cls}></span>
      <button className={clsname([SwiperCard.btn, SwiperCard.btn__pre])} id='testbtn' />
      <button className={[SwiperCard.listRule1, SwiperCard.listRule2, cls].join(" ")} id='okbtn' />
      <span className={SwiperCard.btn}></span>
      <span className={clsname(SwiperCard.btn, SwiperCard.btn_primary)}></span>
      <span classNames={SwiperCard.btn_middle}></span>
      <div className={clsname(SwiperCard.btn, SwiperCard.btn_primary)}></div>
    </Card>;
}