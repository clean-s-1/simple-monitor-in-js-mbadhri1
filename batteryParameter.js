class SOC {
	static min = 20;
	static max = 80;
	static thresoldPercentage = 5;
	static warningThresold = (SOC.max * SOC.thresoldPercentage) / 100;

	constructor(value) {
		this.value = value;
	}
}
SOC.prototype.ranges = [
	{
		min: 0,
		max: SOC.min,
		message: 'State of charge out of range. Low SOC Breach',
	},
	{
		min: SOC.min,
		max: SOC.min + SOC.warningThresold,
		message: 'Warning: State of charge Approaching discharge',
		validRange: true,
	},
	{
		min: SOC.min + SOC.warningThresold,
		max: SOC.max - SOC.warningThresold,
		// message: 'Normal SOC State',
		validRange: true,
	},
	{
		min: SOC.max - SOC.warningThresold,
		max: SOC.max,
		message: 'Warning: State of charge Approaching charge-peak',
		validRange: true,
	},
	{
		min: SOC.max,
		max: Infinity,
		message: 'State of charge out of range. High SOC Breach',
	},
];

class Temperature {
	static min = 0;
	static max = 45;
	static thresoldPercentage = 5;
	static warningThresold =
		(Temperature.max * Temperature.thresoldPercentage) / 100;
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
		min: 0,
		max: Temperature.min,
		message: 'Temperature out of range. Low Temperature Breach',
	},
	{
		min: Temperature.min,
		max: Temperature.min + Temperature.warningThresold,
		message: 'Warning: Temperature Approaching discharge',
		validRange: true,
	},
	{
		min: Temperature.min + Temperature.warningThresold,
		max: Temperature.max - Temperature.warningThresold,
		// message: 'Normal Temperature State',
		validRange: true,
	},
	{
		min: Temperature.max - Temperature.warningThresold,
		max: Temperature.max,
		message: 'Warning: Temperature Approaching charge-peak',
		validRange: true,
	},
	{
		min: Temperature.max,
		max: Infinity,
		message: 'Temperature out of range. High Temperature Breach',
	},
];

class ChargeRate {
	static min = -Infinity;
	static max = 0.8;
	static thresoldPercentage = 5;
	static warningThresold =
		(ChargeRate.max * ChargeRate.thresoldPercentage) / 100;
	constructor(value) {
		this.value = value;
	}
}
ChargeRate.prototype.ranges = [
	{
		min: ChargeRate.min,
		max: ChargeRate.max - ChargeRate.warningThresold,
		// message: 'Normal Charge Rate State',
		validRange: true,
	},
	{
		min: ChargeRate.max - ChargeRate.warningThresold,
		max: ChargeRate.max,
		message: 'Warning: Charge Rate Approaching charge-peak',
		validRange: true,
	},
	{
		min: ChargeRate.max,
		max: Infinity,
		message: 'Charge Rate out of range. High Charge Rate Breach',
	},
];

module.exports = { Temperature, SOC, ChargeRate };
