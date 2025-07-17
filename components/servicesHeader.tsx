
import '../styles/services.css'

export default function ServicesHeader() {

    const currentYear = new Date().getFullYear();

    return (
        <div className='services-header-container'>
            <h2>Стоимость укладки плитки на {currentYear} г</h2>
            <p>Ниже представлен прайс-лист, который содержит цены работ по укладке плитки за м2. Итоговая сумма зависит от сложности выкладки, особенностей геометрии пола и других нюансов.</p>
            <p>Укладка плитки шириной до 600мм считается погонным метром по цене квадратного</p>
            <p>Укладка плитки по диагонали, ёлочкой +30%</p>
        </div>
    )
}