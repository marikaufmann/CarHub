import { CarProps, FilterProps } from "../types";
import { manufacturers } from '../constants/index';

export async function fetchCars(filters: FilterProps) {
	const headers = {
		'X-RapidAPI-Key': '9d0b74eedcmsh5fc7256b22a87e3p12f099jsn2ab43b1276b2',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
	const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${filters.model}&make=${filters.manufacturer}&fuel_type=${filters.fuel}&year=${Number(filters.year)}&limit=${Number(filters.limit)}`, {
		headers: headers
	})

	const result = await response.json()

	return result
}
export async function fetchCarsByManufacturer(manufacturer: string) {
	const headers = {
		'X-RapidAPI-Key': '9d0b74eedcmsh5fc7256b22a87e3p12f099jsn2ab43b1276b2',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
	const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}`, {
		headers: headers
	})

	const result = await response.json()

	return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 50;
	const mileageFactor = 0.1;
	const ageFactor = 0.05;

	const mileageRate = city_mpg * mileageFactor;
	const ageRate = (new Date().getFullYear() - year) * ageFactor;

	const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

	return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
	const url = new URL("https://cdn.imagin.studio/getimage");
	const { make, model, year } = car;

	url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
	url.searchParams.append('make', make);
	url.searchParams.append('modelFamily', model.split(" ")[0]);
	url.searchParams.append('zoomType', 'fullscreen');
	url.searchParams.append('modelYear', `${year}`);
	url.searchParams.append('paintId', 'pspc0116');
	// url.searchParams.append('zoomLevel', zoomLevel);
	url.searchParams.append('angle', `${angle}`);

	return `${url}`;
}


export const updateSearchParams = (type: string, value: string) => {
	const searchParams = new URLSearchParams(window.location.search)
	searchParams.set(type, value)
	const newPathName = `${window.location.pathname}?${searchParams.toString()}`
	return newPathName
}