$(function(undefined) {
  var count = 50000,

      // The second parameter is the seed, remove it to get a different
      // set and order on page refresh. That is:
      // var nodes = generateNodes(50000);
      nodes = generateNodes(50000, 1234567),

      content = '';
      totalEdges = _.reduce(nodes, function(count, value) {
          return count + _.size(value);
      }, 0),
      averageEdgeCount = (totalEdges / count).toFixed(2);

  content = [
    'There are a total of',
    totalEdges.toLocaleString(), 'total edges',
    'for', count.toLocaleString(), 'nodes.',
    'This averages to', averageEdgeCount, 'edges per node'
  ].join(' ');

  $('.container').html(content);
});
