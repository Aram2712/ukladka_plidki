
import '../styles/sliderBox.css';

export default function FooterBox() {

    const currentYear = new Date().getFullYear();

    return (
        <div className='slider-container-footer-box'>
            © 2021 - { currentYear } Питерский плиточник
        </div>
    )
}