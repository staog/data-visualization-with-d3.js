const svg = d3.select('svg');

const width = +svg.attr('width'); // same as parseFloat(svg.attr('width'))
const height = +svg.attr('height'); // same as parseFloat(svg.attr('height'))

const g = svg
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);


const circle = g
  .append('circle')
    .attr('r', height / 2)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

const eyeSpacing = 100;
const eyeYOffset = - 70;
const eyeRadius = 30;
const eyebrowWidth = 50;
const eyebrowHeight = 20;
const eyebrowYOffset = -50;

const eyesG = g
  .append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`);

const leftEye = eyesG
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', -eyeSpacing);

const rightEye = eyesG
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', eyeSpacing);

const eyebrowsG = eyesG
  .append('g')
    .attr('transform', `translate(0, ${eyebrowYOffset})`);
  
eyebrowsG
  .transition().duration(2000)
    .attr('transform', `translate(0, ${eyebrowYOffset - 30})`)
  .transition().duration(2000)
    .attr('transform', `translate(0, ${eyebrowYOffset})`);

const leftEyebrow = eyebrowsG
  .append('rect')
    .attr('x', -eyeSpacing - eyebrowWidth / 2)
    .attr('y', eyebrowYOffset)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

const rightEyebrow = eyebrowsG
  .append('rect')
    .attr('x', eyeSpacing - eyebrowWidth / 2)
    .attr('y', eyebrowYOffset)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

const mouth = g
  .append('path')
    .attr('d', d3.arc()({
        innerRadius: 0,
        outerRadius: 160,
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3 / 2
    }));

