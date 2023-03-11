import React, { useContext, useEffect, useState } from "react";
import "./SketchPanel.css";
import QueryBuilder from "./QueryBuilder";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import paper from "paper";
import { AppContext } from "../contexts/GlobalContext";
import _ from "lodash";
import {
  Grid,
  IconButton,
  Popover,
  Tooltip,
  Button,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faFileImport,
  faHand,
} from "@fortawesome/free-solid-svg-icons";
import { Utils as QbUtils } from "react-awesome-query-builder";
import MuiConfig from "react-awesome-query-builder/lib/config/mui";

let InitialConfig = MuiConfig;
delete InitialConfig["conjunctions"]["OR"];
InitialConfig["settings"]["showNot"] = false;
InitialConfig["settings"]["groupOperators"] = false;
InitialConfig["settings"]["canAddGroup"] = false;
InitialConfig["settings"]["canReorder"] = false;
InitialConfig["settings"]["renderSize"] = "small";
InitialConfig["settings"]["setOpOnChangeField"] = ["keep", "first"];

function SketchPanel(props) {
  const { attributes } = props;
  const sketchPanelId = "sketch-panel";
  let [nodes, setNodes] = useState([]);
  let [nodeLabels, setNodeLabels] = useState([]);
  let [edges, setEdges] = useState([]);
  let [importData, setImportData] = useState(null);
  let [nodeImportUpdate, setNodeImportUpdate] = useState(false);
  let [edgeImportUpdate, setEdgeImportUpdate] = useState(false);
  // States are node (add nodes), edge (add edges), edit(change node/edge properties)
  let [mouseState, setMouseState] = useState("node");
  let [showInfo, setShowInfo] = useState(false);
  let [cursor, setCursor] = useState("crosshair");
  let [pencil, setPencil] = useState();
  // Checks for mouse intersections
  let [testCircle, setTestCircle] = useState();
  // Edit properties with boolean query builder
  const [popperLocation, setPopperLocation] = React.useState();
  const [showPopper, setShowPopper] = React.useState(false);
  let circleRadius = 20;
  let currentPath;
  let currentNode;
  let currentSelection;
  const [canvasDimension, setCanvasDimension] = useState({});
  const [NodeFields, setNodeFields] = useState(null);
  const [EdgeFields, setEdgeFields] = useState(null);

  // We track the overall motif in the global context
  const context = useContext(AppContext);

  const calculateNewPosition = (dimension, position) => {
    let newX = (canvasDimension.width / dimension.width) * position[1];
    let newY = (canvasDimension.height / dimension.height) * position[2];
    return [Math.floor(newX), Math.floor(newY)];
  };

  const getPositionTransformedData = (data) => {
    let newNodes = data.nodes.map((node) => {
      let [newX, newY] = calculateNewPosition(data.dimension, node.position);
      return {
        ...node,
        position: ["Point", newX, newY],
      };
    });
    let newData = {
      ...data,
      nodes: newNodes,
      dimension: canvasDimension,
    };
    return newData;
  };

  const importMotif = () => {
    console.log("importing motif");
    clearSketch(); // clear sketch
    // import file using file picker
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      let file = e.target.files[0];
      // parse file to object
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (e) => {
        let data = JSON.parse(e.target.result);
        let newData = getPositionTransformedData(data);
        setImportData(newData);
        setNodeImportUpdate(true);
      };
    };

    fileInput.click();
  };

  const exportMotif = () => {
    console.log("exporting motif");
    console.log(nodes);
    console.log(edges);
    let out = getEncodedMotif(nodes, edges);
    // download out as JSON file
    let json = JSON.stringify(out);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "motif.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const clearSketch = () => {
    console.log("Clearing");
    paper?.project?.activeLayer?.removeChildren();
    paper?.view?.draw();
    // Remove all edges and nodes
    setNodes([]);
    setEdges([]);
  };

  const deleteSketchElement = () => {
    // edges
    if (
      context.selectedSketchElement &&
      context.selectedSketchElement.type === "edge"
    ) {
      let newEdges = edges.filter(
        (edge) => edge.label !== context.selectedSketchElement.label
      );
      context.selectedSketchElement.edgeLine.remove();
      context.selectedSketchElement.lineGroup.remove();
      context.selectedSketchElement.propertyLabel?.remove();
      context.setSelectedSketchElement(null);
      setEdges(newEdges);
    }
    // nodes
    if (
      context.selectedSketchElement &&
      context.selectedSketchElement.type === "node"
    ) {
      // find adjacent edges
      let nodeLabel = context.selectedSketchElement.label;
      let adjacentEdges = edges.filter((edge) => {
        if (
          edge.fromNode.label === nodeLabel ||
          edge.toNode.label === nodeLabel
        ) {
          return edge;
        }
      });

      // delete edges from canvas
      adjacentEdges.map((edge) => {
        edge.edgeLine.remove();
        edge.lineGroup.remove();
        edge.propertyLabel?.remove();
      });

      // delete node from canvas
      const selectedNodeLabel = context.selectedSketchElement.label;
      context.selectedSketchElement.circle.remove();
      context.selectedSketchElement.circleGroup.remove();
      context.setSelectedSketchElement(null);

      // delete node and rename remaining nodes
      let newNodes = nodes
        .filter((node) => node.label !== selectedNodeLabel)
        .map((node, i) =>
          renameCircle(
            node.circle,
            i,
            node.properties,
            "tree" in node ? node.tree : null,
            node.label
          )
        );

      const getNewNode = (previousLabel) =>
        newNodes.find((node) => node.previousLabel === previousLabel);

      // delete adjacent edges
      let newEdges = edges
        .filter((edge) => !adjacentEdges.includes(edge))
        .map((edge) => {
          let newFromNode = getNewNode(edge.fromNode.label);
          let newToNode = getNewNode(edge.toNode.label);
          let newNodeIndices = [
            _.findLastIndex(newNodes, newFromNode),
            _.findLastIndex(newNodes, newToNode),
          ];

          return renameEdge(newFromNode, newToNode, newNodeIndices, edge);
        });

      // reset edges and nodes
      setEdges(newEdges);
      setNodes(newNodes);
    }
  };

  const renameEdge = (fromNode, toNode, nodeIndices, edge) => {
    let tree = "tree" in edge ? edge.tree : null;
    let edgeObj = {
      ...edge,
    };
    edgeObj["fromNode"] = fromNode;
    edgeObj["toNode"] = toNode;
    edgeObj["indices"] = nodeIndices;
    edgeObj["label"] = `${fromNode.label} -> ${toNode.label}`;
    if (tree !== null) {
      edgeObj["tree"] = QbUtils.loadTree(tree);
    } else {
      edgeObj["tree"] = tree;
    }

    return edgeObj;
  };

  const renameCircle = (
    circle,
    index,
    properties = null,
    tree = null,
    previousLabel
  ) => {
    circle.fillColor = context.neuronColors[index];
    let textPoint = [circle.position.x, circle.position.y + 7];
    let label = new paper.PointText({
      point: textPoint,
      justification: "center",
      fillColor: "white",
      font: "Roboto",
      fontSize: 20,
    });
    let letter = String.fromCharCode(65 + index);
    label.content = letter;
    let circleGroup = new paper.Group([circle, label]);

    if (tree !== null) {
      return {
        circle: circle,
        label: letter,
        previousLabel: previousLabel,
        properties: properties,
        type: "node",
        circleGroup: circleGroup,
        tree: QbUtils.loadTree(tree),
      };
    } else {
      return {
        circle: circle,
        label: letter,
        previousLabel: previousLabel,
        properties: properties,
        type: "node",
        circleGroup: circleGroup,
      };
    }
  };

  const addCircle = (point, node) => {
    // add circle to paper
    let circle = new paper.Path.Circle(point, circleRadius);
    circle.strokeColor = "#000000";
    circle.strokeWidth = 3;
    circle.fillColor = context.neuronColors[node.index];
    circle.opacity = 1.0;
    circle.position = point;

    placeCircle(
      circle,
      node.label,
      node.properties,
      "tree" in node ? node.tree : null
    );
  };

  const placeCircle = (circle, letter, properties = null, tree = null) => {
    circle.opacity = 1;
    let textPoint = [circle.position.x, circle.position.y + 7];
    let label = new paper.PointText({
      point: textPoint,
      justification: "center",
      fillColor: "white",
      font: "Roboto",
      fontSize: 20,
    });
    label.content = letter;
    currentPath?.remove();
    currentPath = null;
    let circleGroup = new paper.Group([circle, label]);

    if (tree !== null) {
      setNodes((nodes) => [
        ...nodes,
        {
          circle: circle,
          label: letter,
          properties: properties,
          type: "node",
          circleGroup: circleGroup,
          tree: QbUtils.loadTree(tree),
        },
      ]);
    } else {
      setNodes((nodes) => [
        ...nodes,
        {
          circle: circle,
          label: letter,
          properties: properties,
          type: "node",
          circleGroup: circleGroup,
        },
      ]);
    }
  };

  const bindPencilEvents = () => {
    currentPath = null;
    pencil.onMouseMove = function (event) {
      let point = new paper.Point(event.point);
      testCircle.position = point;
      if (mouseState === "node") {
        if (context.selectedSketchElement)
          context.setSelectedSketchElement(null);
        let numNodes = nodes?.length || 0;
        let color =
          numNodes <= context.neuronColors.length
            ? context.neuronColors[numNodes]
            : "#000000";
        // Create new Circle
        if (!currentPath) {
          currentPath = new paper.Path.Circle(point, circleRadius);
          currentPath.strokeColor = "#000000";
          currentPath.strokeWidth = 3;
          currentPath.fillColor = color;
          currentPath.opacity = 0.5;
        } else {
          // Move existing circle
          currentPath.position = point;
        }
      } else if (mouseState === "edge") {
        if (context.selectedSketchElement)
          context.setSelectedSketchElement(null);
        if (!currentPath) {
          currentPath = new paper.Path();
          currentPath.strokeColor = "#000000";
          currentPath.strokeWidth = 3;
          currentPath.opacity = 0.5;
          currentPath.add([point.x - 10, point.y]);
          currentPath.add([point.x + 10, point.y]);
        }
        let intersections = _.findLastIndex(
          nodes.map((n) => {
            return n.circle.contains(event.point);
          }),
          (e) => e === true
        );
        // Starting Point of Edge
        if (intersections === -1 && currentNode) {
          currentPath.segments[0].point =
            currentNode.circle.getNearestPoint(point);
          currentPath.segments[1].point = point;
        } //    Ending Point of Edge
        else if (
          intersections !== -1 &&
          currentNode &&
          !_.isEqual(currentNode, nodes[intersections])
        ) {
          currentPath.segments[0].point = currentNode.circle.getNearestPoint(
            nodes[intersections].circle.position
          );
          currentPath.segments[1].point = nodes[
            intersections
          ].circle.getNearestPoint(currentNode.circle.position);
        } // Otherwise move the line glyph
        else {
          currentPath.segments[0].point = new paper.Point([
            point.x - 10,
            point.y,
          ]);
          currentPath.segments[1].point = new paper.Point([
            point.x + 10,
            point.y,
          ]);
        }
      } else if (mouseState === "edit") {
        // Check with intersections with nodes
        let intersections = _.findLastIndex(
          nodes.map((n) => {
            return n.circle.contains(event.point);
          }),
          (e) => e === true
        );
        // Check with intersections with nodes
        if (intersections !== -1) {
          currentSelection = nodes[intersections];
          return;
        }
        // Check with intersections with edges
        intersections = _.findLastIndex(
          edges.map((e) => {
            return !_.isEmpty(testCircle?.getIntersections(e.edgeLine));
          }),
          (e) => e === true
        );
        if (intersections !== -1) {
          currentSelection = edges[intersections];
          return;
        }
        currentSelection = null;
      } else if (mouseState === "move") {
        let intersections = _.findLastIndex(
          nodes.map((n) => {
            return n.circle.contains(event.point);
          }),
          (e) => e === true
        );
        // Check with intersections with nodes
        if (intersections !== -1) {
          currentSelection = nodes[intersections];
          nodes[intersections].circle.selected = true;
        } else {
          currentSelection = null;
          paper.project.activeLayer.selected = false;
        }
      }
    };
    pencil.onMouseDown = function (event) {
      let point = new paper.Point(event.point);
      if (mouseState === "node") {
        if (!currentPath) return;
        // Create new node
        let numNodes = nodes?.length || 0;
        let letter = String.fromCharCode(65 + numNodes);
        let circle = currentPath.clone();
        placeCircle(circle, letter);
      } else if (mouseState === "edge") {
        let intersections = _.findLastIndex(
          nodes.map((n) => {
            return n.circle.contains(event.point);
          }),
          (e) => e === true
        );
        if (intersections !== -1 && !currentNode && currentPath) {
          currentNode = nodes[intersections];
          currentPath.segments[0].position =
            currentNode.circle.getNearestPoint(point);
          return;
        } else if (currentPath && intersections !== -1) {
          if (!_.isEqual(currentNode, nodes[intersections])) {
            // If line intersects with two nodes, draw edge
            currentPath.segments[0].point = currentNode.circle.getNearestPoint(
              nodes[intersections].circle.position
            );
            currentPath.segments[1].point = nodes[
              intersections
            ].circle.getNearestPoint(currentNode.circle.position);
            let edge = currentPath.clone();
            edge.opacity = 1;
            addEdge(currentNode, nodes[intersections], edge);
          }
        }
        currentPath?.remove();
        currentNode = null;
        currentPath = null;
      } else if (mouseState === "edit") {
        let nodeIntersections = _.findLastIndex(
          nodes.map((n) => {
            return n.circle.contains(event.point);
          }),
          (e) => e === true
        );

        let edgeIntersections = _.findLastIndex(
          edges.map((e) => {
            return !_.isEmpty(testCircle?.getIntersections(e.edgeLine));
          }),
          (e) => e === true
        );
        // select the clicked on element and show the popper
        if (nodeIntersections !== -1 || edgeIntersections !== -1) {
          context.setSelectedSketchElement(currentSelection);
          let selectedElement =
            currentSelection?.lineGroup || currentSelection?.circle;
          paper.project.activeLayer.selected = false;
          selectedElement.selected = true;
          setShowPopper(true);
        } else {
          // If they click out, make the popper go away
          setShowPopper(false);
          context.setSelectedSketchElement(null);
          setPopperLocation(null);
        }
      } else if (mouseState === "move") {
        let intersections = _.findLastIndex(
          nodes.map((n) => {
            return n.circle.contains(event.point);
          }),
          (e) => e === true
        );
        // Check with intersections with nodes
        if (intersections !== -1) {
          currentSelection = nodes[intersections];
        }
        if (currentSelection) {
          setCursor("grabbing");
        }
      }
    };
    pencil.onMouseUp = function (event) {
      if (mouseState === "move") {
        console.log("grab", currentNode);

        let nodeIndex = _.findLastIndex(
          nodes.map((n) => n.label === currentNode.label)
        );
        // // list of edges including this edge
        let tmpEdges = _.clone(edges);
        let edgesToAddAgain = [];
        let filteredEdges = tmpEdges.filter((e) => {
          if (e.indices.includes(nodeIndex)) {
            edgesToAddAgain.push(e);
            return false;
          }
          return true;
        });
        let newEdges = edgesToAddAgain.map((e) => {
          e.edgeLine.opacity = 1;
          return createEdge(
            e.fromNode,
            e.toNode,
            e.edgeLine,
            e.indices,
            e.properties,
            e.tree,
            e.propertyLabel
          );
        });

        setEdges([...newEdges, ...filteredEdges]);

        setCursor("grab");
      }
    };
    pencil.onMouseDrag = function (event) {
      if (mouseState === "move") {
        nodeLabels.forEach((label) => {
          label?.remove();
        });
        let intersections = _.findLastIndex(
          nodes.map((n) => {
            return n.circle.contains(event.point);
          }),
          (e) => e === true
        );
        // Check with intersections with nodes
        if (intersections === -1) return;
        nodes[intersections].circleGroup.position = new paper.Point(
          event.point
        );
        currentNode = nodes[intersections];

        edges.forEach((e, i) => {
          if (e.indices.includes(intersections)) {
            if (e.lineGroup) {
              edges[i].edgeLine.remove();
              edges[i].lineGroup.remove();
              edges[i].propertyLabel?.remove();
              edges[i].edgeLine = null;
              edges[i].edgeLine = null;
              edges[i].oppositeEdge = null;
              edges[i].edgeLine = new paper.Path();
              edges[i].edgeLine.strokeColor = "#000000";
              edges[i].edgeLine.strokeWidth = 3;
              edges[i].edgeLine.opacity = 0.5;
              edges[i].edgeLine.add([0, 0]);
              edges[i].edgeLine.add([0, 0]);
            }
            edges[i].edgeLine.segments[0].point = nodes[
              e.indices[0]
            ].circle.getNearestPoint(nodes[e.indices[1]].circle.position);
            edges[i].edgeLine.segments[1].point = nodes[
              e.indices[1]
            ].circle.getNearestPoint(nodes[e.indices[0]].circle.position);
          }
        });
      }
    };
  };
  const addEdge = (
    fromNode,
    toNode,
    edgeLine,
    properties = null,
    tree = null,
    addEdgeImmediately = true
  ) => {
    let nodeIndices = [
      _.findLastIndex(nodes, fromNode),
      _.findLastIndex(nodes, toNode),
    ];
    let matchingEdge = _.findIndex(edges, (e) => {
      return _.isEqual(e.indices, nodeIndices);
    });
    if (matchingEdge !== -1) {
      console.log("Edge Exists");
      edgeLine.remove();
      return;
    }
    const newEdgeObj = createEdge(
      fromNode,
      toNode,
      edgeLine,
      nodeIndices,
      properties,
      tree
    );

    addEdgePropertyLabel(newEdgeObj);

    if (addEdgeImmediately) {
      setEdges([...edges, newEdgeObj]);
    }
    return newEdgeObj;
  };

  const addExistEdges = (newEdges) => {
    let output = [];
    newEdges.map((edge) => {
      let path = new paper.Path();
      path.strokeColor = "#000000";
      path.strokeWidth = 3;
      path.opacity = 1.0;
      path.add([
        edge.fromNode.circle.position[1],
        edge.fromNode.circle.position[2],
      ]);
      path.add([
        edge.toNode.circle.position[1],
        edge.toNode.circle.position[2],
      ]);

      let startNode = nodes[edge.indices[0]];
      let endNode = nodes[edge.indices[1]];
      path.segments[0].point = startNode.circle.getNearestPoint(
        endNode.circle.position
      );
      path.segments[1].point = endNode.circle.getNearestPoint(
        startNode.circle.position
      );
      let tree = "tree" in edge ? edge.tree : null;
      let _newEdge = createEdge(
        startNode,
        endNode,
        path,
        edge.indices,
        edge.properties,
        tree
      );
      output.push(_newEdge);
    });
    setEdges([...output]);
  };

  const createEdge = (
    fromNode,
    toNode,
    edgeLine,
    nodeIndices,
    properties = null,
    tree = null,
    propertyLabel = null
  ) => {
    let edgeObj = {
      indices: nodeIndices,
      toNode: toNode,
      fromNode: fromNode,
      edgeLine: edgeLine,
    };
    // If this edge already exists, don't create it
    // Checks from an edge going the opposite direction between the same two nodes
    let origToPoint = _.cloneDeep(edgeLine.segments[0].point);
    let circ = new paper.Path.Circle(origToPoint, 8);
    let toPoint = (edgeLine.segments[0].point =
      circ.getIntersections(edgeLine)[0].point);
    circ.remove();
    let origFromPoint = _.cloneDeep(edgeLine.segments[1].point);
    circ = new paper.Path.Circle(origFromPoint, 8);
    let fromPoint = (edgeLine.segments[1].point =
      circ.getIntersections(edgeLine)[0].point);
    const dy = toPoint.y - fromPoint.y;
    const dx = toPoint.x - fromPoint.x;
    const theta = Math.atan2(dy, dx); // range (-PI, PI]
    const newY = 7 * Math.sin(theta) + fromPoint.y;
    const newX = 7 * Math.cos(theta) + fromPoint.x;
    let circle = new paper.Path.Circle([newX, newY], 7);
    // Check where the arrow head points should be
    let secondCircle = new paper.Path.Circle(
      circle.getNearestPoint(toPoint),
      7
    );
    let intersections = secondCircle
      .getIntersections(circle)
      .map((intersection) => intersection.point);
    intersections.splice(1, 0, fromPoint);
    let trianglePath = new paper.Path(intersections);
    trianglePath.strokeColor = "black";
    trianglePath.strokeWidth = 3;
    trianglePath.strokeJoin = "round";
    // Create a big group with line and arrow
    edgeObj["toPoint"] = toPoint;
    edgeObj["fromPoint"] = fromPoint;
    edgeObj["lineGroup"] = new paper.Group([trianglePath, edgeObj.edgeLine]);
    secondCircle?.remove();
    circle?.remove();
    edgeObj["type"] = "edge";
    edgeObj["label"] = `${edgeObj.fromNode.label} -> ${edgeObj.toNode.label}`;
    edgeObj["properties"] = properties;
    if (tree !== null) {
      edgeObj["tree"] = QbUtils.loadTree(tree);
    } else {
      edgeObj["tree"] = tree;
    }

    if (propertyLabel) edgeObj = addEdgePropertyLabel(edgeObj);
    return edgeObj;
  };

  const addEdgePropertyLabel = (e) => {
    // Remove any existing label
    if (!e.properties) return e;
    e.propertyLabel?.remove();
    let midpoint = new paper.Point([
      (e.toPoint.x + e.fromPoint.x) / 2,
      (e.toPoint.y + e.fromPoint.y) / 2,
    ]);
    let midpointCircle = new paper.Path.Circle(midpoint, 10);
    let intersectionsCircles = midpointCircle
      .getIntersections(e.lineGroup.children[1])
      .map((i) => {
        return new paper.Path.Circle(i.point, 15);
      });
    let drawPoints = intersectionsCircles[0]
      .getIntersections(intersectionsCircles[1])
      .map((i) => i.point);

    let topPoint = _.sortBy(drawPoints, "y")[0];
    midpointCircle.remove();
    intersectionsCircles.map((i) => i.remove());

    let labelText = "";
    if ("weight" in e.properties) {
      if (_.isNumber(e.properties.weight)) {
        labelText = e.properties.weight;
      } else if (e.properties.weight["$lt"]) {
        labelText = "< " + e.properties.weight["$lt"];
      } else if (e.properties.weight["$gt"]) {
        labelText = "> " + e.properties.weight["$gt"];
      }
    }

    let propertyLabel = new paper.PointText({
      point: topPoint,
      justification: "center",
      fillColor: "black",
      font: "Roboto",
      fontSize: 14,
    });
    propertyLabel.content = labelText;
    e.propertyLabel = propertyLabel;
    return e;
  };

  useEffect(() => {
    if (importData && nodeImportUpdate) {
      importData.nodes.forEach((node) => {
        let point = new paper.Point(node.position[1], node.position[2]);
        addCircle(point, node);
      });

      setNodeImportUpdate(false);
      setEdgeImportUpdate(true);
    }
  }, [nodeImportUpdate]);

  useEffect(() => {
    if (importData && edgeImportUpdate) {
      let newEdges = [];
      try {
        importData.edges.forEach((edge) => {
          let myInputStartNode = importData.nodes.find(
            (node) => node.index === edge.indices[0]
          );
          let myInputEndNode = importData.nodes.find(
            (node) => node.index === edge.indices[1]
          );

          let path = new paper.Path();
          path.strokeColor = "#000000";
          path.strokeWidth = 3;
          path.opacity = 1.0;
          path.add([
            myInputStartNode.position[1],
            myInputStartNode.position[2],
          ]);
          path.add([myInputEndNode.position[1], myInputEndNode.position[2]]);

          let startNode = nodes[edge.indices[0]];
          let endNode = nodes[edge.indices[1]];
          path.segments[0].point = startNode.circle.getNearestPoint(
            endNode.circle.position
          );
          path.segments[1].point = endNode.circle.getNearestPoint(
            startNode.circle.position
          );
          let tree = "tree" in edge ? edge.tree : null;
          let newEdge = addEdge(
            startNode,
            endNode,
            path,
            edge.properties,
            tree,
            false
          );
          newEdges.push(newEdge);
        });
        context.setErrorMessage(null);
        // context.setLoadingMessage(null);
      } catch (TypeError) {
        context.setErrorMessage(
          "The motif can't import. Please try again in a larger window."
        );
        // context.setLoadingMessage(null);
        clearSketch();
      }

      // add new edges to edges
      setEdges([...edges, ...newEdges]);
      setEdgeImportUpdate(false);
      setImportData(null);
    }
  }, [edgeImportUpdate]);

  // Checks for edges going opposite to each other and offsets them so they are distinguishable
  useEffect(() => {
    if (!edges) return;
    edges.forEach((e, i) => {
      let oppositeEdge = _.findIndex(edges, (oppE) => {
        return _.isEqual(oppE.indices, [e.indices[1], e.indices[0]]);
      });
      if (oppositeEdge !== -1 && !e.oppositeEdge && oppositeEdge > i) {
        let midpoint = new paper.Point([
          (e.toPoint.x + e.fromPoint.x) / 2,
          (e.toPoint.y + e.fromPoint.y) / 2,
        ]);
        let circle1 = new paper.Path.Circle(midpoint, 5);
        let circle2 = new paper.Path.Circle(
          circle1.getIntersections(edges[oppositeEdge].edgeLine)[0].point,
          Math.sqrt(5 ** 2 + 5 ** 2)
        );
        let pointDelta = circle2
          .getIntersections(circle1)
          .map((e) => e.point)
          .sort((a, b) => {
            return a.y - b.y;
          })
          .map((pt) => new paper.Point([midpoint.x - pt.x, midpoint.y - pt.y]));
        e["lineGroup"].translate(pointDelta[0]);
        edges[oppositeEdge]["lineGroup"].translate(pointDelta[1]);
        edges[oppositeEdge]["oppositeEdge"] = i;
        e["oppositeEdge"] = oppositeEdge;
      }
      if (e.properties === undefined && e.propertyLabel) {
        e.propertyLabel.content = "";
      }
    });
  }, [edges]);

  useEffect(() => {
    if (pencil && mouseState) {
      // Rebind the pencil events whenever new nodes are drawn
      bindPencilEvents();
    }
  }, [pencil, mouseState, nodes, edges]);

  useEffect(() => {
    currentPath?.remove();
    setPopperLocation(null);
    setShowPopper(false);
    if (paper?.project?.activeLayer) {
      paper.project.activeLayer.selected = false;
      // Remove all undrawn shapes when you switch modes
      paper.project.activeLayer.children.forEach((child) => {
        if (child.opacity === 0.5) child.remove();
      });
    }
  }, [mouseState]);

  useEffect(() => {
    // if context.selectedSketchElement is not null
    if (context.selectedSketchElement) {
      let paperElement =
        context.selectedSketchElement?.circle ||
        context?.selectedSketchElement?.edgeLine;
      // Calculate where on screen coordinates the popper should go
      let position = paperElement.getPosition();
      let boundingRect = paper.view.element.getBoundingClientRect();
      if (paperElement && position) {
        setPopperLocation({
          top: position.y + boundingRect.top + 30,
          left: position.x + boundingRect.left - 30,
        });
      }
      if (context.selectedSketchElement.type === "edge") {
        setEdges(
          edges.map((e) => {
            // Update the edge with the query properties
            if (_.isEqual(e.edgeLine, context.selectedSketchElement.edgeLine)) {
              e.tree = context.selectedSketchElement.tree;
              e.properties = context.selectedSketchElement.properties;
              e = addEdgePropertyLabel(e);
            }
            if (
              e.fromNode.label ===
                context.selectedSketchElement.fromNode.label &&
              e.toNode.label === context.selectedSketchElement.toNode.label
            ) {
              e.edgeLine.strokeColor = "red";
              e.lineGroup.children[0].strokeColor = "red";
            } else {
              e.edgeLine.strokeColor = "#000000";
              e.lineGroup.children[0].strokeColor = "#000000";
            }
            return e;
          })
        );
      } else {
        setNodes(
          nodes.map((n) => {
            if (_.isEqual(n.circle, context.selectedSketchElement.circle)) {
              // Update the node with the query properties
              n.tree = context.selectedSketchElement.tree;
              n.properties = context.selectedSketchElement.properties;
            }
            return n;
          })
        );
      }
    } else {
      setPopperLocation(null);
      setEdges(
        edges.map((e) => {
          e.edgeLine.strokeColor = "#000000";
          e.lineGroup.children[0].strokeColor = "#000000";
          return e;
        })
      );
    }
  }, [context.selectedSketchElement]);

  // On init set up our paperjs
  useEffect(() => {
    paper.setup(sketchPanelId);
    paper.view.onResize = function () {
      setCanvasDimension(paper.view.size);
    };
    setCanvasDimension(paper.view.size);
    let tempCircle = new paper.Path.Circle([0, 0], 6);
    tempCircle.fill = "none";
    tempCircle.strokeWidth = 0;
    setTestCircle(tempCircle);

    let tool = new paper.Tool();
    if (!pencil) {
      setPencil(tool);
    }
    // fetch Node and Edge Fields
    if (!NodeFields || !EdgeFields) {
      if (typeof attributes !== "undefined") {
        setNodeFields(attributes.NodeFields);
        setEdgeFields(attributes.EdgeFields);
      }
    }
    if (nodes.length > 0) {
      const newNodes = [...nodes];
      setNodes([]);
      newNodes.map((node) => {
        placeCircle(node.circle, node.label, node.properties, node.tree);
      });
    }
    if (edges.length > 0) {
      const newEdges = [...edges];
      addExistEdges(newEdges);
    }

    return () => {
      // cleanup component once destroyed
      tool.remove();
      tool.off("mousemove");
      tool.off("mousedown");
      tool.off("mouseup");
    };
  }, []);

  const getEncodedMotif = (nodes, edges) => {
    let encodedNodes = nodes.map((n, i) => {
      return {
        label: n.label,
        properties: n.properties,
        index: i,
        position: n.circle.position,
        tree: n.tree,
      };
    });
    let encodedEdges = edges.map((e, i) => {
      return {
        label: e.label,
        properties: e.properties,
        index: i,
        indices: e.indices,
        tree: e.tree,
      };
    });
    let sketchPanelDim = {
      width: canvasDimension.width,
      height: canvasDimension.height,
    };
    return {
      nodes: encodedNodes,
      edges: encodedEdges,
      dimension: sketchPanelDim,
    };
  };
  // Encode the Nodes and Edges For Query
  useEffect(async () => {
    let encodedMotif = getEncodedMotif(nodes, edges);
    context.setMotifQuery(encodedMotif);

    // most motif queries fail for n larger than 4, develop heuristics to make more accurate
    nodes.length > 4
      ? context.setShowWarning(true)
      : context.setShowWarning(false);
    if (
      typeof attributes != "undefined" &&
      attributes.getMotifCount &&
      attributes.getRelativeMotifCount
    ) {
      const count = await attributes.getMotifCount(
        JSON.stringify(encodedMotif)
      );
      context.setAbsMotifCount(count);

      // get relative count of motif in network
      const relative_count = await attributes.getRelativeMotifCount(
        JSON.stringify(encodedMotif)
      );
      context.setRelativeMotifCount(relative_count);
    }
  }, [nodes, edges]);

  const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Object]";
  };

  const parsePropertyText = (key, value) => {
    let parsedValue = "";
    if (isObject(value)) {
      if (value["$ne"]) {
        parsedValue = `Not ${value["$ne"]}`;
      } else if (value["$lt"]) {
        parsedValue = "< " + value["$lt"];
      } else if (value["$gt"]) {
        parsedValue = "> " + value["$gt"];
      }
    } else {
      parsedValue = value;
    }
    return `${key}: ${parsedValue}\n`;
  };

  useEffect(() => {
    if (!nodes) return;
    nodeLabels.forEach((label) => {
      label?.remove();
    });
    setNodeLabels(
      nodes.map((n) => {
        if (!showInfo) return null;
        console.log("nodes", n, "show", showInfo);
        let propertiesText = _.entries(n?.properties).map((p) => {
          return parsePropertyText(p[0], p[1]);
        });
        let labelPoint = [
          n.circle.position.x,
          n.circle.position.y - circleRadius - 10 * propertiesText.length,
        ];
        let label = new paper.PointText({
          point: labelPoint,
          justification: "center",
          fillColor: "black",
          font: "Roboto",
          fontSize: 10,
        });
        label.content = propertiesText.join("");
        return label;
      })
    );
  }, [nodes, showInfo, edges]);

  return (
    <div className="sketch-panel-style">
      <Grid container className="canvas-wrapper" spacing={0}>
        <Grid item xs={1.4}>
          <Grid container direction="column" justifyContent="center">
            <Tooltip title="Draw Node" placement="right">
              <IconButton
                value="node"
                color={mouseState === "node" ? "primary" : "default"}
                onClick={() => {
                  currentPath?.remove();
                  setCursor("crosshair");
                  setMouseState("node");
                }}
              >
                <CircleTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Draw Edge" placement="right">
              <IconButton
                color={mouseState === "edge" ? "primary" : "default"}
                onClick={() => {
                  currentPath?.remove();
                  setCursor("crosshair");
                  setMouseState("edge");
                }}
              >
                <ArrowRightAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Properties" placement="right">
              <IconButton
                value="edit"
                color={mouseState === "edit" ? "primary" : "default"}
                onClick={() => {
                  setCursor("pointer");
                  currentPath?.remove();
                  setMouseState("edit");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Move" placement="right">
              <IconButton
                value="edit"
                color={mouseState === "move" ? "primary" : "default"}
                onClick={() => {
                  setCursor("grab");
                  currentPath?.remove();
                  setMouseState("move");
                }}
              >
                <FontAwesomeIcon size={"sm"} icon={faHand} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Node Info" placement="right">
              <IconButton
                value="node"
                color={showInfo ? "primary" : "default"}
                onClick={() => {
                  setShowInfo(!showInfo);
                }}
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item xs={9.2} style={{ height: "inherit" }}>
          <div
            className="sketch-canvas"
            id="sketch-canvas-container"
            style={{ cursor: cursor || "crosshair" }}
          >
            <canvas id={sketchPanelId} resize="true"></canvas>
            {showPopper && popperLocation && context.selectedSketchElement && (
              <Popover
                anchorReference="anchorPosition"
                open={true}
                hideBackdrop={true}
                className="sketch-popover"
                disableEnforceFocus={true}
                anchorPosition={popperLocation}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Grid
                  container
                  className="popover-grid"
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  style={{ position: "absolute", height: "40.75px" }}
                >
                  <span
                    style={{
                      paddingLeft: 10,
                      fontWeight: "bold",
                      color: "#454545",
                    }}
                  >
                    {_.capitalize(context.selectedSketchElement.type)}{" "}
                    {context.selectedSketchElement.label}
                  </span>
                </Grid>
                <Grid
                  container
                  className="popover-grid"
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-end"
                  style={{
                    position: "absolute",
                    height: "40.75px",
                    right: "110px",
                  }}
                  zIndex={3}
                >
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteSketchElement()}
                  >
                    Delete
                  </Button>
                </Grid>
                {typeof attributes != "undefined" ? (
                  <>
                    {attributes.NodeFields || attributes.EdgeFields ? (
                      <QueryBuilder
                        NodeFields={
                          attributes.NodeFields ? attributes.NodeFields : {}
                        }
                        EdgeFields={
                          attributes.EdgeFields ? attributes.EdgeFields : {}
                        }
                      />
                    ) : (
                      // loading
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "70px",
                          width: "290px",
                        }}
                      >
                        <CircularProgress
                          size="1.5rem"
                          style={{ marginTop: "30px" }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  // general case
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "70px",
                      width: "290px",
                    }}
                  ></div>
                )}
              </Popover>
            )}
          </div>
        </Grid>
        <Grid item xs={1.4}>
          <Grid container direction="column" justifyContent="center">
            <Tooltip title="Clear Sketch" placement="left">
              <IconButton
                color="default"
                onClick={() => {
                  setCursor("crosshair");
                  clearSketch();
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Import Motif" placement="left">
              <IconButton
                value="edit"
                color="default"
                onClick={() => importMotif()}
              >
                <FontAwesomeIcon size={"sm"} icon={faFileImport} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Motif" placement="left">
              <IconButton
                value="edit"
                color="default"
                onClick={() => exportMotif()}
              >
                <FontAwesomeIcon size={"sm"} icon={faFileExport} style={{marginLeft: "0.6em"}} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SketchPanel;
