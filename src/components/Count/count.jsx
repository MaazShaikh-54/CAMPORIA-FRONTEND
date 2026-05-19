import './count.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '../Button/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Count({ onCountChange, checkIn, checkOut }) {
    const { id } = useParams();
    const [campsite, setCampsite] = useState({ price: 0 });

    Count.propTypes = {
        onCountChange: PropTypes.func,
        checkIn: PropTypes.string,
        checkOut: PropTypes.string,
    };
    const [person, setPerson] = useState(1);
    const [priceVal, setPriceVal] = useState(0);
    const [addDisabled, setAddDisabled] = useState(false);
    const [subDisabled, setSubDisabled] = useState(true);

    useEffect(() => {
        const fetchCampsite = async () => {
            try {
                const res = await axios.get(`https://camporia-backend.onrender.com/campsites/${id}`);
                setCampsite(res.data);
                setPriceVal(res.data.price);
            } catch (err) {
                console.error("Error fetching campsite:", err);
            }
        };
        fetchCampsite();
    }, [id]);

    const addPerson = () => {
        if (person >= campsite.capacity) { setAddDisabled(true); return; }
        const newPersonCount = person + 1;
        setPerson(newPersonCount);
        if (newPersonCount >= campsite.capacity) setAddDisabled(true);
        setSubDisabled(false);
        onCountChange?.(newPersonCount);
    };

    const subPerson = () => {
        if (person === 1) return;
        const newPersonCount = person - 1;
        setPerson(newPersonCount);
        if (newPersonCount === 1) setSubDisabled(true);
        setAddDisabled(false);
        onCountChange?.(newPersonCount);
    };

    // const calculatePrice = (basePrice, persons, checkIn, checkOut) => {
    //     if (!checkIn || !checkOut) return basePrice * persons;

    //     const start = new Date(checkIn);
    //     const end = new Date(checkOut);
    //     let nights = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    //     let total = 0;

    //     for (let i = 0; i < nights; i++) {
    //         const day = new Date(start);
    //         day.setDate(day.getDate() + i);
    //         const dayOfWeek = day.getDay();
    //         const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    //         total += basePrice * (isWeekend ? 1.5 : 1);
    //     }

    //     return total * persons;
    // };

    useEffect(() => {
        if (!campsite.price) return;
        if (!checkIn || !checkOut) {
            setPriceVal(campsite.price * person);
            return;
        }
        const fetchPrice = async () => {
            try {
                const res = await axios.post("https://camporia-backend.onrender.com/journeys/preview-price", {
                    campsite: id,
                    checkIn,
                    checkOut,
                    personCount: person,
                });
                setPriceVal(res.data.totalPrice);
            } catch {
                setPriceVal(campsite.price * person);
            }
        };
        fetchPrice();
    }, [person, campsite.price, checkIn, checkOut, id]);

    return (
        <>
            <div className="count-container">
                <div className="priceVal">
                    <b>Price: </b> ₹ {priceVal}
                </div>
                <div className="count-btn">
                    <b>Person: </b>
                    <Button className={`person-btn ${subDisabled ? "subDisabled" : ""}`} text="-" onClick={subPerson} />
                    <span className='person'>{person}</span>
                    <Button className={`person-btn ${addDisabled ? "addDisabled" : ""}`} text="+" onClick={addPerson} />
                </div>
            </div>
        </>
    )
}