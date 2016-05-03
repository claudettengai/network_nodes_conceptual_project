$(function(undefined) {
  var count = 20; //50000;

  // The second parameter is the seed, remove it to get a different
  // set and order on page refresh. That is:
  // var nodes = generateNodes(50000);
  var nodes = generateNodes(count, 1234567);

  totalEdges = _.reduce(nodes, function(count, value) {
      return count + _.size(value);
  }, 0),
  averageEdgeCount = (totalEdges / count).toFixed(2);

  var content = [
    'There are a total of',
    totalEdges.toLocaleString(), 'total edges',
    'for', count.toLocaleString(), 'nodes.',
    'This averages to', averageEdgeCount, 'edges per node'
  ].join(' ');

  $('.container').html(content);


  // nodeNameSort = function(a,b) {
  //     return parseInt(a.substring(4)) - parseInt(b.substring(4));
  // };

  var nodeNames = Object.keys(nodes);
  // nodeNames.sort(nodeNameSort);



  for (var i=0; i<nodeNames.length; i++) {
    var node = nodeNames[i];
    $('.node-list').append('<li>' + node + '</li>');

    $('.node-list li').last().append('<ul class= "edge-list"></ul>');

    var currentNode = nodes[node];
    for(var edge in currentNode){
        // $('.edge-list').last().append('<li>' + edge +  ":" + currentNode[edge] + "</li>");
        $('.edge-list').last().append('<li>' + edge + "</li>");

    }  
  }
});
