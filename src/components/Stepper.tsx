import * as React from "react";
import type { FunctionComponent } from "react";
import "./Stepper.scss";

export const Stepper: FunctionComponent<{
	totalSteps: number;
	currentStep: number;
	stepName?: string;
}> = ({ totalSteps, currentStep, stepName }) => {
	const percentage = (100 * (currentStep + 1)) / totalSteps;
	return (
		<div className="stepper">
			<div
				style={{ width: `${percentage.toFixed(2)}%` }}
				className="stepper__completed"
			>
				<p className="stepper__completed__p">{stepName ?? currentStep}</p>
			</div>
		</div>
	);
};
