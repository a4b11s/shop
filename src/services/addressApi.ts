export const getCountryArray = () => {
	return ['Ukrainian', 'Poland', 'Great Britain'];
};

export const getCityArray = (country: string) => {
	if (country === 'Ukrainian') return ['Kharkiv', 'Kyiv'];
	if (country === 'Poland') return ['Krakov'];
	if (country === 'Great Britain') return ['London'];
	return [''];
};

export const getAddressArray = (city: string) => {
	if (city === 'Kharkiv') return ['Heroiv Kharkiva', 'Studentska', 'Rybalko'];
	if (city === 'Kyiv') return ['Khreschatyk'];
	if (city === 'Krakov') return ['Skavinska'];
	if (city === 'London') return ['Glazbury Rd'];
	return [''];
};
