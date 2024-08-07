import classnames from 'classnames';
import SwiperCard from './SwiperCard.less';
export default function SwiperItemCard() {
  const cls = classnames([SwiperCard.btn, SwiperCard.btn_sml]);
  return <Card>
      <span className={cls}></span>
      <button className={classnames([SwiperCard.btn, SwiperCard.btn__pre])} id='testbtn' />
      <button className={classnames([SwiperCard.btn, SwiperCard.btn__pre])} id='testbtn' />
      <span className={SwiperCard.btn}></span>
      <span className={classnames(SwiperCard.btn, SwiperCard.btn_primary)}></span>
      <span classNames={SwiperCard.btn_middle}></span>
      <div className={classnames(SwiperCard.btn, SwiperCard.btn_primary)}></div>
    </Card>;
}