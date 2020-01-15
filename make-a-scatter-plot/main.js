const svg = d3.select('svg');

const width = +svg.attr('width'); // same as parseFloat(svg.attr('width'))
const height = +svg.attr('height'); // same as parseFloat(svg.attr('height'))

// d3.csv('url to my github account').then(data => {
//     console.log(data);
// })

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
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scalePoint()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.5);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxisTickFormat = number => 
      d3.format('.2s')(number)
        .replace('G', 'B');

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-innerHeight);

    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth);

    g.append('g')
      .call(yAxis)
      .selectAll('.domain')
        .remove();

    g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${innerHeight})`);

    g.selectAll('circle').data(input)
      .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', 20);

    g.append('text')
      .attr('y', -10)
      .text('Top 10 most populous countries')
};

render(data);