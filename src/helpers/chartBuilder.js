function generateChart(width, height, points){
    let minY = Math.min(...points);
    let scaleY = height / (Math.max(...points) - minY);
    let scaleX = width / points.length ;
    let result = [];
    result.push(`M 0 ${(points[0] - minY)*scaleY}`)
    for( let i = 1; i < points.length; i++ ){
        result.push(` L ${i*scaleX} ${height - (points[i] - minY)*scaleY} `);
    }
    result.push(`L ${(points.length - 1)*scaleX + 10} ${height - (points[points.length-1] - minY)*scaleY} `)
    result.push(`L ${(points.length - 1)*scaleX + 10} ${height+10} `)
    result.push(`L 0 ${height+10}`)
    return result.join('');
}

export default generateChart;