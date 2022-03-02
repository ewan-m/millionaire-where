import * as React from "react";
import { useState, useEffect } from "react";
import { Stepper } from "../components/Stepper";
import "./Millionaire.scss";

import countries from "./data/countries.json";
import currencies from "./data/currencies.json";

const countriesList = Object.entries(countries).map((e) => ({
	code: e[0],
	display: e[1],
}));
const rates = Object.entries(currencies.rates).map((e) => ({
	code: e[0],
	rate: e[1],
}));

const getMoneyFormatted = (currency: string, money: string) =>
	new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: currency,
	}).format(Number(money));

const getMillionaireList = (currency: string, money: string) =>
	rates
		.map((rate) => {
			const muchMoney =
				(rate.rate * Number(money)) /
				(rates.find((rate) => rate.code === currency)?.rate ?? 1);

			return {
				code: rate.code,
				money: muchMoney,
			};
		})
		.filter((amount) => amount.money >= 1_000_000)
		.sort((a, b) => a.money - b.money);

const stepNames = [
	"introductions and hello",
	"the big questions",
	"results and celebrations",
	"bank transfer",
];

export const Millionaire = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [currency, setCurrency] = useState(countriesList[0].code);
	const [money, setMoney] = useState("0");
	const [moneyDisplay, setMoneyDisplay] = useState(
		getMoneyFormatted(currency, money)
	);

	const millionaireList = getMillionaireList(currency, money);

	useEffect(() => {
		setMoneyDisplay(getMoneyFormatted(currency, money));
	}, [setMoneyDisplay, currency]);

	return (
		<>
			<Stepper
				totalSteps={stepNames.length}
				currentStep={currentStep}
				stepName={stepNames[currentStep]}
				stepBack={() => {
					setCurrentStep(currentStep - 1);
				}}
			/>
			<h1 className="title">you wants to be a millionaire, but where?</h1>

			{currentStep === 0 && (
				<div>
					<p className="paragraph">
						we all want to be a millionaire, yes, but the question on the tip of
						everyones' tongues is where.
					</p>
					<p className="paragraph">
						maybe you are a millionaire already you are just positionally challenged?
					</p>
					<p className="paragraph">
						using this very handle tool i can tell you the easiest way for you to
						become millionaire, simplify for the price of 1 transportation tickets.
					</p>
					<button
						className="form__submit"
						onClick={() => {
							setCurrentStep(1);
						}}
					>
						let's do!
					</button>
				</div>
			)}
			{currentStep === 1 && (
				<form
					className="form"
					onSubmit={(e) => {
						e.preventDefault();
						if (millionaireList.length > 0) {
							setCurrentStep(2);
						}
					}}
				>
					<label className="form__label">
						which currency do you use?
						<select
							value={currency}
							className="form__input"
							onChange={(e) => {
								setCurrency(e.target.value);
							}}
						>
							{countriesList.map((country) => (
								<option key={country.code} value={country.code}>
									{country.display}
								</option>
							))}
						</select>
					</label>

					<label className="form__label">
						how much money do you have?
						<input
							value={moneyDisplay}
							onFocus={() => {
								setMoneyDisplay(Number(money) === 0 ? "" : money);
							}}
							onBlur={() => {
								setMoneyDisplay(getMoneyFormatted(currency, money));
							}}
							onChange={({ target }) => {
								if (!isNaN(+target.value)) {
									setMoneyDisplay(target.value);
									setMoney(target.value);
								}
							}}
							className="form__input"
							type="text"
							name="moneyInput"
						/>
					</label>
					<button className="form__submit" type="submit">
						where it be, dawg?
					</button>
				</form>
			)}

			{currentStep === 2 && (
				<div className="resultsSection">
					<p className="paragraph">
						wow, you are a millionaire in{" "}
						<strong>{millionaireList.length} currencies</strong> already and who knows
						how many countries!
					</p>

					<p className="paragraph">
						quick transfer all your money into{" "}
						<strong>{(countries as any)[millionaireList[0].code]}</strong>, pronto! or
						any of these other lovely moneys
					</p>
					<div className="countryResult__container nice-scrolls">
						{millionaireList.map((currency) => (
							<div className="countryResult" key={currency.code}>
								<p className="countryResult__currency">
									{(countries as any)[currency.code]}
								</p>
								<p className="countryResult__amount">
									{getMoneyFormatted(currency.code, `${currency.money}`)}
								</p>
							</div>
						))}
					</div>
					<button
						className="form__submit"
						onClick={() => {
							setCurrentStep(3);
						}}
					>
						make the conversion!
					</button>
				</div>
			)}
			{currentStep === 3 && (
				<form
					className="form"
					onSubmit={(e) => {
						e.preventDefault();
						window.open("https://www.youtube.com/watch?v=u196yHvR8K8", "_blank");
					}}
				>
					<label className="form__label">
						account name
						<input className="form__input" type="text" />
					</label>
					<label className="form__label">
						card number
						<input className="form__input" type="text" />
					</label>
					<label className="form__label">
						3 digit security code
						<input className="form__input" type="text" />
					</label>
					<button className="form__submit">make me a millionaire!</button>
				</form>
			)}
		</>
	);
};
