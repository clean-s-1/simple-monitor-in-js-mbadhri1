const { expect } = require('chai');
const translate = require('@vitalets/google-translate-api');
let globalLanguage = 'de';
function isThermalControlled(temperature) {
	checkWarning(temperature, 0, 45, 5, 'Temperature');
	if (isValueOutOfRange(temperature, 0, 45)) {
		alertMessage('Temperature');
		return false;
	}
	return true;
}

function isSOCControlled(soc) {
	checkWarning(soc, 20, 80, 5, 'State of Charge');
	if (isValueOutOfRange(soc, 20, 80)) {
		alertMessage('State of Charge');
		return false;
	}
	return true;
}
function isChargeRateControlled(chargeRate) {
	checkWarning(chargeRate, -Infinity, 0.8, 5, 'Charge Rate');
	if (isValueOutOfRange(chargeRate, -Infinity, 0.8)) {
		alertMessage('Charge Rate');
		return false;
	}
	return true;
}

function batteryStateIsOk(temperature, soc, chargeRate) {
	let isThermalControl = isThermalControlled(temperature);
	let isSOCControl = isSOCControlled(soc);
	let isChargeRateControl = isChargeRateControlled(chargeRate);

	return isThermalControl && isSOCControl && isChargeRateControl;
}

function alertMessage(parameter) {
	translate(`${parameter} is out of range!`, {
		to: globalLanguage,
	})
		.then((res) => console.log(res.text))
		.catch((err) => {
			console.error(err);
		});
}
function isValueGreaterThanMinRange(value, min) {
	return value >= min;
}
function isValueLesserThanMaxRange(value, max) {
	return value <= max;
}
function isValueOutOfRange(value, min, max) {
	return (
		!isValueGreaterThanMinRange(value, min) ||
		!isValueLesserThanMaxRange(value, max)
	);
}

function checkWarning(value, min, max, thresold, parameter) {
	if (value > min && value <= (min * (100 + thresold)) / 100) {
		dischargeWarning(parameter, value);
	}
	if (value <= max && value > (max * (100 - thresold)) / 100) {
		peakWarning(parameter, value);
	}
}

function dischargeWarning(parameter, value) {
	translate(`Warning: Approaching ${parameter} discharge! ${value}`, {
		to: globalLanguage,
	})
		.then((res) => console.log(res.text))
		.catch((err) => {
			console.error(err);
		});
}

function peakWarning(parameter, value) {
	translate(`Warning: Approaching ${parameter} peak ${value}`, {
		to: globalLanguage,
	})
		.then((res) => console.log(res.text))
		.catch((err) => {
			console.error(err);
		});
}

expect(batteryStateIsOk(25, 77, 0.7)).to.be.true;
expect(batteryStateIsOk(20, 85, 0)).to.be.false;
expect(batteryStateIsOk(30, 70, 0.9)).to.be.false;
expect(batteryStateIsOk(60, 70, 1)).to.be.false;
expect(batteryStateIsOk(30, 85, 5)).to.be.false;
expect(batteryStateIsOk(42.76, 81, 0.4)).to.be.false;
