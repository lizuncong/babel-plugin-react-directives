import classnames from 'classnames';

import './SwiperCard.less';


export default function SwiperItemCard() {
  const cls = classnames(['btn', 'btn_sml'])
  return (
    <Card
      classNames={[prefixCls, getPrefixCls('swiper-card')].concat(classNames || [])}
    >
      <span className={cls}></span>
      <button
        className={classnames(['btn', 'btn__pre'])}
        id='testbtn'
      />
      <button
        className={classnames(['btn', 'btn__pre'])}
        id='testbtn'
      />
      <span className='btn'></span>
      <span className='btn btn_primary'></span>
      <span classNames="btn_middle"></span>
      <div className={classnames('btn', 'btn_primary')}></div>
    </Card>
  );
}
