class SOC {
	static name = 'State of Charge';
	static min = 20;
	static max = 80;
	static thresoldPercentage = 5;
	static warningThresold = (SOC.max * SOC.thresoldPercentage) / 100;

	constructor(value) {
		this.value = value;
	}
}
SOC.prototype.ranges = getRanges(SOC);

class Temperature {
	static name = 'Temperature';
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
Temperature.prototype.ranges = getRanges(Temperature);

class ChargeRate {
	static name = 'ChargeRate';
	static min = -Infinity;
	static max = 0.8;
	static thresoldPercentage = 5;
	static warningThresold =
		(ChargeRate.max * ChargeRate.thresoldPercentage) / 100;
	constructor(value) {
		this.value = value;
	}
}
ChargeRate.prototype.ranges = getRanges(ChargeRate);

function getRanges(Parameter) {
	return [
		{
			min: 0,
			max: Parameter.min,
			message: `${Parameter.name} out of range. Low ${Parameter.name} Breach`,
			validRange: false,
		},
		{
			min: Parameter.min,
			max: Parameter.min + Parameter.warningThresold,
			message: `Warning: ${Parameter.name} Approaching Low`,
			validRange: true,
		},
		{
			min: Parameter.min + Parameter.warningThresold,
			max: Parameter.max - Parameter.warningThresold,
			// message: `Normal ${Parameter.name} State`,
			validRange: true,
		},
		{
			min: Parameter.max - Parameter.warningThresold,
			max: Parameter.max,
			message: `Warning: ${Parameter.name} Approaching Peak`,
			validRange: true,
		},
		{
			min: Parameter.max,
			max: Infinity,
			message: `${Parameter.name} out of range. High ${Parameter.name} Breach`,
			validRange: false,
		},
	];
}
module.exports = { Temperature, SOC, ChargeRate };
