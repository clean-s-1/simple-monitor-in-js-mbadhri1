const translate = require('@vitalets/google-translate-api');

class BatteryState {
	isBatteryStateOk = false;
	constructor(temperature, stateOfCharge, chargeRate, ...parameters) {
		this.temperature = temperature;
		this.stateOfCharge = stateOfCharge;
		this.chargeRate = chargeRate;
		this.isBatteryStateOk = BatteryState.chackBatteryStatus(
			temperature,
			stateOfCharge,
			chargeRate,
			...parameters
		);
	}
	static chackBatteryStatus(...parameters) {
		let validState = true;
		parameters.forEach((parametrer) => {
			let parameterState = BatteryState.checkParameterRange(
				parametrer.value,
				parametrer.ranges
			);
			validState = validState && parameterState;
		});
		return validState;
	}
	static checkParameterRange(value, ranges) {
		let validParameterRange = true;
		ranges?.forEach((range) => {
			if (value >= range.min && value < range.max) {
				if (!range.validRange) {
					validParameterRange = false;
				}
				if (range.message) {
					BatteryState.printMessage(range.message);
				}
			}
		});
		return validParameterRange;
	}
	static printMessage(message) {
		translate(message, {
			to: globalLanguage,
		})
			.then((res) => console.log(res.text))
			.catch((err) => {
				console.error(err);
			});
	}
}
module.exports = { BatteryState };
