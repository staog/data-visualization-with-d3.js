const svg = d3.select('svg');

const width = +svg.attr('width'); // same as parseFloat(svg.attr('width'))
const height = +svg.attr('height'); // same as parseFloat(svg.attr('height'))

let data = [
    {country: 'China', population: 1415046},
    {country: 'India', population: 1354052},
    {country: 'United States', population: 326767},
    {country: 'Indonesia', population: 266795},
    {country: 'Brazil', population: 210868},
    {country: 'Pakistan', population: 200814},
    {country: 'Nigeria', population: 195875},
    {country: 'Bangladesh', population: 166368},
    {country: 'Russia', population: 143965},
    {country: 'Mexico', population: 130759},
]

/* 

If population was of type string, 
we would convert it to number like this:

data.forEach(d => {
    d.population = +d.population;
})

*/

data.forEach(d => {
  d.population = d.population * 1000;
});

const render = input => {
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = { top: 40, right: 50, bottom: 30, left: 120 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const yAxis = d3.axisLeft(yScale);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxisTickFormat = number => 
      d3.format('.2s')(number)
        .replace('G', 'B');

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(xAxisTickFormat);

    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('.domain, .tick line')
        .remove();

    g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${innerHeight})`);

    g.selectAll('rect').data(input)
      .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth());

    g.append('text')
      .attr('y', -10)
      .text('Top 10 most populous countries')
};

render(data);
