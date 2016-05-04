$(function(undefined) {
  var count = 20000; //50000;

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



  var nodeNames = Object.keys(nodes);

    // $('.container').html(nodeNames);





  // console.log(nodeNames);


  printList= function(){
    for (var i=0; i<10; i++) {
      var node = nodeNames[i];
      $('.node-list').append('<li>' + node + '</li>');
    }
  }

  printList();










});
