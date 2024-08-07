import clsname from 'classnames';
import './SwiperCard.less';
export default function SwiperItemCard() {
  const cls = clsname(['btn', 'btn_sml'])
  console.log('test')
  return (
    <Card
      classNames={[prefixCls, getPrefixCls('swiper-card')].concat(classNames || [])}
    >
      <span data-comp_id="link_more" //data-com_name="link_more_name" 
      className={cls}
       ></span>
      <button
        className={clsname(['btn', 'btn__pre'])}
        id='testbtn'
      />
      <button
        className={["listRule1", "listRule2", cls].join(" ")}
        id='okbtn'
      />
      <span className='btn'></span>
      <span className='btn btn_primary'></span>
      <span classNames="btn_middle"></span>
      <div className={clsname('btn', 'btn_primary')}></div>
    </Card>
  );
}
