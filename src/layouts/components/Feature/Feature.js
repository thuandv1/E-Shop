import classNames from 'classnames/bind'
import styles from './Feature.module.scss'

import images from 'assets/images'
import FeatureItem from './FeatureItem'

const cx = classNames.bind(styles)

function Feature() {
    return (
        <div className={cx('div-p1', 'feature')}>
            <FeatureItem image={images.feature1} title={'Đặt Hàng Online'} />
            <FeatureItem image={images.feature2} title={'Free Shipping'} />
            <FeatureItem image={images.feature3} title={'Hoàn Tiền'} />
            <FeatureItem image={images.feature4} title={'Khuyến Mãi'} />
            <FeatureItem image={images.feature5} title={'Dịch Vụ Tốt'} />
            <FeatureItem image={images.feature6} title={'Hỗ Trợ F24/7'} />
        </div>
    )
}

export default Feature
