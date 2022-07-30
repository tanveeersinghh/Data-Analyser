// For Faster Access All Elements are stored here
const elements = {
	plotContainer: document.getElementById("plot-container"),
	graph: document.getElementById("graph"),
	scatter: document.getElementById("scatter"),
	boxplot: document.getElementById("boxplot"),
	piechart: document.getElementById("piechart"),
};

// this is for storing csv Data
const csv = {};

// On Csv input this reads csvData and goes to next Steps
function csvInputHandler(csvInput) {
	if (csvInput.files.length) {
		elements.plotContainer.style.display = "flex";
		Papa.parse(csvInput.files[0], {
			header: true,
			skipEmptyLines: true,
			dynamicTyping: true,

			complete: afterDataExtraction,
		});
	} else {
		elements.plotContainer.style.display = "none";
	}
}

// this stores each csv column in csv variable
function afterDataExtraction({ data, meta }) {
	meta.fields.forEach((column) => {
		csv[column] = get_column(column, data);
	});

	document.querySelectorAll("select").forEach((selectElement) => {
		createOption(selectElement, Object.keys(csv));
		update(selectElement);
	});
}

// Draws Plots
function drawPlots() {
	Plotly.newPlot(elements.graph, configs.graph.trace, configs.graph.layout);
	Plotly.newPlot(
		elements.scatter,
		configs.scatter.trace,
		configs.scatter.layout
	);
	Plotly.newPlot(elements.boxplot, configs.boxplot.trace);
	Plotly.newPlot(elements.piechart, configs.piechart.trace);
}

// Updates Plots, Data
function update(selectElement) {
	plotType = selectElement.parentElement.nextElementSibling.id;

	if (plotType != "piechart") {
		configs[plotType].trace[0][selectElement.name] =
			csv[selectElement.value];
		configs[plotType].trace[0].name = selectElement.value;
	} else {
		let counts = counter(csv[selectElement.value]);
		configs[plotType].trace[0].values = Object.values(counts);
		configs[plotType].trace[0].labels = Object.keys(counts);

		console.log(configs[plotType].trace[0].values);
	}

	if (!["boxplot", "piechart"].includes(plotType))
		configs[plotType].layout[selectElement.name + "axis"].title =
			selectElement.value;

	drawPlots();
}

// Returns Column Values
function get_column(column, data) {
	return data.map((x) => x[column]);
}

// Creates Options in Select Element
function createOption(selectElement, values) {
	selectElement.innerHTML = "";
	values.forEach((opt) => {
		option = document.createElement("option");
		option.value = option.innerText = opt;
		selectElement.appendChild(option);
	});
}

// Simply returns count for each Element (Used in Pie Chart)
function counter(array) {
	let result = {};
	array.forEach((x) => {
		if (typeof result[x] != "undefined") result[x]++;
		else result[x] = 0;
	});
	return result;
}
