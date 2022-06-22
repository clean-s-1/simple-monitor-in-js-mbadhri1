class SOC {
	constructor(value) {
		this.value = value;
	}
}
SOC.prototype.ranges = [
	{
		min: 0,
		max: 20,
		message: 'State of charge out of range. Low SOC Breach',
	},
	{
		min: 20,
		max: 24,
		message: 'Warning: State of charge Approaching discharge',
		validRange: true,
	},
	{
		min: 24,
		max: 76,
		// message: 'Normal SOC State',
		validRange: true,
	},
	{
		min: 76,
		max: 80,
		message: 'Warning: State of charge Approaching charge-peak',
		validRange: true,
	},
	{
		min: 80,
		max: 100,
		message: 'State of charge out of range. High SOC Breach',
	},
];

class Temperature {
	constructor(value, unit = 'celcius') {
		this.value = value;
		if (unit === 'farenheit') {
			this.value = Temperature.farenheitToCencius(value);
		}
	}

	static farenheitToCencius(farenheit) {
		return ((farenheit - 32) * 5) / 9;
	}
}
Temperature.prototype.ranges = [
	{
		min: -Infinity,
		max: 0,
		message: 'Temperature out of range. Low Temperature Breach',
	},
	{
		min: 0,
		max: 2.25,
		message: 'Warning: Temperature Approaching discharge',
		validRange: true,
	},
	{
		min: 2.25,
		max: 42.75,
		// message: 'Normal Temperature State',
		validRange: true,
	},
	{
		min: 42.75,
		max: 45,
		message: 'Warning: Temperature Approaching charge-peak',
		validRange: true,
	},
	{
		min: 45,
		max: Infinity,
		message: 'Temperature out of range. High Temperature Breach',
	},
];

class ChargeRate {
	constructor(value) {
		this.value = value;
	}
}
ChargeRate.prototype.ranges = [
	{
		min: -Infinity,
		max: 0.76,
		// message: 'Normal Charge Rate State',
		validRange: true,
	},
	{
		min: 0.76,
		max: 0.8,
		message: 'Warning: Charge Rate Approaching charge-peak',
		validRange: true,
	},
	{
		min: 0.8,
		max: Infinity,
		message: 'Charge Rate out of range. High Charge Rate Breach',
	},
];

module.exports = { Temperature, SOC, ChargeRate };
