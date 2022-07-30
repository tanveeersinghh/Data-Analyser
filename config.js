// This File Contains Basic Config of Each Plot, For Adding More Config refer Plotly.js

const configs = {
	graph: {
		layout: {
			xaxis: {
				title: "",
			},

			yaxis: {
				title: "",
			},
		},
		trace: [
			{
				x: [],
				y: [],
			},
		],
	},

	scatter: {
		layout: {
			xaxis: {
				title: "",
			},

			yaxis: {
				title: "",
			},
		},
		trace: [
			{
				x: [],
				y: [],
				type: "scatter",
				mode: "markers",
			},
		],
	},

	boxplot: {
		trace: [
			{
				y: [],
				type: "box",
			},
		],
	},

	piechart: {
		trace: [
			{
				values: [],
				labels: [],
				type: "pie",
			},
		],
	},
};
