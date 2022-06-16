const { expect } = require('chai');

function isThermalControlled(temperature) {
	if (isValueOutOfRange(temperature, 0, 45)) {
		alertMessage('Temperature');
		return false;
	}
	return true;
}

function isSOCControlled(soc) {
	if (isValueOutOfRange(soc, 20, 80)) {
		alertMessage('State of Charge');
		return false;
	}
	return true;
}
function isChargeRateControlled(chargeRate) {
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
	console.log(`${parameter} is out of range!`);
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
expect(batteryStateIsOk(25, 70, 0.7)).to.be.true;
expect(batteryStateIsOk(20, 85, 0)).to.be.false;
expect(batteryStateIsOk(30, 70, 0.9)).to.be.false;
expect(batteryStateIsOk(60, 70, 1)).to.be.false;
expect(batteryStateIsOk(30, 85, 5)).to.be.false;
expect(batteryStateIsOk(45, 81, 0.4)).to.be.false;
