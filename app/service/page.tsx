'use client'
import '../../styles/services.css'
import Slider from './slider';
import OtherServices from './otherServices'
import { useState } from 'react';
import type { TService } from '@/types';

export default function CurrentServicePage() {

    const [currentService, setCurrentService] = useState<TService | null>(null);

    return(
        <>
            <Slider currentService = {currentService} setCurrentService = {setCurrentService}/>
            <h2 className='service-other-text'>Другие работы</h2>
            <OtherServices setCurrentService = {setCurrentService}/>
        </>
    )
}