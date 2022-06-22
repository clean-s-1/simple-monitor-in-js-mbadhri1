const { Temperature, SOC, ChargeRate } = require('./batteryParameter');
const { expect } = require('chai');
const translate = require('@vitalets/google-translate-api');

globalLanguage = 'en';
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
			validState =
				validState &&
				BatteryState.checkParameterRange(parametrer.value, parametrer.ranges);
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
let batteryState;
batteryState = new BatteryState(
	new Temperature(25),
	new SOC(77),
	new ChargeRate(0.7)
);
expect(batteryState.isBatteryStateOk).to.be.true;

batteryState = new BatteryState(
	new Temperature(20),
	new SOC(85),
	new ChargeRate(0)
);
expect(batteryState.isBatteryStateOk).to.be.false;

batteryState = new BatteryState(
	new Temperature(30),
	new SOC(70),
	new ChargeRate(0.9)
);
expect(batteryState.isBatteryStateOk).to.be.false;

batteryState = new BatteryState(
	new Temperature(60),
	new SOC(70),
	new ChargeRate(1)
);
expect(batteryState.isBatteryStateOk).to.be.false;

batteryState = new BatteryState(
	new Temperature(30),
	new SOC(85),
	new ChargeRate(5)
);
expect(batteryState.isBatteryStateOk).to.be.false;

batteryState = new BatteryState(
	new Temperature(42.78),
	new SOC(81),
	new ChargeRate(0.4)
);
expect(batteryState.isBatteryStateOk).to.be.false;

batteryState = new BatteryState(
	new Temperature(23, 'farenheit'),
	new SOC(81),
	new ChargeRate(0.4)
);
expect(batteryState.isBatteryStateOk).to.be.false;

batteryState = new BatteryState(
	new Temperature(99, 'farenheit'),
	new SOC(81),
	new ChargeRate(0.4)
);
expect(batteryState.isBatteryStateOk).to.be.false;
