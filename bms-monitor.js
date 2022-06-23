const { Temperature, SOC, ChargeRate } = require('./batteryParameter');
const { expect } = require('chai');
const { BatteryState } = require('./batteryState');

globalLanguage = 'en';

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
	new ChargeRate(0.78)
);
expect(batteryState.isBatteryStateOk).to.be.false;

batteryState = new BatteryState(
	new Temperature(2),
	new SOC(22),
	new ChargeRate(0.78)
);
expect(batteryState.isBatteryStateOk).to.be.true;

batteryState = new BatteryState(
	new Temperature(44),
	new SOC(77),
	new ChargeRate(0.2)
);
expect(batteryState.isBatteryStateOk).to.be.true;

batteryState = new BatteryState(
	new Temperature(-1),
	new SOC(11),
	new ChargeRate(-0.1)
);
expect(batteryState.isBatteryStateOk).to.be.false;

batteryState = new BatteryState(
	new Temperature(47),
	new SOC(84),
	new ChargeRate(0.9)
);
expect(batteryState.isBatteryStateOk).to.be.false;
