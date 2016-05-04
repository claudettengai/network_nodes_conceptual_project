$(function(undefined) {
  var count = 200; //50000;

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


// prints out unordered nodes in list in HTML
  printList= function(){
    for (var i=0; i<10; i++) {
      var node = nodeNames[i];
      $('.node-list').append('<li>' + node + '<a class= "down-arrow">&#x25BE</a>' + '</li>');

      $('.node-list li').last().append('<ul class= "edge-list"></ul>');

      var currentNode = nodes[node];
      for(var edge in currentNode){
          $('.edge-list').last().append('<li>' + edge + '<span class = "edge-weight"><br>' + currentNode[edge] + '</span></li>');
          // $('.edge-list').last().append('<li>' + edge + "</li>");

      }

    }
  }







  edgeToggle = function(){
    $('.node-list li').click(function(){
      $(this).find('.edge-list').toggle();
      $(this).toggleClass('node-select');
      
    });
  };


  showEdges = function(){
    $('.node-list li').mouseenter(function(){
      $(this).find('.down-arrow').css('visibility', 'visible');
    });

    $('.node-list li').mouseleave(function(){
      $(this).find('.down-arrow').css('visibility', 'hidden');
    });
  }




  execute = function(){
    printList();
    edgeToggle();
    showEdges();
    // viewMore();
  } 


  execute();
  // viewMore();


// prints out alphabetically-ordered node list when click button 
  $('#sort-az').click(function(){

    $('.node-list').empty();
    $('#sort-default, #sort-za').removeClass("button-active");

    $('#sort-az').addClass("button-active");

    nodeNameSortAZ = function(a,b) {
      return parseInt(a.substring(4)) - parseInt(b.substring(4));
      };

    nodeNames.sort(nodeNameSortAZ);
    execute(); 
  });



//prints out reverse-alphabetically-ordered node list 
  $('#sort-za').click(function(){

    $('.node-list').empty();
    $('#sort-default, #sort-az').removeClass("button-active");

    $('#sort-za').addClass("button-active");

    nodeNameSortZA = function(a,b) {
      return parseInt(b.substring(4)) - parseInt(a.substring(4));
      };

    nodeNames.sort(nodeNameSortZA);
    execute();
  });



// prints out default ordered nodes
  $('#sort-default').click(function(){
    location.reload();
  });









  viewMore= function(){
    $('.view-more').click(function(){

      var visibleNodesIndex= $('.node-list > li').length;
      console.log(visibleNodesIndex);

      for (var i=visibleNodesIndex; i<visibleNodesIndex+10; i++){
        var node = nodeNames[i];
        $('.node-list').append('<li>' + node + '<a class= "down-arrow">&#x25BE</a>' + '</li>');

        $('.node-list li').last().append('<ul class= "edge-list"></ul>');

        var currentNode = nodes[node];
        for(var edge in currentNode){
            $('.edge-list').last().append('<li>' + edge + '<span class = "edge-weight"><br>' + currentNode[edge] + '</span></li>');
            // $('.edge-list').last().append('<li>' + edge + "</li>");
            console.log(currentNode);

        };
      };
    });
  };

viewMore();





//////////////////////////////////////////////////////////////////////



  nodeSearch= function(){

    $('#submit-button').click(function(){
      var val = $("#search-bar").val();
      // console.log(val);
      // console.log(nodes[val]);

      var nodeNames = Object.keys(nodes);
      var node = (nodes[val]);
      console.log(node);

      $('.node-search-output').html('<ul id= "search-node-name" class= "edge-list-unhidden">' + val + '<a class= "down-arrow">&#x25BE</a>' + '<br></ul>');

      
      for (var edge in node){
        $('#search-node-name').last().append('<li>' + edge + '<span class = "edge-weight"><br>' + node[edge] + '</span></li>');
      }

    });
  };

  nodeSearch();


/////////////////////////////////////////////////////////////////////




  pathSearchByLength = function(nodeQueue, targetNode, maxDepth){
      var lastNodeName = nodeQueue[nodeQueue.length - 1];
      if(lastNodeName == targetNode || nodeQueue.length >= maxDepth) {
        return null;
      }

      var lastNode = nodes[lastNodeName];

      var shortestPath = null;
      for(var edgeName in lastNode) {
        // check whether we already have this node in our path
        if(_.includes(nodeQueue, edgeName)) {
          continue;
        }

        if(edgeName == targetNode) {
          nodeQueue.push(edgeName);
          return nodeQueue;
        }

        var edge = nodes[edgeName];
        var path = pathSearchByLength(nodeQueue.concat(edgeName), targetNode, maxDepth);
        if(path) {
          // always able to set new path as shortest since it must be within newly set max depth
          shortestPath = path;
          maxDepth = shortestPath.length - 1;
          // setting maxDepth so we don't search this far again.  any future paths found must be shorter
        }
      }

      return shortestPath;
    };

  // find the path with fewest nodes. eg findPath('node1', 'node7') -> ["node1", "node63", "node44", "node194", "node7"]
  findPath = function(nodeNameA, nodeNameB){
    shortestPath = pathSearchByLength([nodeNameA], nodeNameB, count);
    console.log(nodes);
    console.log(shortestPath);


  };




// fires findPath 
  $('#path-submit-button').click(function(){
    var nodeNameA = $("#node-name-A").val();
    var nodeNameB = $("#node-name-B").val();

    findPath(nodeNameA, nodeNameB);

    $('.path-search-output').html('<ul id= "path-nodes" class= "edge-list-unhidden"></ul>');

    for (var edge in shortestPath){
      $('#path-nodes').last().append('<li>'+ shortestPath[edge] + '</li>');
    }




  });









});
